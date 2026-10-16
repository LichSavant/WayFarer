import { Pressable, Text, View } from "react-native";
import { router } from "expo-router";
import { Page, s, Icon, colors, EmptyState, Button } from "../../components/ui";
import { RouteCard } from "../../components/RouteCard";
import { useTravel, formatDate } from "../../store/TravelContext";
export default function Saved() {
  const { saved, toggleSave } = useTravel();
  return (
    <Page>
      <Text style={s.eyebrow}>KEEP THE POSSIBILITIES</Text>
      <Text style={s.title}>Saved trips</Text>
      <Text style={s.body}>Good journeys are worth keeping.</Text>
      {!saved.length ? (
        <>
          <EmptyState
            title="Your next adventure lives here"
            body="Save an itinerary while comparing routes, then come back when you're ready."
          />
          <Button title="Explore routes" onPress={() => router.push("/")} />
        </>
      ) : (
        saved.map(({ route, search }) => (
          <View key={`${route.id}-${search.date}`} style={{ gap: 12 }}>
            <View style={s.between}>
              <View>
                <Text style={[s.body, { fontWeight: "600" }]}>
                  {route.origin} → {route.destination}
                </Text>
                <Text style={s.muted}>
                  {formatDate(search.date)} · {search.passengers} traveler
                  {search.passengers > 1 ? "s" : ""}
                </Text>
              </View>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={`Remove ${route.provider} saved route`}
                onPress={() => toggleSave(route, search)}
                style={{ padding: 8 }}
              >
                <Icon name="trash-outline" color={colors.muted} size={19} />
              </Pressable>
            </View>
            <RouteCard
              route={route}
              passengers={search.passengers}
              onPress={() =>
                router.push({
                  pathname: "/route/[id]",
                  params: {
                    id: route.id,
                    date: search.date,
                    passengers: search.passengers,
                  },
                })
              }
            />
          </View>
        ))
      )}
    </Page>
  );
}
