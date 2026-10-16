import { useState } from "react";
import { Modal, Pressable, ScrollView, Text, View } from "react-native";
import { router } from "expo-router";
import { useTravel, formatDate } from "../store/TravelContext";
import { toTravelRequest } from "../services/travel/adapters";
import { useResponsive } from "../hooks/useResponsive";
import { Button, colors, Icon, s } from "./ui";
import { LocationInput } from "./LocationInput";
import { SearchProgress } from "./SearchProgress";
export function SearchCard() {
  const { search, setSearch, runSearch, searching, searchError } = useTravel();
  const { desktop } = useResponsive();
  const [picker, setPicker] = useState<"date" | "passengers" | null>(null);
  const [error, setError] = useState("");
  async function submit() {
    if (searching) return;
    try {
      toTravelRequest(search);
      setError("");
      if (await runSearch(search)) router.push("/results");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Check your search fields.");
    }
  }
  return (
    <View style={{ zIndex: 20, gap: 10 }}>
      <View style={[s.card, { padding: desktop ? 24 : 20, gap: 20 }]}>
        <View style={s.between}>
          <Text style={s.eyebrow}>ONE WAY · SEA & SKY</Text>
          <Text style={[s.muted, { fontSize: 11 }]}>Philippines</Text>
        </View>
        <View
          style={{
            flexDirection: desktop ? "row" : "column",
            alignItems: desktop ? "center" : "stretch",
            gap: desktop ? 22 : 20,
            zIndex: 10,
          }}
        >
          <View
            style={{
              flex: desktop ? 2 : undefined,
              flexDirection: desktop ? "row" : "column",
              gap: 16,
              zIndex: 20,
            }}
          >
            <LocationInput
              label="From"
              value={search.origin}
              onChange={(origin) => setSearch((v) => ({ ...v, origin }))}
            />
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
              style={({ pressed }) => ({
                alignSelf: desktop ? "center" : "flex-end",
                marginVertical: desktop ? 0 : -10,
                backgroundColor: colors.pale,
                padding: 10,
                borderRadius: 22,
                opacity: pressed ? 0.6 : 1,
                zIndex: 5,
              })}
            >
              <Icon
                name={desktop ? "swap-horizontal" : "swap-vertical"}
                size={18}
                color={colors.blue}
              />
            </Pressable>
            <LocationInput
              label="To"
              value={search.destination}
              onChange={(destination) =>
                setSearch((v) => ({ ...v, destination }))
              }
            />
          </View>
          <View
            style={{
              flex: desktop ? 1.3 : undefined,
              flexDirection: "row",
              gap: 24,
              borderLeftWidth: desktop ? 1 : 0,
              borderTopWidth: desktop ? 0 : 1,
              borderColor: colors.line,
              paddingLeft: desktop ? 22 : 0,
              paddingTop: desktop ? 0 : 18,
            }}
          >
            {(["date", "passengers"] as const).map((field, i) => (
              <Pressable
                accessibilityRole="button"
                key={field}
                onPress={() => setPicker(field)}
                style={({ pressed }) => ({
                  flex: 1,
                  gap: 10,
                  opacity: pressed ? 0.6 : 1,
                })}
              >
                <Text style={s.eyebrow}>
                  {i === 0 ? "DEPARTURE" : "TRAVELERS"}
                </Text>
                <View style={[s.row, { gap: 7 }]}>
                  <Text style={[s.body, { fontSize: 17, fontWeight: "600" }]}>
                    {i === 0
                      ? formatDate(search.date)
                      : `${search.passengers} Adult${search.passengers > 1 ? "s" : ""}`}
                  </Text>
                  <Icon name="chevron-down" size={13} color={colors.muted} />
                </View>
              </Pressable>
            ))}
          </View>
          <Button title="Search routes" icon="arrow-forward" onPress={submit} />
        </View>
      </View>
      {!!(error || searchError) && (
        <Text
          accessibilityRole="alert"
          style={{ color: "#A63B32", fontSize: 13 }}
        >
          {error || searchError}
        </Text>
      )}
      <SearchProgress
        visible={searching}
        origin={search.origin}
        destination={search.destination}
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
            padding: 24,
            alignItems: "center",
          }}
        >
          <View
            style={[s.card, { width: "100%", maxWidth: 440, maxHeight: "90%" }]}
          >
            <ScrollView contentContainerStyle={{ gap: 12 }}>
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
              <Button
                title="Cancel"
                secondary
                onPress={() => setPicker(null)}
              />
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}
