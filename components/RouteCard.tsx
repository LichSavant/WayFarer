import { Pressable, Text, View } from "react-native";
import { Route } from "../types/route";
import { duration, fare } from "../data/routes";
import { colors, Icon, s } from "./ui";
import { TransportBadge } from "./TransportBadge";
export function RouteCard({
  route,
  onPress,
  passengers = 1,
}: {
  route: Route;
  onPress: () => void;
  passengers?: number;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`View ${route.provider} route`}
      onPress={onPress}
      style={({ pressed }) => [s.card, { opacity: pressed ? 0.7 : 1 }]}
    >
      <View style={s.between}>
        <View style={s.row}>
          <View
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              backgroundColor: colors.pale,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon
              name={
                route.mode === "ferry" ? "boat-outline" : "airplane-outline"
              }
              color={colors.blue}
            />
          </View>
          <View>
            <Text style={[s.body, { fontWeight: "700" }]}>
              {route.provider}
            </Text>
            <Text style={s.muted}>{route.badge ?? "Direct service"}</Text>
          </View>
        </View>
        <TransportBadge mode={route.mode} />
      </View>
      <View style={s.between}>
        <View style={{ flex: 1 }}>
          <Text style={[s.sectionTitle, { fontSize: 19 }]}>
            {route.departureTime}
          </Text>
          <Text style={s.muted}>{route.departureTerminal}</Text>
        </View>
        <View style={{ alignItems: "center", paddingHorizontal: 10, gap: 4 }}>
          <Text style={s.muted}>{duration(route.durationMinutes)}</Text>
          <View
            style={{ width: 54, height: 1, backgroundColor: colors.line }}
          />
          <Text style={[s.muted, { fontSize: 10 }]}>
            {route.transfers === 0 ? "Direct" : `${route.transfers} transfer`}
          </Text>
        </View>
        <View style={{ flex: 1, alignItems: "flex-end" }}>
          <Text style={[s.sectionTitle, { fontSize: 19 }]}>
            {route.arrivalTime}
          </Text>
          <Text style={[s.muted, { textAlign: "right" }]}>
            {route.arrivalTerminal}
          </Text>
        </View>
      </View>
      <View style={s.line} />
      <View style={s.between}>
        <View>
          <Text style={s.price}>{fare(route.price * passengers)}</Text>
          <Text style={[s.muted, { fontSize: 11 }]}>
            {passengers === 1 ? "per person" : `for ${passengers} passengers`} ·
            estimated fare
          </Text>
        </View>
        <View style={s.row}>
          <Text style={{ fontSize: 13, fontWeight: "600", color: colors.blue }}>
            View route
          </Text>
          <Icon name="arrow-forward" color={colors.blue} size={17} />
        </View>
      </View>
    </Pressable>
  );
}
