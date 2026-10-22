import { Text, View } from "react-native";
import { SearchCard } from "../SearchCard";
import { useResponsive } from "../../hooks/useResponsive";
export function DestinationHero(_props: { destination?: string }) {
  const { wide, desktop, contentWidth } = useResponsive();
  return (
    <View style={{ zIndex: 20 }}>
      <View
        style={{
          minHeight: desktop ? 355 : wide ? 330 : 320,
          paddingBottom: 30,
          paddingTop: desktop ? 49 : 36,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            gap: contentWidth < 380 ? 10 : 17,
            alignItems: "center",
            marginBottom: 18,
          }}
        >
          <Text
            style={{
              fontSize: 8,
              letterSpacing: contentWidth < 380 ? 2 : 4.4,
              color: "#E4DCD3",
              flexShrink: 1,
            }}
          >
            MORE THAN A DESTINATION
          </Text>
          <View
            style={{
              width: contentWidth < 380 ? 28 : 62,
              height: 1,
              backgroundColor: "#9E9286",
            }}
          />
        </View>
        <Text
          style={{
            color: "#FEFCF9",
            fontSize: desktop ? 103 : Math.min(90, contentWidth * 0.23),
            lineHeight: desktop ? 100 : Math.min(94, contentWidth * 0.25),
            fontWeight: "500",
            letterSpacing: desktop ? -6 : -3,
          }}
        >
          Travel
        </Text>
        <Text
          style={{
            color: "#D8C0AA",
            fontSize: desktop ? 108 : Math.min(94, contentWidth * 0.25),
            lineHeight: desktop ? 108 : Math.min(100, contentWidth * 0.27),
            fontWeight: "500",
            letterSpacing: desktop ? -6 : -3,
          }}
        >
          Further
        </Text>
        <Text
          style={{
            color: "#E4DED7",
            fontSize: wide ? 15 : 13,
            lineHeight: 22,
            marginTop: 13,
          }}
        >
          Extraordinary places. Effortless journeys.{"\n"}WayFarer connects you
          to a more open world.
        </Text>
        {desktop && (
          <View style={{ position: "absolute", right: 26, top: 175, gap: 8 }}>
            <Text
              style={{
                color: "#D6C8BA",
                fontSize: 9,
                letterSpacing: 4,
                lineHeight: 20,
              }}
            >
              NEW{"\n"}HORIZONS{"\n"}ALWAYS{"\n"}AHEAD
            </Text>
            <View
              style={{
                width: 30,
                height: 1,
                backgroundColor: "#A69889",
                marginTop: 10,
              }}
            />
          </View>
        )}
      </View>
      <SearchCard ticket />
    </View>
  );
}
