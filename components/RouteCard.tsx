import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { Route } from "../types/route";
import { TravelOption } from "../types/travel";
import { duration, fare } from "../data/routes";
import { useTravel } from "../store/TravelContext";
import { Icon } from "./Icon";
import { airportCode, Barcode, TicketMap } from "./ticket";
import { useResponsive } from "../hooks/useResponsive";
export function RouteCard({
  route,
  onPress,
  passengers = 1,
  recommendation,
  compact = false,
  date,
}: {
  route: Route & Partial<TravelOption>;
  onPress: () => void;
  passengers?: number;
  recommendation?: string;
  compact?: boolean;
  date?: string;
}) {
  const { contentWidth } = useResponsive();
  const [measuredWidth, setMeasuredWidth] = useState<number | null>(null);
  const cardWidth = measuredWidth ?? contentWidth;
  const { search } = useTravel();
  const row = cardWidth >= (compact ? 560 : 640);
  const padding = cardWidth < 380 ? 16 : compact ? 21 : 26;
  const bodyWidth = cardWidth - (row ? (compact ? 177 : 250) : 0) - padding * 2;
  const codeSize = Math.max(
    26,
    Math.min(compact ? 39 : 44, (bodyWidth - 64) / 4.5),
  );
  const price = route.pricePerTraveler ?? route.price;
  const transfers = route.transferCount ?? route.transfers;
  const label =
    recommendation || (route.mode === "flight" ? "FLIGHT" : "FERRY");
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`View ${route.provider} route, ${fare(price * passengers)} total`}
      onPress={onPress}
      onLayout={(event) => setMeasuredWidth(event.nativeEvent.layout.width)}
      style={({ pressed }) => ({
        opacity: pressed ? 0.8 : 1,
        width: "100%",
        minWidth: 0,
        flexDirection: row ? "row" : "column",
        minHeight: compact ? 206 : 210,
        backgroundColor: "#F2EDE6",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.3)",
      })}
    >
      <View
        style={{ flex: row ? 1 : undefined, minWidth: 0, padding, gap: 16 }}
      >
        <TicketMap />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 12,
          }}
        >
          <View style={{ gap: 9, flex: 1, minWidth: 0 }}>
            <View
              style={{
                backgroundColor: label.toLowerCase().includes("best")
                  ? "#B8D9F3"
                  : "#E0D5C9",
                borderRadius: 20,
                paddingHorizontal: 10,
                paddingVertical: 4,
                alignSelf: "flex-start",
              }}
            >
              <Text
                style={{
                  fontSize: 7,
                  letterSpacing: 2,
                  color: "#312C26",
                  fontWeight: "700",
                }}
              >
                {label.toUpperCase()}
              </Text>
            </View>
            <Text
              style={{
                fontSize: 11,
                letterSpacing: 2,
                fontWeight: "800",
                color: "#27211B",
              }}
            >
              {route.provider.toUpperCase()}
            </Text>
          </View>
          <Text
            style={{
              fontSize: 7,
              letterSpacing: 1.5,
              lineHeight: 13,
              textAlign: "right",
              color: "#5E5348",
            }}
          >
            {transfers === 0 ? "NON-STOP" : transfers + " STOP"}
            {"\n"}
            {duration(
              route.totalDurationMinutes ?? route.durationMinutes,
            ).toUpperCase()}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: bodyWidth < 250 ? 8 : 14,
          }}
        >
          <Text
            style={{
              fontSize: codeSize,
              fontWeight: "700",
              letterSpacing: -2,
              color: "#161310",
            }}
          >
            {airportCode(route.origin)}
          </Text>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              gap: 6,
            }}
          >
            <View
              style={{
                flex: 1,
                borderTopWidth: 1,
                borderStyle: "dashed",
                borderColor: "#A89A8B",
              }}
            />
            <Icon
              name={route.mode === "ferry" ? "boat" : "airplane"}
              size={24}
              color="#342B23"
            />
            <View
              style={{
                flex: 1,
                borderTopWidth: 1,
                borderStyle: "dashed",
                borderColor: "#A89A8B",
              }}
            />
          </View>
          <Text
            style={{
              fontSize: codeSize,
              fontWeight: "700",
              letterSpacing: -2,
              color: "#161310",
            }}
          >
            {airportCode(route.destination)}
          </Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text
            style={{
              fontSize: 9,
              letterSpacing: 1.5,
              color: "#4D4338",
              flex: 1,
              minWidth: 0,
              flexShrink: 1,
            }}
          >
            {route.origin.replace(" City", "").toUpperCase()}
          </Text>
          <Text
            style={{
              fontSize: 9,
              letterSpacing: 1.5,
              color: "#4D4338",
              flex: 1,
              minWidth: 0,
              textAlign: "right",
              flexShrink: 1,
            }}
          >
            {route.destination.toUpperCase()}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 2,
          }}
        >
          <Text
            style={{
              flex: 1,
              minWidth: 0,
              fontSize: bodyWidth < 260 ? 9 : 11,
              lineHeight: 20,
              letterSpacing: bodyWidth < 260 ? 0 : 1,
              color: "#302820",
            }}
          >
            {new Date((date ?? search.date) + "T12:00:00")
              .toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })
              .toUpperCase()}
            {"\n"}
            {route.departureTime}
          </Text>
          <Text
            style={{
              flex: 1,
              minWidth: 0,
              fontSize: bodyWidth < 260 ? 9 : 11,
              lineHeight: 20,
              letterSpacing: bodyWidth < 260 ? 0 : 1,
              color: "#302820",
              textAlign: "right",
            }}
          >
            {new Date((date ?? search.date) + "T12:00:00")
              .toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })
              .toUpperCase()}
            {"\n"}
            {route.arrivalTime}
          </Text>
        </View>
      </View>
      <View
        style={{
          width: row ? (compact ? 177 : 250) : undefined,
          padding,
          borderLeftWidth: row ? 1 : 0,
          borderTopWidth: row ? 0 : 1,
          borderStyle: "dashed",
          borderColor: "#C5B6A6",
          gap: 18,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 10,
          }}
        >
          <Text
            style={{
              fontSize: compact ? 21 : 26,
              fontWeight: "700",
              color: "#211B16",
            }}
          >
            {fare(price * passengers)}
          </Text>
          <Icon name="chevron-forward" size={18} color="#241E18" />
        </View>
        <View
          style={{ flexDirection: "row", gap: 18, flex: row ? 1 : undefined }}
        >
          <View style={{ flex: 1, minWidth: 0, gap: 14 }}>
            <View>
              <Text style={tiny}>SERVICE</Text>
              <Text style={detail}>{route.id.toUpperCase().slice(0, 12)}</Text>
            </View>
            <View>
              <Text style={tiny}>CLASS</Text>
              <Text style={detail}>ECONOMY</Text>
            </View>
            <View>
              <Text style={tiny}>BAGGAGE</Text>
              <Text numberOfLines={2} style={detail}>
                {route.luggage}
              </Text>
            </View>
          </View>
          <View style={{ width: 31 }}>
            <Barcode vertical height={117} />
          </View>
        </View>
      </View>
    </Pressable>
  );
}
const tiny = {
  fontSize: 7,
  letterSpacing: 1.8,
  color: "#766858",
  marginBottom: 5,
};
const detail = {
  fontSize: 9,
  letterSpacing: 0.5,
  color: "#322A22",
  lineHeight: 14,
};
