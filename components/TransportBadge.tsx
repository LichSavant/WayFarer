import { View, Text } from "react-native";
import { TransportMode } from "../types/route";
import { colors, Icon } from "./ui";
export function TransportBadge({ mode }: { mode: TransportMode }) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        backgroundColor: colors.pale,
        paddingHorizontal: 9,
        paddingVertical: 5,
        borderRadius: 7,
      }}
    >
      <Icon
        name={mode === "ferry" ? "boat-outline" : "airplane-outline"}
        size={13}
        color={colors.blue}
      />
      <Text style={{ fontSize: 11, color: colors.blue, fontWeight: "600" }}>
        {mode === "ferry" ? "Ferry" : "Flight"}
      </Text>
    </View>
  );
}
