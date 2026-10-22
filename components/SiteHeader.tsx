import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { router, usePathname } from "expo-router";
import { Icon } from "./Icon";
import { useResponsive } from "../hooks/useResponsive";
export function SiteHeader(_props: { inverse?: boolean; clear?: boolean }) {
  const { desktop, wide, gutter } = useResponsive();
  const pathname = usePathname();
  const [menu, setMenu] = useState(false);
  const links = [
    { label: "Destinations", path: "/" },
    { label: "Flights", path: "/results" },
  ] as const;
  return (
    <View
      style={{
        width: "100%",
        maxWidth: 1440,
        alignSelf: "center",
        paddingHorizontal: gutter,
        paddingTop: wide ? 30 : 22,
        paddingBottom: 22,
        zIndex: 40,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: desktop ? 60 : 20,
        }}
      >
        <Pressable
          accessibilityRole="link"
          accessibilityLabel="WayFarer home"
          onPress={() => router.push("/")}
        >
          <Text
            style={{
              fontSize: 31,
              fontWeight: "600",
              color: "#FAF8F4",
              letterSpacing: -1.6,
            }}
          >
            WayFarer
          </Text>
        </Pressable>
        {desktop && (
          <View style={{ flexDirection: "row", gap: 42, flex: 1 }}>
            {links.map((link) => (
              <Pressable
                key={link.path}
                accessibilityRole="link"
                accessibilityState={{ selected: pathname === link.path }}
                onPress={() => router.push(link.path)}
                style={({ pressed }) => ({
                  paddingVertical: 12,
                  opacity: pressed ? 0.6 : 1,
                })}
              >
                <Text style={{ color: "#E8E1DB", fontSize: 12 }}>
                  {link.label}
                </Text>
              </Pressable>
            ))}
          </View>
        )}
        <View
          style={{
            flex: desktop ? undefined : 1,
            flexDirection: "row",
            gap: 30,
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          {wide && (
            <View
              style={{ flexDirection: "row", gap: 9, alignItems: "center" }}
            >
              <Icon name="globe-outline" color="#E8E1DB" size={20} />
              <Text style={{ color: "#E8E1DB", fontSize: 12 }}>EN</Text>
            </View>
          )}
          {!desktop && (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Toggle navigation"
              accessibilityState={{ expanded: menu }}
              onPress={() => setMenu(!menu)}
              style={{ padding: 6 }}
            >
              <Icon name="menu-outline" color="white" size={24} />
            </Pressable>
          )}
        </View>
      </View>
      {menu && !desktop && (
        <View
          style={{
            backgroundColor: "#302923",
            padding: 18,
            borderRadius: 12,
            gap: 18,
            marginTop: 20,
          }}
        >
          {links.map((link) => (
            <Pressable
              key={link.path}
              accessibilityRole="link"
              onPress={() => {
                setMenu(false);
                router.push(link.path);
              }}
            >
              <Text style={{ color: "#F5EFE9" }}>{link.label}</Text>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
}
