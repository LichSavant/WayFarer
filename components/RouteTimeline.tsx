import { View, Text } from "react-native";
import { Route } from "../types/route";
import { duration } from "../data/routes";
import { colors, Icon, s } from "./ui";
export function RouteTimeline({ route }: { route: Route }) {
  return (
    <View style={{ gap: 0 }}>
      <View style={s.row}>
        <View
          style={{
            width: 12,
            height: 12,
            borderRadius: 6,
            borderWidth: 3,
            borderColor: colors.blue,
          }}
        />
        <View style={{ flex: 1 }}>
          <Text style={s.sectionTitle}>{route.departureTime}</Text>
          <Text style={s.body}>{route.departureTerminal}</Text>
        </View>
      </View>
      <View
        style={{
          marginLeft: 5,
          borderLeftWidth: 2,
          borderColor: colors.line,
          paddingLeft: 26,
          paddingVertical: 26,
          gap: 6,
        }}
      >
        <View style={s.row}>
          <Icon
            name={route.mode === "ferry" ? "boat-outline" : "airplane-outline"}
            color={colors.blue}
          />
          <Text style={[s.body, { fontWeight: "600" }]}>{route.provider}</Text>
        </View>
        <Text style={s.muted}>{route.vehicle}</Text>
        <Text style={s.muted}>
          {duration(route.durationMinutes)} ·{" "}
          {route.transfers === 0
            ? "No transfers"
            : `${route.transfers} transfer`}
        </Text>
      </View>
      <View style={s.row}>
        <View
          style={{
            width: 12,
            height: 12,
            borderRadius: 6,
            backgroundColor: colors.blue,
          }}
        />
        <View>
          <Text style={s.sectionTitle}>{route.arrivalTime}</Text>
          <Text style={s.body}>{route.arrivalTerminal}</Text>
        </View>
      </View>
    </View>
  );
}
