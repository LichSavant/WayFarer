import { Animated, Pressable, StyleSheet, Text, View } from "react-native";
import { useResponsive } from "../hooks/useResponsive";
import { useHeroCarousel } from "../hooks/useHeroCarousel";
import { heroSlides } from "../data/heroSlides";
import { Icon, colors, s } from "./ui";
import { SearchCard } from "./SearchCard";
import { SiteHeader } from "./SiteHeader";
export function CinematicHero() {
  const { wide, desktop } = useResponsive();
  const carousel = useHeroCarousel();
  const slide = heroSlides[carousel.index];
  return (
    <View style={{ backgroundColor: "#102B32", zIndex: 20 }}>
      <View
        pointerEvents="none"
        accessible={false}
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
        style={[StyleSheet.absoluteFill, { overflow: "hidden" }]}
      >
        {heroSlides.map((item, i) => (
          <Animated.Image
            key={item.id}
            source={item.image}
            resizeMode="cover"
            style={[
              StyleSheet.absoluteFill,
              {
                width: "100%",
                height: "100%",
                opacity: carousel.layers[i].opacity,
                transform: [{ scale: carousel.layers[i].scale }],
              },
            ]}
          />
        ))}
        <View
          style={[StyleSheet.absoluteFill, { backgroundColor: "#031B2573" }]}
        />
        <View
          style={[StyleSheet.absoluteFill, { backgroundColor: "#031B251C" }]}
        />
      </View>
      <View
        style={{
          width: "100%",
          maxWidth: 1440,
          alignSelf: "center",
          padding: desktop ? 32 : wide ? 20 : 12,
        }}
      >
        <View
          style={{
            borderWidth: 1,
            borderColor: "#FFFFFF70",
            borderRadius: wide ? 24 : 18,
            paddingBottom: wide ? 26 : 18,
          }}
        >
          <SiteHeader inverse />
          <Animated.View
            style={{
              paddingHorizontal: desktop ? 48 : wide ? 28 : 20,
              paddingTop: wide ? 34 : 22,
              paddingBottom: wide ? 42 : 28,
              gap: wide ? 36 : 26,
              opacity: carousel.entrance,
              transform: [
                {
                  translateY: carousel.entrance.interpolate({
                    inputRange: [0, 1],
                    outputRange: [16, 0],
                  }),
                },
              ],
            }}
          >
            <View
              style={{
                flexDirection: wide ? "row" : "column",
                alignItems: wide ? "flex-end" : "stretch",
                justifyContent: "space-between",
                gap: 32,
                minHeight: desktop ? 300 : undefined,
              }}
            >
              <View style={{ flex: 1, gap: 20 }}>
                <View style={[s.row, { gap: 8 }]}>
                  <View
                    style={{ width: 24, height: 1, backgroundColor: "#D1E8E5" }}
                  />
                  <Text style={[s.eyebrow, { color: "#E0EEEB", fontSize: 9 }]}>
                    THE PHILIPPINES, YOUR WAY
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: desktop ? 80 : wide ? 62 : 46,
                    lineHeight: desktop ? 83 : wide ? 67 : 51,
                    letterSpacing: desktop ? -3 : -1.8,
                    fontWeight: "600",
                    color: "white",
                  }}
                >
                  Find the best{String.fromCharCode(10)}way there.
                </Text>
                <Text
                  style={{
                    color: "#F4F7F5",
                    fontSize: wide ? 16 : 14,
                    lineHeight: 25,
                    maxWidth: 420,
                  }}
                >
                  Across sea and sky. Compare the journeys, find your fit, and
                  make room for a little wonder.
                </Text>
                <View style={[s.row, { gap: 20, marginTop: 8 }]}>
                  {["Ferries", "Flights", "New possibilities"].map(
                    (label, i) => (
                      <View key={label} style={[s.row, { gap: 7 }]}>
                        {i < 2 && (
                          <Icon
                            name={i === 0 ? "boat-outline" : "airplane-outline"}
                            size={16}
                            color="#D3E8E5"
                          />
                        )}
                        <Text style={{ fontSize: 11, color: "#EDF4F2" }}>
                          {label}
                        </Text>
                      </View>
                    ),
                  )}
                </View>
              </View>
              {wide && (
                <Animated.View
                  style={{
                    width: 240,
                    gap: 15,
                    paddingBottom: 8,
                    opacity: carousel.captionReveal,
                    transform: [
                      {
                        translateX: carousel.captionReveal.interpolate({
                          inputRange: [0, 1],
                          outputRange: [14, 0],
                        }),
                      },
                    ],
                  }}
                >
                  <Text style={[s.eyebrow, { color: "#D3E8E5" }]}>
                    A DIFFERENT POINT OF VIEW
                  </Text>
                  <Text
                    style={{
                      fontSize: 29,
                      fontWeight: "500",
                      lineHeight: 36,
                      letterSpacing: -0.8,
                      color: "white",
                    }}
                  >
                    {slide.title}
                  </Text>
                  <Text
                    style={{ color: "#E0EAE7", fontSize: 12, lineHeight: 20 }}
                  >
                    {slide.caption}
                  </Text>
                </Animated.View>
              )}
            </View>
            <SearchCard />
          </Animated.View>
          <View
            style={{
              paddingHorizontal: desktop ? 48 : wide ? 28 : 20,
              flexDirection: wide ? "row" : "column",
              alignItems: wide ? "center" : "stretch",
              justifyContent: "space-between",
              gap: 22,
            }}
          >
            <View style={[s.row, { gap: 10 }]}>
              <Icon name="compass-outline" size={19} color="#E0EEEB" />
              <Text style={{ fontSize: 11, color: "#E0EEEB", flexShrink: 1 }}>
                {wide ? "Less searching. More going." : slide.caption}
              </Text>
            </View>
            <View
              style={[
                s.row,
                {
                  gap: wide ? 14 : 6,
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                },
              ]}
            >
              <Text
                style={{
                  fontSize: 11,
                  color: "white",
                  fontWeight: "600",
                  fontVariant: ["tabular-nums"],
                }}
              >
                0{carousel.index + 1}
                <Text style={{ color: "#FFFFFF99" }}>
                  {" "}
                  / 0{heroSlides.length}
                </Text>
              </Text>
              <View style={[s.row, { gap: 6 }]}>
                {heroSlides.map((item, i) => (
                  <Pressable
                    key={item.id}
                    accessibilityRole="button"
                    accessibilityLabel={`Show background ${i + 1}: ${item.caption}`}
                    accessibilityState={{ selected: i === carousel.index }}
                    onPress={() => carousel.goTo(i)}
                    style={{
                      width: wide ? 50 : 26,
                      minHeight: 44,
                      justifyContent: "center",
                    }}
                  >
                    <View
                      style={{
                        height: 2,
                        backgroundColor:
                          i === carousel.index ? "#FFFFFF99" : "#FFFFFF40",
                        overflow: "hidden",
                      }}
                    >
                      {i === carousel.index && (
                        <Animated.View
                          style={{
                            height: 2,
                            backgroundColor: "white",
                            transform: [
                              {
                                scaleX: carousel.reducedMotion
                                  ? 1
                                  : carousel.progress,
                              },
                            ],
                          }}
                        />
                      )}
                    </View>
                  </Pressable>
                ))}
              </View>
              {!carousel.reducedMotion && (
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={
                    carousel.paused
                      ? "Play background carousel"
                      : "Pause background carousel"
                  }
                  onPress={carousel.togglePause}
                  style={styles.control}
                >
                  <Icon
                    name={carousel.paused ? "play" : "pause"}
                    size={14}
                    color="white"
                  />
                </Pressable>
              )}
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Previous background"
                onPress={() => carousel.goTo(carousel.index - 1)}
                style={styles.control}
              >
                <Icon name="arrow-back" size={18} color="white" />
              </Pressable>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Next background"
                onPress={() => carousel.goTo(carousel.index + 1)}
                style={[
                  styles.control,
                  { backgroundColor: "#F7F8F6", borderColor: "#F7F8F6" },
                ]}
              >
                <Icon name="arrow-forward" size={18} color={colors.navy} />
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  control: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "#FFFFFF60",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#06212B30",
  },
});
