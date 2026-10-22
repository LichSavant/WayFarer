import { Pressable, Text, View } from "react-native";
import { router } from "expo-router";
import { useResponsive } from "../hooks/useResponsive";
export function SiteFooter() {
  const { wide } = useResponsive();
  return (
    <View
      style={{
        paddingVertical: 26,
        marginTop: 18,
        flexDirection: wide ? "row" : "column",
        alignItems: wide ? "center" : "flex-start",
        gap: 24,
      }}
    >
      <View
        style={{ flexDirection: "row", alignItems: "center", gap: 24, flex: 1 }}
      >
        <Text
          style={{
            color: "#F6F0E8",
            fontSize: 22,
            letterSpacing: -1,
            fontWeight: "600",
          }}
        >
          WayFarer
        </Text>
        <View style={{ width: 30, height: 1, backgroundColor: "#9C8F82" }} />
        <Text style={{ color: "#D0C4B8", fontSize: 11 }}>Travel Further.</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          gap: 28,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {[
          { label: "Destinations", path: "/" },
          { label: "Flights", path: "/results" },
        ].map((link) => (
          <Pressable
            key={link.label}
            accessibilityRole="link"
            onPress={() => router.push(link.path as "/" | "/results")}
          >
            <Text style={{ color: "#D0C4B8", fontSize: 11 }}>{link.label}</Text>
          </Pressable>
        ))}
        <Text style={{ color: "#B6A99C", fontSize: 10 }}>
          DEMO TRAVEL INVENTORY
        </Text>
      </View>
    </View>
  );
}
