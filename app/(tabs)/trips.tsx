import { Text, View } from "react-native";
import { Page, s, SectionHeader, Icon, colors } from "../../components/ui";
import { RouteTimeline } from "../../components/RouteTimeline";
import { trips } from "../../data/trips";
import { formatDate } from "../../store/TravelContext";
export default function Trips() {
  return (
    <Page>
      <Text style={s.eyebrow}>THE JOURNEY AHEAD</Text>
      <Text style={s.title}>Your trips</Text>
      <Text style={s.body}>
        A little less planning. A little more looking forward.
      </Text>
      <SectionHeader title="Upcoming" caption="1 demo trip" />
      {trips.map((trip) => (
        <View key={trip.id} style={s.card}>
          <View style={s.between}>
            <Text style={s.eyebrow}>
              {formatDate(trip.date)} · DEMO ITINERARY
            </Text>
            <Icon name="ticket-outline" color={colors.blue} />
          </View>
          <Text style={s.sectionTitle}>
            {trip.route.origin} → {trip.route.destination}
          </Text>
          <View style={s.line} />
          <RouteTimeline route={trip.route} />
          <View
            style={{
              backgroundColor: colors.pale,
              padding: 12,
              borderRadius: 8,
            }}
          >
            <Text style={s.muted}>
              A preview of your trip timeline. No booking has been made.
            </Text>
          </View>
        </View>
      ))}
      <SectionHeader title="Past" />
      <View style={{ paddingVertical: 20, gap: 8 }}>
        <Text style={s.body}>Your travel stories start here.</Text>
        <Text style={s.muted}>
          Past trips will appear here after your adventures.
        </Text>
      </View>
    </Page>
  );
}
