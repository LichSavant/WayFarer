import { View, Text } from "react-native";
import { TransportMode } from "../types/route";
import { colors, Icon } from "./ui";
const labels = {
  ferry: "Ferry",
  flight: "Flight",
  bus: "Bus",
  van: "Van",
  train: "Train",
};
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
        borderRadius: 2,
      }}
    >
      <Icon
        name={
          mode === "ferry"
            ? "boat-outline"
            : mode === "flight"
              ? "airplane-outline"
              : mode === "train"
                ? "train-outline"
                : "bus-outline"
        }
        size={13}
        color={colors.blue}
      />
      <Text style={{ fontSize: 11, color: colors.blue, fontWeight: "600" }}>
        {labels[mode]}
      </Text>
    </View>
  );
}
