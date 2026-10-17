import React from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { GlassPanel } from "./glass/GlassPanel";
import { useResponsive } from "../hooks/useResponsive";
import { glass, radius } from "./theme";
import { Icon } from "./Icon";
const images = {
  islands: require("../assets/destinations/islands.jpg"),
  coast: require("../assets/destinations/coast.jpg"),
  sunset: require("../assets/destinations/palms.jpg"),
};
export function EditorialBanner({
  eyebrow,
  title,
  subtitle,
  image = "islands",
  children,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  image?: keyof typeof images;
  children?: React.ReactNode;
}) {
  const { wide } = useResponsive();
  return (
    <ImageBackground
      source={images[image]}
      imageStyle={{ borderRadius: radius.large }}
      style={{
        backgroundColor: "#45666A",
        borderRadius: radius.large,
        padding: wide ? 30 : 16,
        minHeight: wide ? 290 : 240,
        justifyContent: "flex-end",
      }}
    >
      <View
        pointerEvents="none"
        style={[
          StyleSheet.absoluteFill,
          { borderRadius: radius.large, backgroundColor: glass.overlay },
        ]}
      />
      <GlassPanel
        level="functional"
        style={{
          maxWidth: wide ? 740 : undefined,
          padding: wide ? 28 : 20,
          gap: 15,
          backgroundColor: glass.readableDark,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <View
            style={{ height: 1, width: 28, backgroundColor: glass.highlight }}
          />
          <Text
            style={{
              fontSize: 9,
              letterSpacing: 1.8,
              fontWeight: "500",
              color: glass.muted,
            }}
          >
            {eyebrow}
          </Text>
        </View>
        <Text
          style={{
            fontSize: wide ? 44 : 32,
            lineHeight: wide ? 52 : 40,
            letterSpacing: -1.4,
            fontWeight: "500",
            color: glass.text,
          }}
        >
          {title}
        </Text>
        <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
          <Icon name="compass-outline" size={16} color={glass.muted} />
          <Text
            style={{
              fontSize: 13,
              lineHeight: 21,
              color: glass.muted,
              flex: 1,
            }}
          >
            {subtitle}
          </Text>
        </View>
        {children}
      </GlassPanel>
    </ImageBackground>
  );
}
