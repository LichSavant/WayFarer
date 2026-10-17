import { View, Text } from "react-native";
import { Icon } from "./Icon";
import { glass } from "./theme";
export function RouteSketch({
  origin,
  destination,
}: {
  origin: string;
  destination: string;
}) {
  return (
    <View style={{ gap: 10, maxWidth: 310 }}>
      <Text style={{ fontSize: 8, letterSpacing: 1.6, color: glass.dim }}>
        YOUR NEXT CHAPTER
      </Text>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 9 }}>
        <View
          style={{
            width: 7,
            height: 7,
            borderWidth: 1,
            borderColor: "white",
            borderRadius: 4,
          }}
        />
        <Text style={{ fontSize: 12, color: "white" }}>{origin}</Text>
      </View>
      <View
        style={{
          marginLeft: 3,
          paddingLeft: 20,
          borderLeftWidth: 1,
          borderStyle: "dashed",
          borderColor: "#FFFFFF90",
          height: 35,
          justifyContent: "center",
        }}
      >
        <View style={{ flexDirection: "row", gap: 12 }}>
          <Icon name="boat-outline" size={14} color={glass.muted} />
          <Icon name="airplane-outline" size={14} color={glass.muted} />
          <Text style={{ fontSize: 9, color: glass.muted }}>Sea or sky</Text>
        </View>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 9 }}>
        <View
          style={{
            width: 7,
            height: 7,
            backgroundColor: "white",
            borderRadius: 4,
          }}
        />
        <Text style={{ fontSize: 12, color: "white" }}>{destination}</Text>
      </View>
    </View>
  );
}
