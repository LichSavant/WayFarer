import { useEffect } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { GlassBackdropProvider, HeroPhoto } from "../glass/HeroBackdrop";
import { useResponsive } from "../../hooks/useResponsive";
import { useHeroCarousel } from "../../hooks/useHeroCarousel";
import { heroSlides, getDestinationSlide } from "../../data/heroSlides";
import { useTravel } from "../../store/TravelContext";
import { SiteHeader } from "../SiteHeader";
import { SearchCard } from "../SearchCard";
import { ClearGlassSurface } from "../glass/ClearGlassSurface";
import { GlassButton } from "../glass/GlassButton";
import { RouteSketch } from "../RouteSketch";
import { glass } from "../theme";
import { Icon } from "../Icon";
export function DestinationHero({ destination }: { destination?: string }) {
  const { wide, desktop } = useResponsive();
  const { height } = useWindowDimensions();
  const { search } = useTravel();
  const carousel = useHeroCarousel();
  const { goTo } = carousel;
  useEffect(() => {
    goTo(getDestinationSlide(destination));
  }, [destination, goTo]);
  const slide = heroSlides[carousel.index];
  const next = heroSlides[(carousel.index + 1) % heroSlides.length];
  return (
    <GlassBackdropProvider>
      <View
        style={{
          minHeight: Math.max(height * 0.98, desktop ? 760 : 0),
          backgroundColor: "#254B55",
          justifyContent: "center",
          paddingVertical: wide ? 48 : 20,
          zIndex: 20,
        }}
      >
        <View
          pointerEvents="none"
          accessible={false}
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
          style={[StyleSheet.absoluteFill, { overflow: "hidden" }]}
        >
          <HeroPhoto source={slide.image} />
          <View
            style={[
              StyleSheet.absoluteFill,
              { backgroundColor: "rgba(2,16,22,0.08)" },
            ]}
          />
          {/* Localized contrast leaves most of the photograph untouched. */}
          <View
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              width: wide ? "43%" : "100%",
              backgroundColor: wide ? "rgba(2,16,22,.30)" : "rgba(2,16,22,.22)",
            }}
          />
        </View>
        <ClearGlassSurface
          width={wide ? "86%" : "94%"}
          borderRadius={wide ? 32 : 22}
          distortionScale={-180}
          displace={0.5}
          backgroundOpacity={0.025}
          style={{
            maxWidth: 1320,
            minHeight: desktop ? Math.max(height * 0.74, 630) : undefined,
            alignSelf: "center",
          }}
        >
          <SiteHeader inverse clear />
          <View
            style={{
              paddingHorizontal: desktop ? 42 : wide ? 30 : 20,
              paddingTop: wide ? 24 : 16,
              paddingBottom: wide ? 24 : 20,
              gap: wide ? 28 : 22,
              flex: 1,
            }}
          >
            <View
              style={{
                flexDirection: wide ? "row" : "column",
                justifyContent: "space-between",
                alignItems: "flex-end",
                flex: 1,
                gap: 24,
              }}
            >
              <View
                style={{
                  gap: 18,
                  alignSelf: "stretch",
                  maxWidth: 430,
                  flex: wide ? 1 : undefined,
                  minWidth: 0,
                }}
              >
                <Text
                  style={{
                    fontSize: 8,
                    fontWeight: "500",
                    letterSpacing: 2,
                    color: glass.muted,
                  }}
                >
                  WAYFARER / THE PHILIPPINES
                </Text>
                <Text
                  style={{
                    fontSize: desktop ? 62 : wide ? 54 : 43,
                    lineHeight: desktop ? 65 : wide ? 58 : 47,
                    fontWeight: "600",
                    letterSpacing: -1.8,
                    color: "white",
                  }}
                >
                  Find your{String.fromCharCode(10)}way there.
                </Text>
                <View
                  style={{ flexDirection: "row", gap: 6, alignItems: "center" }}
                >
                  <Icon name="location-outline" size={13} color="white" />
                  <Text style={{ fontSize: 10, color: "white" }}>
                    Across the islands. Beyond the ordinary.
                  </Text>
                </View>
                <View style={{ flexDirection: "row", gap: 22, marginTop: 8 }}>
                  <Text
                    style={{
                      fontSize: 9,
                      color: "white",
                      paddingBottom: 7,
                      borderBottomWidth: 1,
                      borderColor: "white",
                    }}
                  >
                    Explore destinations
                  </Text>
                  <Text style={{ fontSize: 9, color: glass.muted }}>
                    Compare sea & sky
                  </Text>
                </View>
                {wide && (
                  <RouteSketch
                    origin={search.origin}
                    destination={search.destination}
                  />
                )}
              </View>
              {wide && (
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Preview next destination image"
                  onPress={() => goTo(carousel.index + 1)}
                  style={{ width: desktop ? 250 : 190 }}
                >
                  <ClearGlassSurface
                    borderRadius={14}
                    backgroundOpacity={0.08}
                    distortionScale={-50}
                    refraction={false}
                    style={{
                      flexDirection: "row",
                      gap: 12,
                      padding: 10,
                      alignItems: "center",
                    }}
                  >
                    <View style={{ flex: 1, gap: 6, paddingLeft: 4 }}>
                      <Text
                        style={{
                          fontSize: 8,
                          letterSpacing: 1.5,
                          color: glass.muted,
                        }}
                      >
                        UP NEXT / 0
                        {((carousel.index + 1) % heroSlides.length) + 1}
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          lineHeight: 18,
                          color: "white",
                          fontWeight: "500",
                        }}
                      >
                        {next.title}
                      </Text>
                    </View>
                    <Image
                      source={next.image}
                      resizeMode="cover"
                      style={{ width: 68, height: 72, borderRadius: 10 }}
                    />
                  </ClearGlassSurface>
                </Pressable>
              )}
            </View>
            <SearchCard clear />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 14,
                flexWrap: "wrap",
              }}
            >
              <Text
                style={{ fontSize: 8, letterSpacing: 1.2, color: glass.muted }}
              >
                LESS SEARCHING. MORE GOING.
              </Text>
              <View
                style={{ flexDirection: "row", gap: 12, alignItems: "center" }}
              >
                <Text
                  style={{
                    fontSize: 10,
                    color: "white",
                    fontVariant: ["tabular-nums"],
                  }}
                >
                  0{carousel.index + 1} / 0{heroSlides.length}
                </Text>
                <View style={{ flexDirection: "row", gap: 5 }}>
                  {heroSlides.map((item, i) => (
                    <Pressable
                      key={item.id}
                      accessibilityRole="button"
                      accessibilityLabel={`Show destination image ${i + 1}`}
                      accessibilityState={{ selected: i === carousel.index }}
                      onPress={() => goTo(i)}
                      style={{
                        width: wide ? 40 : 22,
                        height: 44,
                        justifyContent: "center",
                      }}
                    >
                      <View
                        style={{
                          height: 1,
                          backgroundColor:
                            i === carousel.index ? "white" : "#FFFFFF55",
                        }}
                      />
                    </Pressable>
                  ))}
                </View>
                <GlassButton
                  icon="arrow-back"
                  accessibilityLabel="Previous destination image"
                  onPress={() => goTo(carousel.index - 1)}
                  style={{
                    backgroundColor: "transparent",
                    borderRadius: 24,
                    minHeight: 44,
                  }}
                />
                <GlassButton
                  primary
                  icon="arrow-forward"
                  accessibilityLabel="Next destination image"
                  onPress={() => goTo(carousel.index + 1)}
                  style={{
                    backgroundColor: "#F5F8F6",
                    borderRadius: 24,
                    minHeight: 44,
                  }}
                />
              </View>
            </View>
          </View>
        </ClearGlassSurface>
      </View>
    </GlassBackdropProvider>
  );
}
