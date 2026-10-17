import { Text, View } from "react-native";
import { colors } from "./theme";
import { Icon } from "./Icon";
export function SiteFooter() {
  return (
    <View
      style={{
        borderTopWidth: 1,
        borderColor: colors.line,
        paddingTop: 24,
        marginTop: 12,
        gap: 14,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          flexWrap: "wrap",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <Icon name="navigate-outline" size={19} color={colors.blue} />
          <Text
            style={{
              fontSize: 19,
              letterSpacing: -0.6,
              fontWeight: "500",
              color: colors.navy,
            }}
          >
            WayFarer.
          </Text>
        </View>
        <Text style={{ fontSize: 9, letterSpacing: 1.6, color: colors.muted }}>
          SEA. SKY. YOUR WAY.
        </Text>
      </View>
      <Text style={{ fontSize: 11, lineHeight: 18, color: colors.muted }}>
        Made for the journey between the islands. Fares and schedules are
        illustrative.
      </Text>
    </View>
  );
}
