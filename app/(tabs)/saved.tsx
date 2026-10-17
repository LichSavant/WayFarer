import { Pressable, Text, View } from "react-native";
import { router } from "expo-router";
import { Page, s, Icon, colors, EmptyState, Button } from "../../components/ui";
import { EditorialBanner } from "../../components/EditorialBanner";
import { RouteCard } from "../../components/RouteCard";
import { useTravel, formatDate } from "../../store/TravelContext";
export default function Saved() {
  const { saved, toggleSave } = useTravel();
  return (
    <Page>
      <EditorialBanner
        eyebrow="02 / YOUR COLLECTION"
        title="Keep a little possibility."
        subtitle="Your saved journeys, ready when you are."
        image="coast"
      />
      <View style={[s.between, { flexWrap: "wrap", gap: 12 }]}>
        <Text style={[s.sectionTitle, { fontSize: 25, fontWeight: "500" }]}>
          Saved trips
        </Text>
        <Text style={s.muted}>
          {saved.length} saved itinerar{saved.length === 1 ? "y" : "ies"}
        </Text>
      </View>
      {!saved.length ? (
        <View
          style={{
            borderTopWidth: 1,
            borderBottomWidth: 1,
            borderColor: colors.line,
            paddingVertical: 24,
            gap: 20,
          }}
        >
          <EmptyState
            title="Your next adventure lives here"
            body="Save an itinerary while comparing routes, then come back when you're ready."
          />
          <View style={{ alignSelf: "center" }}>
            <Button
              title="Explore routes"
              icon="arrow-forward"
              onPress={() => router.push("/")}
            />
          </View>
        </View>
      ) : (
        saved.map(({ route, search }) => (
          <View key={`${route.id}-${search.date}`} style={{ gap: 12 }}>
            <View style={s.between}>
              <View>
                <Text style={[s.body, { fontWeight: "500" }]}>
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
                style={({ pressed }) => ({
                  padding: 13,
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: colors.line,
                  opacity: pressed ? 0.6 : 1,
                })}
              >
                <Icon name="trash-outline" color={colors.muted} size={18} />
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
