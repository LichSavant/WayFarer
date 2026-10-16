import { useState } from "react";
import { ImageBackground, Pressable, Text, View } from "react-native";
import { popularRoutes } from "../data/popularRoutes";
import { fare } from "../data/routes";
import { GlassSurface } from "./glass/GlassSurface";
import { glass, radius } from "./theme";
import { Icon } from "./Icon";
export function PopularRouteCard({
  item,
  onPress,
  fluid = false,
}: {
  item: (typeof popularRoutes)[number];
  onPress: () => void;
  fluid?: boolean;
}) {
  const [hover, setHover] = useState(false);
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Explore ${item.origin} to ${item.destination}, from ${fare(item.price)}`}
      onPress={onPress}
      onHoverIn={() => setHover(true)}
      onHoverOut={() => setHover(false)}
      style={({ pressed }) => ({
        width: fluid ? "100%" : 260,
        opacity: pressed ? 0.8 : 1,
      })}
    >
      <ImageBackground
        source={{ uri: item.image }}
        imageStyle={{ borderRadius: radius.medium }}
        style={{
          height: 310,
          justifyContent: "space-between",
          padding: 12,
          backgroundColor: "#759BA5",
          borderRadius: radius.medium,
        }}
      >
        <Text
          style={{
            alignSelf: "flex-start",
            fontSize: 10,
            letterSpacing: 1.1,
            fontWeight: "500",
            color: glass.text,
            padding: 8,
            backgroundColor: glass.darkStrong,
            borderRadius: radius.small,
          }}
        >
          {item.modes.toUpperCase()}
        </Text>
        <GlassSurface
          level="micro"
          blur={false}
          style={{
            padding: 16,
            gap: 8,
            backgroundColor: glass.darkStrong,
            borderColor: hover ? glass.highlight : glass.border,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 8,
            }}
          >
            <Text
              style={{
                fontSize: 12,
                fontWeight: "500",
                letterSpacing: 0.4,
                color: glass.text,
                flex: 1,
              }}
            >
              {item.origin.replace(" City", "")} → {item.destination}
            </Text>
            <Icon name="arrow-forward" size={17} color={glass.text} />
          </View>
          <Text style={{ fontSize: 12, color: glass.muted }}>
            From{" "}
            <Text
              style={{ fontSize: 21, fontWeight: "500", color: glass.text }}
            >
              {fare(item.price)}
            </Text>{" "}
            / traveler
          </Text>
        </GlassSurface>
      </ImageBackground>
      <Text
        style={{
          fontSize: 12,
          lineHeight: 20,
          color: "#687A80",
          paddingTop: 10,
        }}
      >
        {item.subtitle}
      </Text>
    </Pressable>
  );
}
