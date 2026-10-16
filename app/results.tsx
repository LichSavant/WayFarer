import { useMemo, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { router } from "expo-router";
import { Page, Icon, s, EmptyState } from "../components/ui";
import { FilterChip } from "../components/FilterChip";
import { RouteCard } from "../components/RouteCard";
import { routeRepository } from "../data/routes";
import { useTravel, formatDate } from "../store/TravelContext";
export default function Results() {
  const { search } = useTravel();
  const [sort, setSort] = useState("Best");
  const [mode, setMode] = useState("All");
  const [direct, setDirect] = useState(false);
  const results = useMemo(
    () =>
      routeRepository
        .search(search)
        .filter(
          (r) =>
            (mode === "All" || r.mode === mode.toLowerCase()) &&
            (!direct || r.transfers === 0),
        )
        .sort((a, b) =>
          sort === "Cheapest"
            ? a.price - b.price
            : sort === "Fastest"
              ? a.durationMinutes - b.durationMinutes
              : a.price +
                a.durationMinutes * 8 -
                (b.price + b.durationMinutes * 8),
        ),
    [search, mode, direct, sort],
  );
  return (
    <Page>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Back to search"
        onPress={() => router.back()}
      >
        <Icon name="arrow-back" />
      </Pressable>
      <View style={{ gap: 8 }}>
        <Text style={s.eyebrow}>FIND YOUR WAY</Text>
        <Text style={s.title}>
          {search.origin.replace(" City", "")} → {search.destination}
        </Text>
        <Text style={s.muted}>
          {formatDate(search.date)} · {search.passengers} passenger
          {search.passengers > 1 ? "s" : ""} · One way
        </Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 8 }}
      >
        {["Best", "Cheapest", "Fastest"].map((label) => (
          <FilterChip
            key={label}
            label={label}
            selected={sort === label}
            onPress={() => setSort(label)}
          />
        ))}
        {["Ferry", "Flight"].map((label) => (
          <FilterChip
            key={label}
            label={label}
            selected={mode === label}
            onPress={() => setMode((v) => (v === label ? "All" : label))}
          />
        ))}
        <FilterChip
          label="Direct"
          selected={direct}
          onPress={() => setDirect(!direct)}
        />
      </ScrollView>
      <View style={s.between}>
        <Text style={s.muted}>
          {results.length} route{results.length === 1 ? "" : "s"} to explore
        </Text>
        <Text style={s.muted}>Mock fares · PHP</Text>
      </View>
      {results.map((route) => (
        <RouteCard
          key={route.id}
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
      ))}
      {!results.length && (
        <EmptyState
          title="No routes found"
          body="Try a different filter or explore Cebu City to Bohol, Manila, or Siargao; or Manila to Boracay."
        />
      )}
      <Text style={[s.muted, { fontSize: 11, textAlign: "center" }]}>
        Illustrative schedules and fares for this prototype only.
      </Text>
    </Page>
  );
}
