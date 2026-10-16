import { ImageBackground, Text, View } from "react-native";
import { JourneyRoute } from "../types/travel";
import { getRecommendations } from "../utils/recommendations";
import { RecommendationCard } from "./RecommendationCard";
import { GlassSurface } from "./glass/GlassSurface";
import { useResponsive } from "../hooks/useResponsive";
import { colors, radius, glass } from "./theme";
import { s } from "./ui";
interface Props {
  picks: ReturnType<typeof getRecommendations<JourneyRoute>>;
  travelers: number;
  onSelect: (option: JourneyRoute) => void;
}
export function RecommendationsSection({ picks, travelers, onSelect }: Props) {
  const { wide, columns } = useResponsive();
  return (
    <ImageBackground
      source={require("../assets/destinations/islands.jpg")}
      imageStyle={{ borderRadius: radius.large, opacity: 0.2 }}
      style={{ backgroundColor: "#DFEAE7", borderRadius: radius.large }}
    >
      <GlassSurface
        level="functional"
        tone="light"
        style={{
          padding: wide ? 26 : 18,
          gap: 22,
          borderRadius: radius.large,
          backgroundColor: glass.environmental,
        }}
      >
        <View style={{ gap: 8 }}>
          <Text style={[s.eyebrow, { fontSize: 9 }]}>
            COMPARE THE POSSIBILITIES
          </Text>
          <Text style={[s.sectionTitle, { fontSize: 28, fontWeight: "500" }]}>
            WayFarer Picks
          </Text>
          <Text style={s.muted}>
            Three ways to find your fit. Compared across all available routes.
          </Text>
        </View>
        <View
          style={{
            flexDirection: wide ? "row" : "column",
            flexWrap: "wrap",
            gap: 16,
            alignItems: "stretch",
          }}
        >
          {picks.map((pick) => (
            <View
              key={pick.key}
              style={{
                flex:
                  columns === 3 ? (pick.key === "best" ? 1.25 : 1) : undefined,
                width:
                  columns === 3
                    ? undefined
                    : wide && pick.key !== "best"
                      ? "48%"
                      : "100%",
                flexGrow: 1,
                paddingTop: columns === 3 && pick.key !== "best" ? 20 : 0,
              }}
            >
              <RecommendationCard
                {...pick}
                primary={pick.key === "best"}
                travelers={travelers}
                onPress={() => onSelect(pick.option)}
              />
            </View>
          ))}
        </View>
        <Text style={[s.muted, { fontSize: 11, color: colors.muted }]}>
          Best Value balances fare, journey time and transfers, with a
          preference for direct routes. Picks may overlap.
        </Text>
      </GlassSurface>
    </ImageBackground>
  );
}
