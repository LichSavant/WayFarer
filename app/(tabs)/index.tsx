import { Pressable, ScrollView, Text, View } from "react-native";
import { router } from "expo-router";
import { Page, Icon, colors, s, SectionHeader } from "../../components/ui";
import { SearchCard } from "../../components/SearchCard";
import { PopularRouteCard } from "../../components/PopularRouteCard";
import { popularRoutes } from "../../data/popularRoutes";
import { useTravel } from "../../store/TravelContext";
export default function Explore() {
  const { setSearch } = useTravel();
  return (
    <Page>
      <View style={s.between}>
        <View style={s.row}>
          <View
            style={{
              width: 33,
              height: 33,
              borderRadius: 10,
              backgroundColor: colors.navy,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon name="navigate" color="white" size={19} />
          </View>
          <Text
            style={{
              fontSize: 23,
              fontWeight: "700",
              letterSpacing: -0.9,
              color: colors.navy,
            }}
          >
            WayFarer<Text style={{ color: colors.blue }}>.</Text>
          </Text>
        </View>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Open profile"
          onPress={() => router.push("/profile")}
          style={({ pressed }) => ({
            width: 38,
            height: 38,
            borderRadius: 19,
            backgroundColor: "#E4E9E5",
            alignItems: "center",
            justifyContent: "center",
            opacity: pressed ? 0.7 : 1,
          })}
        >
          <Text style={{ color: colors.navy, fontWeight: "600", fontSize: 12 }}>
            AT
          </Text>
        </Pressable>
      </View>
      <View style={{ marginTop: 13, gap: 10 }}>
        <Text style={s.eyebrow}>LESS SEARCHING. MORE GOING.</Text>
        <Text style={[s.title, { fontSize: 39, lineHeight: 44 }]}>
          Where are you{String.fromCharCode(10)}going?
        </Text>
        <Text style={s.body}>Different ways there. One place to compare.</Text>
      </View>
      <SearchCard />
      <View style={{ gap: 16 }}>
        <SectionHeader title="Popular routes" caption="A little inspiration" />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 16 }}
        >
          {popularRoutes.map((item) => (
            <PopularRouteCard
              key={item.destination}
              item={item}
              onPress={() => {
                setSearch((v) => ({
                  ...v,
                  origin: item.origin,
                  destination: item.destination,
                }));
                router.push("/results");
              }}
            />
          ))}
        </ScrollView>
      </View>
      <View
        style={{
          padding: 22,
          backgroundColor: "#EAF0EC",
          borderRadius: 16,
          gap: 12,
        }}
      >
        <View style={s.row}>
          <Icon name="sparkles-outline" color="#557763" />
          <Text style={[s.sectionTitle, { flex: 1 }]}>
            Travel smarter. Wander further.
          </Text>
        </View>
        <Text style={[s.body, { color: "#597064" }]}>
          By sea or by sky, find your kind of journey. Compare flights and
          ferries across the Philippines, all in one place.
        </Text>
        <Text style={[s.eyebrow, { color: "#557763", fontSize: 9 }]}>
          MANY ISLANDS. MORE POSSIBILITIES.
        </Text>
      </View>
      <Text style={[s.muted, { textAlign: "center", fontSize: 11 }]}>
        Made for the journey between the islands.
      </Text>
    </Page>
  );
}
