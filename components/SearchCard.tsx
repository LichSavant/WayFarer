import { useState } from "react";
import { Modal, Pressable, Text, TextInput, View } from "react-native";
import { router } from "expo-router";
import { useTravel, formatDate } from "../store/TravelContext";
import { Button, colors, Icon, s } from "./ui";
export function SearchCard() {
  const { search, setSearch } = useTravel();
  const [picker, setPicker] = useState<"date" | "passengers" | null>(null);
  const [error, setError] = useState("");
  return (
    <View style={s.card}>
      <View style={s.between}>
        <Text style={s.eyebrow}>YOUR NEXT CHAPTER</Text>
        <View style={s.row}>
          <Icon name="boat-outline" color={colors.blue} size={17} />
          <Icon name="airplane-outline" color={colors.blue} size={17} />
        </View>
      </View>
      <View style={s.row}>
        <View style={{ flex: 1, gap: 14 }}>
          {(["origin", "destination"] as const).map((field, i) => (
            <View
              key={field}
              style={[
                s.row,
                i === 0 && {
                  paddingBottom: 14,
                  borderBottomWidth: 1,
                  borderColor: colors.line,
                },
              ]}
            >
              <Icon
                name={i === 0 ? "radio-button-on-outline" : "location-outline"}
                color={colors.blue}
                size={18}
              />
              <View style={{ flex: 1 }}>
                <Text style={s.muted}>{i === 0 ? "From" : "To"}</Text>
                <TextInput
                  accessibilityLabel={i === 0 ? "Origin" : "Destination"}
                  value={search[field]}
                  onChangeText={(text) =>
                    setSearch((v) => ({ ...v, [field]: text }))
                  }
                  style={{
                    fontSize: 20,
                    fontWeight: "600",
                    color: colors.navy,
                    paddingVertical: 4,
                  }}
                />
              </View>
            </View>
          ))}
        </View>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Swap origin and destination"
          onPress={() =>
            setSearch((v) => ({
              ...v,
              origin: v.destination,
              destination: v.origin,
            }))
          }
          style={{
            backgroundColor: colors.pale,
            padding: 12,
            borderRadius: 24,
          }}
        >
          <Icon name="swap-vertical" size={20} color={colors.blue} />
        </Pressable>
      </View>
      <View style={s.line} />
      <View style={s.row}>
        {(["date", "passengers"] as const).map((field, i) => (
          <Pressable
            accessibilityRole="button"
            key={field}
            onPress={() => setPicker(field)}
            style={{
              flex: 1,
              flexDirection: "row",
              gap: 10,
              alignItems: "center",
            }}
          >
            <Icon
              name={i === 0 ? "calendar-outline" : "people-outline"}
              size={19}
              color={colors.muted}
            />
            <View>
              <Text style={s.muted}>
                {i === 0 ? "Departure" : "Passengers"}
              </Text>
              <Text style={[s.body, { fontWeight: "600" }]}>
                {i === 0
                  ? formatDate(search.date)
                  : `${search.passengers} Adult${search.passengers > 1 ? "s" : ""}`}
              </Text>
            </View>
          </Pressable>
        ))}
      </View>
      {!!error && (
        <Text accessibilityRole="alert" style={{ color: "#AA423A" }}>
          {error}
        </Text>
      )}
      <Button
        title="Search routes"
        icon="arrow-forward"
        onPress={() => {
          if (!search.origin.trim() || !search.destination.trim()) {
            setError("Enter an origin and destination.");
            return;
          }
          if (
            search.origin.trim().toLowerCase() ===
            search.destination.trim().toLowerCase()
          ) {
            setError("Choose two different places.");
            return;
          }
          setError("");
          router.push("/results");
        }}
      />
      <Modal
        visible={picker !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setPicker(null)}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "#152C3B66",
            justifyContent: "center",
            padding: 28,
          }}
        >
          <View style={s.card}>
            <Text style={s.sectionTitle}>
              {picker === "date" ? "Choose departure" : "How many travelers?"}
            </Text>
            <Text style={s.muted}>
              {picker === "date"
                ? "Available demo dates · October 2026"
                : "Adults · age 12 and above"}
            </Text>
            {(picker === "date"
              ? [
                  "2026-10-24",
                  "2026-10-25",
                  "2026-10-26",
                  "2026-10-27",
                  "2026-10-28",
                ]
              : [1, 2, 3, 4, 5, 6]
            ).map((value) => (
              <Button
                key={value}
                secondary
                title={
                  typeof value === "string"
                    ? formatDate(value)
                    : `${value} Adult${value > 1 ? "s" : ""}`
                }
                onPress={() => {
                  if (typeof value === "string")
                    setSearch((v) => ({ ...v, date: value }));
                  else setSearch((v) => ({ ...v, passengers: value }));
                  setPicker(null);
                }}
              />
            ))}
            <Button title="Cancel" secondary onPress={() => setPicker(null)} />
          </View>
        </View>
      </Modal>
    </View>
  );
}
