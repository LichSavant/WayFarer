import { useState } from "react";
import { Modal, Pressable, ScrollView, Text, View } from "react-native";
import { router } from "expo-router";
import { useTravel } from "../store/TravelContext";
import { toTravelRequest } from "../services/travel/adapters";
import { useResponsive } from "../hooks/useResponsive";
import { Icon } from "./Icon";
import { GlassPanel } from "./glass/GlassPanel";
import { GlassButton } from "./glass/GlassButton";
import { LocationInput } from "./LocationInput";
import { SearchProgress } from "./SearchProgress";
import { Barcode, TicketMap } from "./ticket";
export function SearchCard(_props: { clear?: boolean; ticket?: boolean }) {
  const { search, setSearch, runSearch, searching, searchError } = useTravel();
  const { wide, contentWidth } = useResponsive();
  const [measuredWidth, setMeasuredWidth] = useState<number | null>(null);
  const cardWidth = measuredWidth ?? contentWidth;
  const desktop = cardWidth >= 1100;
  const fieldsRow =
    (desktop ? cardWidth - 338 : cardWidth) - (wide ? 60 : 44) >= 680;
  const fieldGap = cardWidth < 480 ? 12 : 24;
  const [picker, setPicker] = useState<"date" | "passengers" | null>(null);
  const [error, setError] = useState("");
  const date = new Date(search.date + "T12:00:00");
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
    <View
      onLayout={(event) => setMeasuredWidth(event.nativeEvent.layout.width)}
      style={{ zIndex: 30, gap: 10, minWidth: 0 }}
    >
      <View
        style={{
          flexDirection: desktop ? "row" : "column",
          minHeight: desktop ? 178 : undefined,
        }}
      >
        <View
          style={{
            flex: desktop ? 1 : undefined,
            minWidth: 0,
            backgroundColor: "#F5F1EB",
            borderRadius: 13,
            paddingHorizontal: wide ? 30 : 22,
            paddingVertical: 22,
            zIndex: 4,
          }}
        >
          <TicketMap />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 18,
              marginBottom: 24,
            }}
          >
            <Text
              style={{
                fontSize: 10,
                fontWeight: "800",
                letterSpacing: cardWidth < 380 ? 1.5 : 3,
                flexShrink: 1,
              }}
            >
              BOOK YOUR JOURNEY
            </Text>
            <View style={{ height: 1, backgroundColor: "#DDD4C9", flex: 1 }} />
          </View>
          <View
            style={{
              flexDirection: fieldsRow ? "row" : "column",
              gap: wide ? 24 : 22,
            }}
          >
            <View
              style={{
                flex: fieldsRow ? 1.85 : undefined,
                minWidth: 0,
                flexDirection: "row",
                gap: fieldGap,
                zIndex: 30,
              }}
            >
              <LocationInput
                ticket
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
                style={{
                  alignSelf: "center",
                  borderRadius: 30,
                  borderWidth: 1,
                  borderColor: "#DAD0C4",
                  width: 40,
                  height: 40,
                  flexShrink: 0,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon name="swap-horizontal" color="#29241F" size={17} />
              </Pressable>
              <View
                style={{
                  width: 1,
                  borderLeftWidth: 1,
                  borderStyle: "dashed",
                  borderColor: "#C9BFB2",
                }}
              />
              <LocationInput
                ticket
                label="To"
                value={search.destination}
                onChange={(destination) =>
                  setSearch((v) => ({ ...v, destination }))
                }
              />
            </View>
            <View
              style={{
                flex: fieldsRow ? 1.5 : undefined,
                minWidth: 0,
                flexDirection: "row",
                gap: 26,
                borderLeftWidth: fieldsRow ? 1 : 0,
                borderTopWidth: fieldsRow ? 0 : 1,
                borderStyle: "dashed",
                borderColor: "#C9BFB2",
                paddingLeft: fieldsRow ? 24 : 0,
                paddingTop: fieldsRow ? 0 : 20,
              }}
            >
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Choose departure date"
                onPress={() => setPicker("date")}
                style={{ flex: 1.2, minWidth: 0, gap: 19 }}
              >
                <Text style={{ fontSize: 11 }}>Departure</Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  <Icon name="calendar-outline" size={21} color="#211D19" />
                  <Text
                    style={{
                      fontSize: cardWidth < 380 ? 12 : 15,
                      flexShrink: 1,
                    }}
                  >
                    {date.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </Text>
                </View>
                <Text
                  style={{ fontSize: 8, letterSpacing: 1.8, color: "#6F6256" }}
                >
                  {date
                    .toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    })
                    .toUpperCase()}
                </Text>
              </Pressable>
              <View
                style={{
                  width: 1,
                  borderLeftWidth: 1,
                  borderStyle: "dashed",
                  borderColor: "#C9BFB2",
                }}
              />
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Choose passengers"
                onPress={() => setPicker("passengers")}
                style={{ flex: 0.8, minWidth: 0, gap: 18 }}
              >
                <Text style={{ fontSize: 11 }}>Passengers</Text>
                <View
                  style={{
                    flexDirection: "row",
                    gap: 13,
                    alignItems: "center",
                  }}
                >
                  <Icon name="person-outline" size={21} color="#211D19" />
                  <Text style={{ fontSize: 17 }}>{search.passengers}</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 8,
                      letterSpacing: 1.2,
                      color: "#5C5146",
                      flexShrink: 1,
                    }}
                  >
                    ECONOMY
                  </Text>
                  <Icon name="chevron-down" size={10} color="#5C5146" />
                </View>
              </Pressable>
            </View>
          </View>
        </View>
        {desktop && (
          <View
            style={{
              width: 72,
              borderRadius: 9,
              backgroundColor: "#EEE8E0",
              borderLeftWidth: 2,
              borderRightWidth: 2,
              borderStyle: "dotted",
              borderColor: "#9B8B7A",
              padding: 15,
              justifyContent: "center",
            }}
          >
            <Barcode vertical height={154} />
          </View>
        )}
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Search routes"
          accessibilityState={{ disabled: searching }}
          disabled={searching}
          onPress={submit}
          style={({ pressed }) => ({
            width: desktop ? 266 : undefined,
            minHeight: desktop ? 178 : 85,
            backgroundColor: pressed ? "#3D342D" : "rgba(22,19,16,0.93)",
            borderWidth: 1,
            borderColor: "#948577",
            borderRadius: 13,
            padding: desktop ? 28 : 20,
            minWidth: 0,
            justifyContent: "space-between",
            flexDirection: desktop ? "column" : "row",
            alignItems: "flex-end",
            opacity: searching ? 0.6 : 1,
          })}
        >
          <Icon name="airplane" size={25} color="#EEE4D8" />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: cardWidth < 380 ? 12 : 24,
            }}
          >
            <Text
              style={{
                color: "#F7F1E9",
                fontSize: 9,
                fontWeight: "700",
                letterSpacing: cardWidth < 380 ? 1.5 : 3,
              }}
            >
              SEARCH FLIGHTS
            </Text>
            <View
              style={{
                borderWidth: 1,
                borderColor: "#D2C4B3",
                width: 40,
                height: 40,
                borderRadius: 24,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Icon name="arrow-forward" size={18} color="#F7F1E9" />
            </View>
          </View>
        </Pressable>
      </View>
      {!!(error || searchError) && (
        <Text
          accessibilityRole="alert"
          style={{ color: "#FFDBCC", padding: 10 }}
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
            flex: desktop ? 1 : undefined,
            minWidth: 0,
            backgroundColor: "rgba(20,16,12,0.65)",
            justifyContent: "center",
            alignItems: "center",
            padding: 24,
          }}
        >
          <GlassPanel
            style={{ width: "100%", maxWidth: 440, maxHeight: "90%" }}
          >
            <ScrollView contentContainerStyle={{ gap: 12 }}>
              <Text
                style={{ fontSize: 24, fontWeight: "600", color: "#27211C" }}
              >
                {picker === "date" ? "Choose departure" : "How many travelers?"}
              </Text>
              <Text style={{ color: "#766A5E", marginBottom: 8 }}>
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
                  primary={
                    value ===
                    (picker === "date" ? search.date : search.passengers)
                  }
                  title={
                    typeof value === "string"
                      ? new Date(value + "T12:00:00").toLocaleDateString(
                          "en-US",
                          { month: "long", day: "numeric" },
                        )
                      : value + " Adult" + (value > 1 ? "s" : "")
                  }
                  onPress={() => {
                    setSearch((v) =>
                      typeof value === "string"
                        ? { ...v, date: value }
                        : { ...v, passengers: value },
                    );
                    setPicker(null);
                  }}
                />
              ))}
              <GlassButton title="Done" onPress={() => setPicker(null)} />
            </ScrollView>
          </GlassPanel>
        </View>
      </Modal>
    </View>
  );
}
