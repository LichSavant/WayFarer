import { useState } from "react";
import { Modal, Pressable, ScrollView, Text, View } from "react-native";
import { router } from "expo-router";
import { useTravel, formatDate } from "../store/TravelContext";
import { toTravelRequest } from "../services/travel/adapters";
import { useResponsive } from "../hooks/useResponsive";
import { Icon, s } from "./ui";
import { glass, radius } from "./theme";
import { GlassSurface } from "./glass/GlassSurface";
import { GlassPanel } from "./glass/GlassPanel";
import { GlassButton } from "./glass/GlassButton";
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
      <GlassSurface
        level="functional"
        blur={false}
        style={{ padding: desktop ? 22 : 18, gap: 18 }}
      >
        <View style={[s.between, { gap: 10 }]}>
          <Text style={{ fontSize: 9, letterSpacing: 1.6, color: glass.muted }}>
            YOUR JOURNEY · ONE WAY
          </Text>
          <View style={[s.row, { gap: 10 }]}>
            <Icon name="boat-outline" size={15} color={glass.dim} />
            <Icon name="airplane-outline" size={15} color={glass.dim} />
          </View>
        </View>
        <View
          style={{
            flexDirection: desktop ? "row" : "column",
            alignItems: desktop ? "center" : "stretch",
            gap: desktop ? 20 : 18,
            zIndex: 10,
          }}
        >
          <View
            style={{
              flex: desktop ? 2.1 : undefined,
              flexDirection: desktop ? "row" : "column",
              gap: 14,
              zIndex: 20,
            }}
          >
            <LocationInput
              inverse
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
                marginVertical: desktop ? 0 : -12,
                borderWidth: 1,
                borderColor: glass.separator,
                padding: 10,
                borderRadius: radius.small,
                backgroundColor: glass.hover,
                opacity: pressed ? 0.65 : 1,
                zIndex: 5,
              })}
            >
              <Icon
                name={desktop ? "swap-horizontal" : "swap-vertical"}
                size={18}
                color={glass.text}
              />
            </Pressable>
            <LocationInput
              inverse
              label="To"
              value={search.destination}
              onChange={(destination) =>
                setSearch((v) => ({ ...v, destination }))
              }
            />
          </View>
          <View
            style={{
              flex: desktop ? 1.4 : undefined,
              flexDirection: "row",
              gap: 20,
              borderLeftWidth: desktop ? 1 : 0,
              borderTopWidth: desktop ? 0 : 1,
              borderColor: glass.separator,
              paddingLeft: desktop ? 20 : 0,
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
                  opacity: pressed ? 0.65 : 1,
                })}
              >
                <Text
                  style={{
                    fontSize: 9,
                    letterSpacing: 1.5,
                    color: glass.muted,
                  }}
                >
                  {i === 0 ? "DEPARTURE" : "TRAVELERS"}
                </Text>
                <View style={[s.row, { gap: 6 }]}>
                  <Text
                    style={{
                      fontSize: 17,
                      fontWeight: "500",
                      color: glass.text,
                    }}
                  >
                    {i === 0
                      ? formatDate(search.date)
                      : `${search.passengers} Adult${search.passengers > 1 ? "s" : ""}`}
                  </Text>
                  <Icon name="chevron-down" size={12} color={glass.dim} />
                </View>
              </Pressable>
            ))}
          </View>
          <GlassButton
            primary
            title="Search routes"
            icon="arrow-forward"
            disabled={searching}
            onPress={submit}
          />
        </View>
      </GlassSurface>
      {!!(error || searchError) && (
        <Text
          accessibilityRole="alert"
          style={{ color: glass.error, fontSize: 13 }}
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
            backgroundColor: glass.scrim,
            justifyContent: "center",
            padding: 24,
            alignItems: "center",
          }}
        >
          <GlassPanel
            style={{
              width: "100%",
              maxWidth: 440,
              maxHeight: "90%",
              backgroundColor: glass.darkStrong,
            }}
          >
            <ScrollView
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={{ gap: 12 }}
            >
              <Text style={[s.sectionTitle, { color: glass.text }]}>
                {picker === "date" ? "Choose departure" : "How many travelers?"}
              </Text>
              <Text style={[s.muted, { color: glass.muted }]}>
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
                <GlassButton
                  key={value}
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
              <GlassButton
                primary
                title="Done"
                onPress={() => setPicker(null)}
              />
            </ScrollView>
          </GlassPanel>
        </View>
      </Modal>
    </View>
  );
}
