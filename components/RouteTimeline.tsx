import { View, Text } from "react-native";
import { Route } from "../types/route";
import { TravelOption, JourneySegment } from "../types/travel";
import { duration } from "../data/routes";
import { colors, Icon, s } from "./ui";
const time = (value: string) =>
  new Date(value).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Manila",
  });
function Segment({
  segment,
  last,
}: {
  segment: JourneySegment;
  last: boolean;
}) {
  return (
    <View>
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
          <Text style={s.sectionTitle}>{time(segment.departureTime)}</Text>
          <Text style={s.body}>{segment.origin.name}</Text>
        </View>
      </View>
      <View
        style={{
          marginLeft: 5,
          borderLeftWidth: 2,
          borderColor: colors.line,
          paddingLeft: 26,
          paddingVertical: 24,
          gap: 6,
        }}
      >
        <View style={s.row}>
          <Icon
            name={
              segment.mode === "flight"
                ? "airplane-outline"
                : segment.mode === "ferry"
                  ? "boat-outline"
                  : "bus-outline"
            }
            color={colors.blue}
          />
          <Text style={[s.body, { fontWeight: "600", flex: 1 }]}>
            {segment.provider}
          </Text>
        </View>
        <Text style={s.muted}>
          {segment.mode} · {segment.vehicle ?? "Vehicle confirmed by provider"}
        </Text>
        <Text style={s.muted}>{duration(segment.durationMinutes)}</Text>
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
        <View style={{ flex: 1 }}>
          <Text style={s.sectionTitle}>{time(segment.arrivalTime)}</Text>
          <Text style={s.body}>{segment.destination.name}</Text>
        </View>
      </View>
      {!last && (
        <View
          style={{
            marginLeft: 5,
            borderLeftWidth: 2,
            borderColor: colors.line,
            padding: 20,
          }}
        >
          <Text style={s.muted}>Transfer · continue to your next service</Text>
        </View>
      )}
    </View>
  );
}
export function RouteTimeline({
  route,
}: {
  route: Route & Partial<TravelOption>;
}) {
  if (route.segments?.length)
    return (
      <View>
        {route.segments.map((segment, i) => (
          <Segment
            key={segment.id}
            segment={segment}
            last={i === route.segments!.length - 1}
          />
        ))}
      </View>
    );
  return (
    <View style={{ gap: 16 }}>
      <Text style={s.sectionTitle}>
        {route.departureTime} · {route.departureTerminal}
      </Text>
      <View
        style={{
          marginLeft: 5,
          borderLeftWidth: 2,
          borderColor: colors.line,
          padding: 20,
          gap: 6,
        }}
      >
        <Text style={s.body}>{route.provider}</Text>
        <Text style={s.muted}>
          {route.vehicle} · {duration(route.durationMinutes)}
        </Text>
        <Text style={s.muted}>
          {route.transfers === 0 ? "Direct" : `${route.transfers} transfers`}
        </Text>
      </View>
      <Text style={s.sectionTitle}>
        {route.arrivalTime} · {route.arrivalTerminal}
      </Text>
    </View>
  );
}
