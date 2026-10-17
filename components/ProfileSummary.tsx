import { ImageBackground, Text, View } from "react-native";
import { User } from "../types/user";
import { GlassPanel } from "./glass/GlassPanel";
import { colors, glass, radius } from "./theme";
import { Icon } from "./Icon";
export function ProfileSummary({ user }: { user: User }) {
  return (
    <ImageBackground
      source={require("../assets/destinations/palms.jpg")}
      imageStyle={{ borderRadius: radius.large }}
      style={{
        borderRadius: radius.large,
        backgroundColor: "#54757A",
        minHeight: 350,
        justifyContent: "flex-end",
        padding: 18,
      }}
    >
      <GlassPanel
        blur={false}
        style={{ gap: 18, backgroundColor: glass.darkStrong }}
      >
        <View
          style={{
            width: 64,
            height: 64,
            borderRadius: 32,
            borderWidth: 1,
            borderColor: glass.highlight,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: 24, fontWeight: "500", color: colors.aqua }}>
            {user.initials}
          </Text>
        </View>
        <View style={{ gap: 6 }}>
          <Text
            style={{
              fontSize: 25,
              lineHeight: 32,
              letterSpacing: -0.6,
              fontWeight: "500",
              color: glass.text,
            }}
          >
            {user.name}
          </Text>
          <Text style={{ fontSize: 12, lineHeight: 20, color: glass.dim }}>
            Always up for a new way there.
          </Text>
        </View>
        <View style={{ height: 1, backgroundColor: glass.separator }} />
        <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
          <Icon name="compass-outline" color={colors.aqua} size={16} />
          <Text style={{ fontSize: 9, letterSpacing: 1.2, color: glass.dim }}>
            THE CURIOUS TRAVELER
          </Text>
        </View>
      </GlassPanel>
    </ImageBackground>
  );
}
