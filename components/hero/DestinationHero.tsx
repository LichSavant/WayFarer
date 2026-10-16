import { useEffect } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { useResponsive } from "../../hooks/useResponsive";
import { useHeroCarousel } from "../../hooks/useHeroCarousel";
import { heroSlides, getDestinationSlide } from "../../data/heroSlides";
import { SiteHeader } from "../SiteHeader";
import { SearchCard } from "../SearchCard";
import { GlassSurface } from "../glass/GlassSurface";
import { GlassButton } from "../glass/GlassButton";
import { glass, layout, radius } from "../theme";
import { Icon } from "../Icon";
export function DestinationHero({ destination }: { destination?: string }) {
  const { wide, desktop } = useResponsive();
  const { height } = useWindowDimensions();
  const carousel = useHeroCarousel();
  const { goTo } = carousel;
  useEffect(() => {
    goTo(getDestinationSlide(destination));
  }, [destination, goTo]);
  const slide = heroSlides[carousel.index];
  return (
    <View
      style={{
        minHeight: Math.max(height * layout.heroViewport, desktop ? 700 : 0),
        backgroundColor: "#42676E",
        justifyContent: "center",
        paddingVertical: wide ? 48 : 22,
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
        <Animated.Image
          source={slide.image}
          resizeMode="cover"
          style={[
            StyleSheet.absoluteFill,
            { width: "100%", height: "100%", opacity: carousel.fade },
          ]}
        />
        <View
          style={[StyleSheet.absoluteFill, { backgroundColor: glass.overlay }]}
        />
      </View>
      <GlassSurface
        level="structural"
        tone="dark"
        style={{
          width: wide ? "92%" : "94%",
          maxWidth: layout.heroMax,
          minHeight: desktop
            ? Math.max(height * layout.frameViewport, 600)
            : undefined,
          alignSelf: "center",
          borderRadius: wide ? radius.hero : radius.large,
        }}
      >
        <SiteHeader inverse />
        <View
          style={{
            paddingHorizontal: desktop ? layout.heroPadding : wide ? 30 : 20,
            paddingTop: wide ? 30 : 22,
            paddingBottom: wide ? 28 : 22,
            gap: wide ? 32 : 24,
            flex: 1,
          }}
        >
          <View
            style={{
              flexDirection: wide ? "row" : "column",
              alignItems: wide ? "flex-end" : "stretch",
              justifyContent: "space-between",
              gap: 24,
              flex: 1,
              paddingBottom: wide ? 8 : 0,
            }}
          >
            <View style={{ gap: 18, flex: 1 }}>
              <Text
                style={{
                  fontSize: 10,
                  letterSpacing: 2,
                  color: glass.muted,
                  fontWeight: "500",
                }}
              >
                EXPLORE DIFFERENT WAYS THERE
              </Text>
              <Text
                style={{
                  fontSize: desktop ? 80 : wide ? 64 : 47,
                  lineHeight: desktop ? 84 : wide ? 69 : 52,
                  fontWeight: "500",
                  letterSpacing: -2.5,
                  color: glass.text,
                }}
              >
                Find your{String.fromCharCode(10)}way there.
              </Text>
              <Text
                style={{
                  fontSize: wide ? 16 : 14,
                  lineHeight: 25,
                  color: glass.muted,
                  maxWidth: 360,
                }}
              >
                Flights, ferries and everything between.
                {String.fromCharCode(10)}Compared in one place.
              </Text>
            </View>
            {wide && (
              <View style={{ maxWidth: 235, gap: 14, paddingBottom: 4 }}>
                <View
                  style={{
                    height: 1,
                    width: 40,
                    backgroundColor: glass.highlight,
                  }}
                />
                <Text
                  style={{
                    fontSize: 23,
                    lineHeight: 31,
                    fontWeight: "400",
                    color: glass.text,
                    letterSpacing: -0.4,
                  }}
                >
                  {slide.title}
                </Text>
                <Text
                  style={{ fontSize: 11, lineHeight: 19, color: glass.muted }}
                >
                  {slide.caption}
                </Text>
              </View>
            )}
          </View>
          <SearchCard />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 16,
              flexWrap: "wrap",
            }}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <Icon name="compass-outline" size={17} color={glass.muted} />
              <Text
                style={{ fontSize: 9, letterSpacing: 1.4, color: glass.muted }}
              >
                01 / EXPLORE · PHILIPPINES
              </Text>
            </View>
            <View
              style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
            >
              <Text
                style={{
                  fontSize: 10,
                  color: glass.muted,
                  fontVariant: ["tabular-nums"],
                  marginRight: 8,
                }}
              >
                0{carousel.index + 1} / 0{heroSlides.length}
              </Text>
              <GlassButton
                icon="arrow-back"
                accessibilityLabel="Previous destination image"
                onPress={() => goTo(carousel.index - 1)}
              />
              <GlassButton
                icon="arrow-forward"
                accessibilityLabel="Next destination image"
                onPress={() => goTo(carousel.index + 1)}
              />
            </View>
          </View>
        </View>
      </GlassSurface>
    </View>
  );
}
