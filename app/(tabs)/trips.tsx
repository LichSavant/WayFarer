import { ImageBackground, Text, View } from "react-native";
import { Page, s, SectionHeader, Icon, colors } from "../../components/ui";
import { EditorialBanner } from "../../components/EditorialBanner";
import { GlassPanel } from "../../components/glass/GlassPanel";
import { glass, radius } from "../../components/theme";
import { RouteTimeline } from "../../components/RouteTimeline";
import { useResponsive } from "../../hooks/useResponsive";
import { trips } from "../../data/trips";
import { formatDate } from "../../store/TravelContext";
export default function Trips() {
  const { wide } = useResponsive();
  return (
    <Page>
      <EditorialBanner
        eyebrow="03 / THE JOURNEY AHEAD"
        title="Something to look forward to."
        subtitle="A little less planning. A little more going."
        image="sunset"
      />
      <SectionHeader title="Upcoming" caption="1 demo trip" />
      {trips.map((trip) => (
        <View
          key={trip.id}
          style={{
            flexDirection: wide ? "row" : "column",
            borderWidth: 1,
            borderColor: colors.line,
            borderRadius: radius.large,
            backgroundColor: "#FAFBF8",
          }}
        >
          <ImageBackground
            source={require("../../assets/destinations/islands.jpg")}
            imageStyle={{
              borderTopLeftRadius: radius.large,
              borderBottomLeftRadius: wide ? radius.large : 0,
              borderTopRightRadius: wide ? 0 : radius.large,
            }}
            style={{
              width: wide ? "42%" : "100%",
              minHeight: wide ? 360 : 210,
              justifyContent: "flex-end",
              padding: 22,
            }}
          >
            <GlassPanel blur={false} style={{ gap: 12 }}>
              <Icon name="ticket-outline" color={colors.aqua} size={23} />
              <Text
                style={{ fontSize: 9, letterSpacing: 1.4, color: glass.muted }}
              >
                {formatDate(trip.date).toUpperCase()} · DEMO ITINERARY
              </Text>
              <Text
                style={{
                  fontSize: 26,
                  lineHeight: 33,
                  letterSpacing: -0.6,
                  fontWeight: "500",
                  color: glass.text,
                }}
              >
                {trip.route.origin} → {trip.route.destination}
              </Text>
              <Text style={{ fontSize: 12, color: glass.muted }}>
                {trip.route.provider} · {trip.route.departureTime}
              </Text>
            </GlassPanel>
          </ImageBackground>
          <View style={{ flex: 1, padding: wide ? 32 : 22, gap: 22 }}>
            <Text style={s.eyebrow}>YOUR DAY, AT A GLANCE</Text>
            <RouteTimeline route={trip.route} />
            <View
              style={{
                borderTopWidth: 1,
                borderColor: colors.line,
                paddingTop: 16,
              }}
            >
              <Text style={s.muted}>
                A preview of your trip timeline. No booking has been made.
              </Text>
            </View>
          </View>
        </View>
      ))}
      <SectionHeader title="Past" />
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: colors.line,
          gap: 8,
        }}
      >
        <Text style={[s.body, { fontSize: 20, fontWeight: "400" }]}>
          Your travel stories start here.
        </Text>
        <Text style={s.muted}>
          Past trips will appear here after your adventures.
        </Text>
      </View>
    </Page>
  );
}
