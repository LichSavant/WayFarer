import { useState } from "react";
import { Modal, Pressable, Share, Text, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Page, Button, Icon, s, colors, EmptyState } from "../../components/ui";
import { RouteTimeline } from "../../components/RouteTimeline";
import { TransportBadge } from "../../components/TransportBadge";
import { routeRepository, fare, duration } from "../../data/routes";
import { useTravel, formatDate } from "../../store/TravelContext";
export default function Details() {
  const params = useLocalSearchParams<{
    id: string;
    date?: string;
    passengers?: string;
  }>();
  const route = routeRepository.get(params.id);
  const { search, isSaved, toggleSave } = useTravel();
  const [modal, setModal] = useState(false);
  const [shareError, setShareError] = useState("");
  if (!route)
    return (
      <Page>
        <Button title="Back to Explore" onPress={() => router.replace("/")} />
        <EmptyState
          title="Route unavailable"
          body="Choose another itinerary from Explore."
        />
      </Page>
    );
  const date =
    params.date && /^2026-10-2[4-8]$/.test(params.date)
      ? params.date
      : search.date;
  const passengers = Math.min(
    6,
    Math.max(1, Number(params.passengers) || search.passengers),
  );
  const itinerary = {
    origin: route.origin,
    destination: route.destination,
    date,
    passengers,
  };
  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <Page>
        <View style={s.between}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Back"
            onPress={() =>
              router.canGoBack() ? router.back() : router.replace("/")
            }
          >
            <Icon name="arrow-back" />
          </Pressable>
          <Text style={s.eyebrow}>YOUR ITINERARY</Text>
          <TransportBadge mode={route.mode} />
        </View>
        <View style={{ gap: 8 }}>
          <Text style={s.title}>
            {route.origin} → {route.destination}
          </Text>
          <Text style={s.muted}>
            {formatDate(date)} · {passengers} passenger
            {passengers > 1 ? "s" : ""}
          </Text>
        </View>
        <View style={s.card}>
          <View style={s.between}>
            <Text style={s.sectionTitle}>{route.provider}</Text>
            <Text style={s.price}>{fare(route.price * passengers)}</Text>
          </View>
          <Text style={s.muted}>
            Estimated total · {duration(route.durationMinutes)} · Direct
          </Text>
          <View style={s.line} />
          <RouteTimeline route={route} />
        </View>
        <View style={{ gap: 16 }}>
          <Text style={s.sectionTitle}>Good to know</Text>
          {[
            ["Luggage", route.luggage],
            ["Departure terminal", route.departureTerminal],
            ["Transfers", "Direct service. No changes along the way."],
          ].map(([title, body]) => (
            <View key={title} style={[s.row, { alignItems: "flex-start" }]}>
              <Icon
                name="information-circle-outline"
                size={20}
                color={colors.blue}
              />
              <View style={{ flex: 1 }}>
                <Text style={[s.body, { fontWeight: "600" }]}>{title}</Text>
                <Text style={s.muted}>{body}</Text>
              </View>
            </View>
          ))}
        </View>
        <View style={s.row}>
          <View style={{ flex: 1 }}>
            <Button
              secondary
              title={isSaved(route.id, date) ? "Saved route" : "Save route"}
              icon={isSaved(route.id, date) ? "heart" : "heart-outline"}
              onPress={() => toggleSave(route, itinerary)}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Button
              secondary
              title="Share"
              icon="share-outline"
              onPress={async () => {
                try {
                  await Share.share({
                    message: `${route.origin} → ${route.destination} · ${formatDate(date)} · ${route.provider} · ${route.departureTime} · ${fare(route.price * passengers)} estimated, for ${passengers}. Discover your way with WayFarer.`,
                  });
                } catch {
                  setShareError("Sharing is unavailable on this device.");
                }
              }}
            />
          </View>
        </View>
        {!!shareError && <Text style={s.muted}>{shareError}</Text>}
        <Text style={s.muted}>
          This is a demo itinerary. Schedules, luggage allowances and fares are
          illustrative and need confirmation with the provider.
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
            maxWidth: 760,
            alignSelf: "center",
          }}
        >
          <Button
            title={`Continue to ${route.provider}`}
            icon="open-outline"
            onPress={() => setModal(true)}
          />
        </View>
      </SafeAreaView>
      <Modal
        visible={modal}
        transparent
        animationType="fade"
        onRequestClose={() => setModal(false)}
      >
        <View
          style={{
            flex: 1,
            padding: 28,
            backgroundColor: "#152C3B66",
            justifyContent: "center",
          }}
        >
          <View style={s.card}>
            <Icon name="boat-outline" size={34} color={colors.blue} />
            <Text style={s.sectionTitle}>More journeys ahead</Text>
            <Text style={s.body}>
              Booking integration will be connected later.
            </Text>
            <Button title="Got it" onPress={() => setModal(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
}
