import { useState } from "react";
import { Text, View, Pressable } from "react-native";
import { router } from "expo-router";
import { Page } from "../../components/ui";
import { DestinationHero } from "../../components/hero/DestinationHero";
import { RouteCard } from "../../components/RouteCard";
import { Icon } from "../../components/Icon";
import { routeRepository } from "../../data/routes";
import { useTravel } from "../../store/TravelContext";
import { useResponsive } from "../../hooks/useResponsive";
export default function Explore() {
  const { search } = useTravel();
  const { wide, desktop } = useResponsive();
  const [sort, setSort] = useState("Best Value");
  const routes = routeRepository.search(search);
  const sorted = [...routes].sort((a, b) =>
    sort === "Cheapest"
      ? a.price - b.price
      : sort === "Fastest"
        ? a.durationMinutes - b.durationMinutes
        : a.price + a.durationMinutes * 3 - (b.price + b.durationMinutes * 3),
  );
  return (
    <Page immersive style={{ gap: 0, paddingTop: 0 }}>
      <DestinationHero destination={search.destination} />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          flexWrap: "wrap",
          marginVertical: 28,
          gap: wide ? 10 : 4,
        }}
      >
        {[
          {
            label: "Best Value",
            caption: "GREAT BALANCE",
            icon: "diamond-outline",
          },
          {
            label: "Cheapest",
            caption: "LOWEST FARES",
            icon: "wallet-outline",
          },
          {
            label: "Fastest",
            caption: "QUICKEST ROUTES",
            icon: "flash-outline",
          },
        ].map((item) => (
          <Pressable
            key={item.label}
            accessibilityRole="button"
            accessibilityState={{ selected: sort === item.label }}
            onPress={() => setSort(item.label)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: wide ? 22 : 6,
              paddingHorizontal: wide ? 26 : 9,
              paddingVertical: 13,
              borderRadius: 13,
              borderWidth: 1,
              borderColor: sort === item.label ? "#E0D7CC" : "transparent",
              backgroundColor:
                sort === item.label ? "rgba(242,233,222,0.10)" : "transparent",
            }}
          >
            <Icon
              name={
                item.icon as
                  "diamond-outline" | "wallet-outline" | "flash-outline"
              }
              size={wide ? 25 : 18}
              color="#ECE1D5"
            />
            <View style={{ gap: 5 }}>
              <Text style={{ color: "#F5EFE7", fontSize: wide ? 13 : 11 }}>
                {item.label}
              </Text>
              {wide && (
                <Text
                  style={{ color: "#D6C9BC", fontSize: 7, letterSpacing: 2 }}
                >
                  {item.caption}
                </Text>
              )}
            </View>
          </Pressable>
        ))}
      </View>
      <View
        style={{
          flexDirection: desktop ? "row" : "column",
          gap: 18,
          zIndex: 1,
        }}
      >
        {sorted.slice(0, 2).map((route, i) => (
          <View
            key={route.id}
            style={{ flex: desktop ? 1 : undefined, minWidth: 0 }}
          >
            <RouteCard
              compact
              route={route}
              passengers={search.passengers}
              recommendation={i === 0 ? sort : "Alternative"}
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
        ))}
      </View>
      {!sorted.length && (
        <Text style={{ color: "#EFE4D8", padding: 24, textAlign: "center" }}>
          Choose your cities above to find your next journey.
        </Text>
      )}
    </Page>
  );
}
