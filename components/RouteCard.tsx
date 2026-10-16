import { Pressable, Text, View } from "react-native";
import { Route } from "../types/route";
import { TravelOption } from "../types/travel";
import { duration, fare } from "../data/routes";
import { colors, Icon, s } from "./ui";
import { TransportBadge } from "./TransportBadge";
import { useResponsive } from "../hooks/useResponsive";
export function RouteCard({
  route,
  onPress,
  passengers = 1,
  recommendation,
}: {
  route: Route & Partial<TravelOption>;
  onPress: () => void;
  passengers?: number;
  recommendation?: string;
}) {
  const { desktop } = useResponsive();
  const price = route.pricePerTraveler ?? route.price;
  const minutes = route.totalDurationMinutes ?? route.durationMinutes;
  const transfers = route.transferCount ?? route.transfers;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`View ${route.provider} route, ${fare(price * passengers)} total`}
      onPress={onPress}
      style={({ pressed }) => [
        s.card,
        {
          opacity: pressed ? 0.7 : 1,
          padding: 22,
          gap: 20,
          flexDirection: desktop ? "row" : "column",
          alignItems: desktop ? "center" : "stretch",
        },
      ]}
    >
      <View style={{ flex: desktop ? 1 : undefined, gap: 10 }}>
        <View style={[s.row, { gap: 10 }]}>
          <Icon
            name={route.mode === "ferry" ? "boat-outline" : "airplane-outline"}
            color={colors.blue}
          />
          <Text style={[s.body, { fontWeight: "700", flex: 1 }]}>
            {route.provider}
          </Text>
        </View>
        <View style={[s.row, { flexWrap: "wrap", gap: 8 }]}>
          <TransportBadge mode={route.mode} />
          {recommendation && (
            <Text
              style={{ fontSize: 11, fontWeight: "600", color: colors.blue }}
            >
              {recommendation}
            </Text>
          )}
        </View>
      </View>
      <View style={[s.between, { flex: desktop ? 1.8 : undefined, gap: 8 }]}>
        <View style={{ flex: 1 }}>
          <Text style={[s.sectionTitle, { fontSize: 18 }]}>
            {route.departureTime}
          </Text>
          <Text style={[s.muted, { fontSize: 11 }]}>
            {route.departureTerminal}
          </Text>
        </View>
        <View style={{ alignItems: "center", gap: 5, paddingHorizontal: 6 }}>
          <Text style={s.muted}>{duration(minutes)}</Text>
          <View
            style={{ height: 1, width: 48, backgroundColor: colors.line }}
          />
          <Text style={[s.muted, { fontSize: 10 }]}>
            {transfers === 0
              ? "Direct"
              : `${transfers} transfer${transfers > 1 ? "s" : ""}`}
          </Text>
        </View>
        <View style={{ flex: 1, alignItems: "flex-end" }}>
          <Text style={[s.sectionTitle, { fontSize: 18 }]}>
            {route.arrivalTime}
          </Text>
          <Text style={[s.muted, { textAlign: "right", fontSize: 11 }]}>
            {route.arrivalTerminal}
          </Text>
        </View>
      </View>
      {!desktop && <View style={s.line} />}
      <View
        style={[
          desktop
            ? {
                alignItems: "flex-end",
                gap: 6,
                flex: 0.9,
                paddingLeft: 20,
                borderLeftWidth: 1,
                borderColor: colors.line,
              }
            : s.between,
        ]}
      >
        <View>
          <Text style={[s.price, { textAlign: desktop ? "right" : "left" }]}>
            {fare(price * passengers)} <Text style={s.muted}>total</Text>
          </Text>
          <Text
            style={[
              s.muted,
              { fontSize: 11, textAlign: desktop ? "right" : "left" },
            ]}
          >
            {fare(price)} / traveler · {passengers} adult
            {passengers > 1 ? "s" : ""}
          </Text>
        </View>
        <View style={[s.row, { gap: 5 }]}>
          <Text style={{ fontSize: 12, fontWeight: "600", color: colors.blue }}>
            View route
          </Text>
          <Icon name="arrow-forward" color={colors.blue} size={15} />
        </View>
      </View>
    </Pressable>
  );
}
