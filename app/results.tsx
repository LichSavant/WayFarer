import { useEffect, useMemo, useRef, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Page, Icon, s, EmptyState, Button, colors } from "../components/ui";
import { FilterChip } from "../components/FilterChip";
import { RouteCard } from "../components/RouteCard";
import { RecommendationsSection } from "../components/RecommendationsSection";
import { SearchProgress } from "../components/SearchProgress";
import { useTravel, formatDate } from "../store/TravelContext";
import { useResponsive } from "../hooks/useResponsive";
import { rankOptions, RouteSort } from "../utils/ranking";
import { getRecommendations } from "../utils/recommendations";
import { JourneyRoute } from "../types/travel";
export default function Results() {
  const { search, session, searching, searchError, runSearch } = useTravel();
  const { wide } = useResponsive();
  const params = useLocalSearchParams<{
    origin?: string;
    destination?: string;
  }>();
  const [sort, setSort] = useState<RouteSort>("Best");
  const [mode, setMode] = useState("All");
  const [direct, setDirect] = useState(false);
  const started = useRef<string | null>(null);
  const request = useMemo(
    () => ({
      ...search,
      origin: params.origin ?? search.origin,
      destination: params.destination ?? search.destination,
    }),
    [search, params.origin, params.destination],
  );
  useEffect(() => {
    const key = JSON.stringify(request);
    if (started.current === key) return;
    started.current = key;
    if (!session || JSON.stringify(session.request) !== key)
      void runSearch(request);
  }, [request, session, runSearch]);
  const options = session?.options ?? [];
  const itinerary = session?.request ?? request;
  const picks = useMemo(
    () => getRecommendations(options, itinerary.passengers),
    [options, itinerary.passengers],
  );
  const results = useMemo(
    () =>
      rankOptions(options, sort, itinerary.passengers).filter(
        (r) =>
          (mode === "All" ||
            r.segments.some(
              (segment) => segment.mode === mode.toLowerCase(),
            )) &&
          (!direct || r.transferCount === 0),
      ),
    [options, sort, itinerary.passengers, mode, direct],
  );
  const open = (option: JourneyRoute) =>
    router.push({
      pathname: "/route/[id]",
      params: {
        id: option.id,
        date: itinerary.date,
        passengers: itinerary.passengers,
      },
    });
  return (
    <Page style={{ gap: wide ? 32 : 24 }}>
      <Pressable
        accessibilityRole="link"
        onPress={() => router.push("/")}
        style={[s.row, { alignSelf: "flex-start", gap: 8 }]}
      >
        <Icon name="arrow-back" size={17} />
        <Text style={s.muted}>Edit search</Text>
      </Pressable>
      <View style={{ gap: 10 }}>
        <Text style={s.eyebrow}>A GOOD JOURNEY STARTS WITH A CHOICE</Text>
        <Text style={[s.title, { fontSize: wide ? 42 : 30 }]}>
          {itinerary.origin.replace(" City", "")} → {itinerary.destination}
        </Text>
        <Text style={s.muted}>
          {formatDate(itinerary.date)} · {itinerary.passengers} traveler
          {itinerary.passengers > 1 ? "s" : ""} · One way
        </Text>
      </View>
      <SearchProgress
        visible={searching}
        origin={request.origin}
        destination={request.destination}
      />
      {!!searchError ? (
        <View style={s.card}>
          <Text accessibilityRole="alert" style={s.body}>
            {searchError}
          </Text>
          <Button title="Try again" onPress={() => void runSearch(request)} />
        </View>
      ) : (
        <>
          {session?.warnings.map((warning) => (
            <Text
              key={warning}
              accessibilityRole="alert"
              style={[s.muted, { color: "#9B6126" }]}
            >
              {warning}
            </Text>
          ))}
          {picks.length > 0 && (
            <RecommendationsSection
              picks={picks}
              travelers={itinerary.passengers}
              onSelect={open}
            />
          )}
          <View style={{ gap: 18 }}>
            <View style={[s.between, { flexWrap: "wrap", gap: 8 }]}>
              <Text style={[s.sectionTitle, { fontSize: 25 }]}>All routes</Text>
              <Text style={s.muted}>
                {results.length} of {options.length} options · estimated PHP
                fares
              </Text>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: 8 }}
            >
              {(["Best", "Cheapest", "Fastest"] as const).map((label) => (
                <FilterChip
                  key={label}
                  label={label}
                  selected={sort === label}
                  onPress={() => setSort(label)}
                />
              ))}
              <View
                style={{
                  width: 1,
                  backgroundColor: colors.line,
                  marginHorizontal: 4,
                }}
              />
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
                onPress={() => setDirect((v) => !v)}
              />
            </ScrollView>
            {results.map((route) => (
              <RouteCard
                key={route.id}
                route={route}
                passengers={itinerary.passengers}
                recommendation={picks
                  .filter((p) => p.option.id === route.id)
                  .map((p) => p.label)
                  .join(" · ")}
                onPress={() => open(route)}
              />
            ))}
            {!results.length && !searching && (
              <EmptyState
                title="No routes found"
                body={
                  options.length
                    ? "Try a different transport filter. Your WayFarer Picks stay above for comparison."
                    : "Try Cebu City to Bohol, Manila or Siargao; or Manila to Boracay. No live inventory is connected."
                }
              />
            )}
          </View>
        </>
      )}
      <Text style={[s.muted, { fontSize: 11, textAlign: "center" }]}>
        Illustrative schedules, journey times and fares. Booking and payment
        will happen with the provider.
      </Text>
    </Page>
  );
}
