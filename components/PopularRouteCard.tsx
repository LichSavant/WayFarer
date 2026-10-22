import { Pressable, Text, View } from "react-native";
import { popularRoutes } from "../data/popularRoutes";
import { fare } from "../data/routes";
import { airportCode, Barcode } from "./ticket";
export function PopularRouteCard({
  item,
  onPress,
  fluid = false,
}: {
  item: (typeof popularRoutes)[number];
  onPress: () => void;
  fluid?: boolean;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Explore ${item.origin} to ${item.destination}, from ${fare(item.price)}`}
      onPress={onPress}
      style={({ pressed }) => ({
        width: fluid ? "100%" : 260,
        opacity: pressed ? 0.65 : 1,
        backgroundColor: "#FCFCFA",
        borderWidth: 1,
        borderColor: "#D3D3CC",
        borderRadius: 4,
      })}
    >
      <View style={{ padding: 20, gap: 22 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ fontSize: 8, fontWeight: "800", letterSpacing: 1 }}>
            WAYFARER
          </Text>
          <Text style={{ fontSize: 8, color: "#666" }}>
            {item.modes.toUpperCase()}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 34, fontWeight: "900", letterSpacing: -2 }}>
            {airportCode(item.origin)}
          </Text>
          <Text style={{ color: "#999" }}>✈</Text>
          <Text style={{ fontSize: 34, fontWeight: "900", letterSpacing: -2 }}>
            {airportCode(item.destination)}
          </Text>
        </View>
        <View>
          <Text style={{ fontSize: 11, fontWeight: "700" }}>
            {item.destination.toUpperCase()}
          </Text>
          <Text style={{ fontSize: 11, color: "#777", marginTop: 5 }}>
            {item.subtitle}
          </Text>
        </View>
      </View>
      <View
        style={{
          borderTopWidth: 1,
          borderStyle: "dashed",
          borderColor: "#BDBDB5",
          padding: 20,
          gap: 18,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View>
            <Text style={{ fontSize: 8, letterSpacing: 1, color: "#777" }}>
              FARE FROM
            </Text>
            <Text style={{ fontSize: 24, fontWeight: "700", marginTop: 5 }}>
              {fare(item.price)}
            </Text>
          </View>
          <Text style={{ fontSize: 22 }}>✈</Text>
        </View>
        <Barcode height={24} />
      </View>
    </Pressable>
  );
}
