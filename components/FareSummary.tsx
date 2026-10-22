import { Text, View } from "react-native";
import { JourneyRoute } from "../types/travel";
import { duration, fare } from "../data/routes";
import { GlassPanel } from "./glass/GlassPanel";
import { colors, glass } from "./theme";
import { Barcode } from "./ticket";
import { Icon } from "./Icon";
export function FareSummary({
  route,
  travelers,
}: {
  route: JourneyRoute;
  travelers: number;
}) {
  return (
    <GlassPanel
      blur={false}
      style={{ backgroundColor: glass.darkStrong, gap: 20 }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontSize: 9, letterSpacing: 1.8, color: glass.dim }}>
          YOUR JOURNEY / FARE
        </Text>
        <Icon name="ticket-outline" size={20} color={colors.aqua} />
      </View>
      <View style={{ gap: 8 }}>
        <Text
          style={{
            fontSize: 38,
            fontWeight: "500",
            letterSpacing: -1.2,
            color: glass.text,
          }}
        >
          {fare(route.pricePerTraveler * travelers)}
        </Text>
        <Text style={{ fontSize: 12, lineHeight: 20, color: glass.muted }}>
          Estimated total · {fare(route.pricePerTraveler)} / traveler ×{" "}
          {travelers} adult{travelers > 1 ? "s" : ""}
        </Text>
      </View>
      <View
        style={{
          borderTopWidth: 1,
          borderStyle: "dashed",
          borderColor: glass.separator,
        }}
      />
      <View style={{ gap: 8 }}>
        <Text style={{ fontSize: 14, color: glass.text }}>
          Continue with {route.bookingProvider}
        </Text>
        <Text style={{ fontSize: 12, lineHeight: 20, color: glass.dim }}>
          {duration(route.totalDurationMinutes)} end to end ·{" "}
          {route.transferCount === 0
            ? "Direct service"
            : `${route.transferCount} transfers`}
        </Text>
      </View>
      <Text style={{ fontSize: 11, lineHeight: 18, color: glass.dim }}>
        Estimated mock fare. Confirm final prices and inclusions with the
        provider.
      </Text>
      <Barcode height={28} />
    </GlassPanel>
  );
}
