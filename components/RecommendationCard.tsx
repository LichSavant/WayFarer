import { Text, View } from "react-native";
import { JourneyRoute } from "../types/travel";
import { Button, colors, Icon, s } from "./ui";
import { fare, duration } from "../data/routes";
export function RecommendationCard({
  label,
  option,
  reason,
  note,
  primary,
  travelers,
  onPress,
}: {
  label: string;
  option: JourneyRoute;
  reason: string;
  note: string;
  primary: boolean;
  travelers: number;
  onPress: () => void;
}) {
  return (
    <View
      style={[
        s.card,
        {
          flex: 1,
          height: "100%",
          padding: 22,
          borderColor: primary ? colors.blue : colors.line,
          backgroundColor: primary ? "#F0F6FA" : "white",
          gap: 18,
        },
      ]}
    >
      <View style={s.between}>
        <Text
          style={[s.eyebrow, { color: primary ? colors.blue : colors.muted }]}
        >
          {label.toUpperCase()}
        </Text>
        <Icon
          name={
            primary
              ? "sparkles-outline"
              : label === "Cheapest"
                ? "wallet-outline"
                : "time-outline"
          }
          size={18}
          color={colors.blue}
        />
      </View>
      <View style={{ gap: 4 }}>
        <Text style={s.sectionTitle}>{option.provider}</Text>
        <Text style={s.muted}>
          {option.mode === "ferry" ? "Ferry" : "Flight"} ·{" "}
          {duration(option.totalDurationMinutes)} ·{" "}
          {option.transferCount === 0
            ? "Direct"
            : `${option.transferCount} transfer`}
        </Text>
      </View>
      <View style={[s.between, { alignItems: "flex-start", gap: 8 }]}>
        <View style={{ flex: 1, gap: 5 }}>
          <Text style={[s.body, { fontWeight: "700" }]}>
            {option.departureTime}
          </Text>
          <Text style={[s.muted, { fontSize: 11 }]}>
            {option.departureTerminal}
          </Text>
        </View>
        <Icon name="arrow-forward" size={16} color={colors.muted} />
        <View style={{ flex: 1, alignItems: "flex-end", gap: 5 }}>
          <Text style={[s.body, { fontWeight: "700" }]}>
            {option.arrivalTime}
          </Text>
          <Text style={[s.muted, { fontSize: 11, textAlign: "right" }]}>
            {option.arrivalTerminal}
          </Text>
        </View>
      </View>
      <View style={s.line} />
      <View style={{ gap: 4 }}>
        <Text style={s.price}>
          {fare(option.pricePerTraveler * travelers)}{" "}
          <Text style={[s.muted, { fontWeight: "400" }]}>total</Text>
        </Text>
        <Text style={s.muted}>{fare(option.pricePerTraveler)} / traveler</Text>
        <Text
          style={{
            fontSize: 12,
            fontWeight: "600",
            color: colors.blue,
            marginTop: 6,
          }}
        >
          {note}
        </Text>
      </View>
      <View style={{ flex: 1, gap: 5 }}>
        <Text style={[s.body, { fontSize: 12, fontWeight: "600" }]}>
          Why WayFarer picked this
        </Text>
        <Text style={[s.muted, { fontSize: 12 }]}>{reason}</Text>
      </View>
      <Button
        title="View trip"
        secondary={!primary}
        icon="arrow-forward"
        onPress={onPress}
      />
    </View>
  );
}
