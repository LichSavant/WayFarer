import { Text, View } from "react-native";
import { router } from "expo-router";
import { Page, colors, Icon, s, SectionHeader } from "../../components/ui";
import { SiteFooter } from "../../components/SiteFooter";
import { DestinationHero } from "../../components/hero/DestinationHero";
import { PopularRouteCard } from "../../components/PopularRouteCard";
import { popularRoutes } from "../../data/popularRoutes";
import { useTravel } from "../../store/TravelContext";
import { useResponsive } from "../../hooks/useResponsive";
export default function Explore() {
  const { search, setSearch } = useTravel();
  const { wide, width } = useResponsive();
  return (
    <Page immersive>
      <DestinationHero destination={search.destination} />
      <View
        style={{
          width: "100%",
          maxWidth: 1200,
          alignSelf: "center",
          padding: wide ? 32 : 20,
          paddingTop: wide ? 54 : 32,
          gap: wide ? 40 : 28,
        }}
      >
        <View style={{ gap: 22 }}>
          <SectionHeader
            title="Popular routes"
            caption={wide ? "Popular routes from the islands" : undefined}
          />
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 20 }}>
            {popularRoutes.map((item) => (
              <View
                key={item.destination}
                style={{
                  width: width >= 1024 ? "23.5%" : wide ? "48%" : "100%",
                  flexGrow: 1,
                }}
              >
                <PopularRouteCard
                  item={item}
                  fluid
                  onPress={() => {
                    setSearch((v) => ({
                      ...v,
                      origin: item.origin,
                      destination: item.destination,
                    }));
                    router.push({
                      pathname: "/results",
                      params: {
                        origin: item.origin,
                        destination: item.destination,
                      },
                    });
                  }}
                />
              </View>
            ))}
          </View>
        </View>
        <View
          style={{
            borderTopWidth: 1,
            borderColor: colors.line,
            paddingTop: 32,
            paddingBottom: 16,
            flexDirection: wide ? "row" : "column",
            gap: 24,
          }}
        >
          <View style={{ flex: 1, gap: 10 }}>
            <Text style={s.eyebrow}>LESS SEARCHING. MORE GOING.</Text>
            <Text style={[s.sectionTitle, { fontSize: 28, lineHeight: 35 }]}>
              One search.{String.fromCharCode(10)}Different ways there.
            </Text>
          </View>
          <View style={{ flex: 1.3, gap: 18 }}>
            <Text style={[s.body, { color: "#65757D" }]}>
              A ferry for the slower days. A flight when time matters. WayFarer
              compares available routes and helps you choose the journey that
              fits.
            </Text>
            <View style={[s.row, { gap: 24, flexWrap: "wrap" }]}>
              {["Better value", "Lower fares", "More time there"].map(
                (text) => (
                  <View key={text} style={[s.row, { gap: 6 }]}>
                    <Icon name="checkmark" color={colors.blue} size={15} />
                    <Text style={[s.body, { fontSize: 13 }]}>{text}</Text>
                  </View>
                ),
              )}
            </View>
          </View>
        </View>
        <SiteFooter />
      </View>
    </Page>
  );
}
