import { useState } from "react";
import { Pressable, Share, Text, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Page, Button, Icon, s, colors, EmptyState } from "../../components/ui";
import { RouteTimeline } from "../../components/RouteTimeline";
import { TransportBadge } from "../../components/TransportBadge";
import { BookingModal } from "../../components/BookingModal";
import { routeRepository, fare, duration } from "../../data/routes";
import { fromLegacyRoute } from "../../services/travel/adapters";
import { JourneyRoute } from "../../types/travel";
import { useTravel, formatDate } from "../../store/TravelContext";
import { useResponsive } from "../../hooks/useResponsive";
export default function Details() {
  const params = useLocalSearchParams<{
    id: string;
    date?: string;
    passengers?: string;
  }>();
  const { search, session, saved, isSaved, toggleSave } = useTravel();
  const { wide } = useResponsive();
  const [modal, setModal] = useState(false);
  const [shareError, setShareError] = useState("");
  const date =
    params.date && /^2026-10-2[4-8]$/.test(params.date)
      ? params.date
      : search.date;
  const savedRoute = saved.find(
    (s) => s.route.id === params.id && s.search.date === date,
  )?.route as JourneyRoute | undefined;
  const legacy = routeRepository.get(params.id);
  const result = session?.options.find(
    (option) =>
      option.id === params.id &&
      option.segments[0]?.departureTime.startsWith(date),
  );
  const route =
    result ??
    (savedRoute?.segments
      ? savedRoute
      : legacy
        ? fromLegacyRoute(legacy, date)
        : undefined);
  if (!route)
    return (
      <Page>
        <Button title="Back to Explore" onPress={() => router.replace("/")} />
        <EmptyState
          title="Route unavailable"
          body="Search again to load this itinerary. Provider results are held only for this session."
        />
      </Page>
    );
  const passengers = Math.min(
    6,
    Math.max(1, Math.floor(Number(params.passengers) || search.passengers)),
  );
  const itinerary = {
    origin: route.origin,
    destination: route.destination,
    date,
    passengers,
  };
  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <Page style={{ gap: 28 }}>
        <Pressable
          accessibilityRole="link"
          accessibilityLabel="Back to routes"
          onPress={() =>
            router.canGoBack() ? router.back() : router.replace("/")
          }
          style={[s.row, { alignSelf: "flex-start", gap: 8 }]}
        >
          <Icon name="arrow-back" size={17} />
          <Text style={s.muted}>Back to routes</Text>
        </Pressable>
        <View style={{ gap: 10 }}>
          <Text style={s.eyebrow}>YOUR WAY THERE</Text>
          <Text style={[s.title, { fontSize: wide ? 42 : 30 }]}>
            {route.origin} → {route.destination}
          </Text>
          <Text style={s.muted}>
            {formatDate(date)} · {passengers} traveler
            {passengers > 1 ? "s" : ""} · {duration(route.totalDurationMinutes)}
          </Text>
        </View>
        <View
          style={{
            flexDirection: wide ? "row" : "column",
            gap: 24,
            alignItems: "flex-start",
          }}
        >
          <View
            style={[
              s.card,
              {
                flex: wide ? 1.6 : undefined,
                width: wide ? undefined : "100%",
                padding: wide ? 30 : 20,
              },
            ]}
          >
            <View style={s.between}>
              <Text style={s.sectionTitle}>Your itinerary</Text>
              <TransportBadge mode={route.mode} />
            </View>
            <View style={s.line} />
            <RouteTimeline route={route} />
          </View>
          <View style={{ flex: 1, width: wide ? undefined : "100%", gap: 22 }}>
            <View style={s.card}>
              <Text style={s.eyebrow}>FARE BREAKDOWN</Text>
              <Text style={s.price}>
                {fare(route.pricePerTraveler * passengers)}{" "}
                <Text style={s.muted}>total</Text>
              </Text>
              <Text style={s.muted}>
                {fare(route.pricePerTraveler)} / traveler × {passengers} adult
                {passengers > 1 ? "s" : ""}
              </Text>
              <View style={s.line} />
              <Text style={s.body}>
                Booking provider: {route.bookingProvider}
              </Text>
              <Text style={s.muted}>
                {duration(route.totalDurationMinutes)} end to end ·{" "}
                {route.transferCount === 0
                  ? "Direct service"
                  : `${route.transferCount} transfers`}
              </Text>
              <Text style={[s.muted, { fontSize: 11 }]}>
                Estimated mock fare. Confirm final prices and inclusions with
                the provider.
              </Text>
            </View>
            <View style={{ gap: 15 }}>
              <Text style={s.sectionTitle}>Good to know</Text>
              {[
                ["Baggage", route.luggage],
                ["Departure terminal", route.departureTerminal],
                ["Arrival terminal", route.arrivalTerminal],
              ].map(([title, body]) => (
                <View key={title} style={[s.row, { alignItems: "flex-start" }]}>
                  <Icon
                    name="information-circle-outline"
                    color={colors.blue}
                    size={18}
                  />
                  <View style={{ flex: 1 }}>
                    <Text style={[s.body, { fontSize: 13, fontWeight: "600" }]}>
                      {title}
                    </Text>
                    <Text style={s.muted}>{body}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>
        <View style={[s.row, { flexWrap: "wrap" }]}>
          <Button
            secondary
            title={isSaved(route.id, date) ? "Saved route" : "Save route"}
            icon={isSaved(route.id, date) ? "heart" : "heart-outline"}
            onPress={() => toggleSave(route, itinerary)}
          />
          <Button
            secondary
            title="Share"
            icon="share-outline"
            onPress={async () => {
              try {
                await Share.share({
                  message: `${route.origin} to ${route.destination} · ${formatDate(date)} · ${route.provider} · ${fare(route.pricePerTraveler * passengers)} total for ${passengers}. Compare on WayFarer.`,
                });
              } catch {
                setShareError("Sharing is unavailable on this device.");
              }
            }}
          />
        </View>
        {!!shareError && <Text style={s.muted}>{shareError}</Text>}
        <Text style={[s.muted, { fontSize: 11 }]}>
          This itinerary is illustrative, including schedules, flights and
          baggage allowances. WayFarer does not process bookings or payments.
        </Text>
      </Page>
      <SafeAreaView
        edges={["bottom"]}
        style={{
          backgroundColor: "white",
          borderTopWidth: 1,
          borderColor: colors.line,
        }}
      >
        <View
          style={{
            padding: 16,
            width: "100%",
            maxWidth: 1200,
            alignSelf: "center",
            flexDirection: wide ? "row" : "column",
            justifyContent: "space-between",
            alignItems: wide ? "center" : "stretch",
            gap: 10,
          }}
        >
          {wide && (
            <View>
              <Text style={s.price}>
                {fare(route.pricePerTraveler * passengers)}
              </Text>
              <Text style={s.muted}>
                Estimated total · {passengers} traveler
                {passengers > 1 ? "s" : ""}
              </Text>
            </View>
          )}
          <Button
            title={`Continue to ${route.bookingProvider}`}
            icon="open-outline"
            onPress={() => setModal(true)}
          />
        </View>
      </SafeAreaView>
      <BookingModal
        visible={modal}
        provider={route.bookingProvider}
        onClose={() => setModal(false)}
      />
    </View>
  );
}
