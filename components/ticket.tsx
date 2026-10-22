import { Image, StyleSheet, View } from "react-native";
export const airportCode = (city: string) =>
  ({
    "Cebu City": "CEB",
    Cebu: "CEB",
    Manila: "MNL",
    Bohol: "TAG",
    Boracay: "MPH",
    Siargao: "IAO",
    Palawan: "PPS",
    Dumaguete: "DGT",
  })[city] ??
  city
    .replace(/[^a-z]/gi, "")
    .slice(0, 3)
    .toUpperCase();
export function Barcode({
  height = 46,
  vertical = false,
}: {
  height?: number;
  vertical?: boolean;
}) {
  return (
    <View
      accessible={false}
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      style={{
        height,
        width: vertical ? "100%" : undefined,
        flexDirection: vertical ? "column" : "row",
        gap: vertical ? 1 : 2,
        overflow: "hidden",
      }}
    >
      {Array.from({ length: vertical ? 100 : 64 }, (_, i) => (
        <View
          key={i}
          style={
            vertical
              ? {
                  height: [1, 2, 1, 1, 3, 1, 2][i % 7],
                  width: "100%",
                  backgroundColor: "#302A24",
                  flexShrink: 0,
                }
              : {
                  width: [1, 3, 1, 2, 4, 1, 2][i % 7],
                  height: "100%",
                  backgroundColor: "#302A24",
                }
          }
        />
      ))}
    </View>
  );
}
const map =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 480"><g fill="#938579"><path d="M58 96l55-36 77-10 33 26 48-10 52 29-17 31-38 15-13 37-37 9-10 50-25 6-35-45-42-13-29-42-37-6zM232 236l39 12 29 43-4 43-27 45-8 43-17-7-15-52-19-49zM351 40l45-19 41 22-26 38-46-9zM458 112l30-30 36 14 22-13 18 32-23 20-41-2-14 18-38-13zM478 158l52-9 41 24 21 45-20 32-7 54-30 28-26-29-6-47-26-27-20-43zM554 99l61-38 72 7 37-17 95 23 69 48-17 31-63 10-10 31-50 2-14 28-27-8-14-38-39-3-18 33-34-32-47-11zM685 219l35 24 12 43-16 12-29-39zM745 282l55 8 19 16-13 13-45-12zM815 326l49-16 48 23 9 40-33 21-55-5-27-26zM916 186l15-23 8 35-14 24zM608 296l10 24-12 28-8-20z"/></g></svg>';
export function TicketMap() {
  return (
    <View
      pointerEvents="none"
      accessible={false}
      style={[
        StyleSheet.absoluteFill,
        { overflow: "hidden", borderRadius: 12 },
      ]}
    >
      <Image
        source={{ uri: "data:image/svg+xml;utf8," + encodeURIComponent(map) }}
        resizeMode="contain"
        style={{
          position: "absolute",
          width: "85%",
          height: "100%",
          right: 0,
          opacity: 0.095,
        }}
      />
    </View>
  );
}
