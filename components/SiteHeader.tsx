import { Pressable, Text, View } from "react-native";
import { router, usePathname } from "expo-router";
import { colors, glass, layout, radius } from "./theme";
import { Icon } from "./Icon";
const s = {
  row: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    gap: 12,
  },
};
import { useResponsive } from "../hooks/useResponsive";
export function SiteHeader({ inverse = false }: { inverse?: boolean }) {
  const { desktop } = useResponsive();
  const pathname = usePathname();
  return (
    <View
      style={{
        borderBottomWidth: 1,
        borderColor: inverse ? glass.separator : colors.line,
        backgroundColor: inverse ? "transparent" : colors.bg,
      }}
    >
      <View
        style={{
          width: "100%",
          maxWidth: inverse ? layout.heroMax : layout.contentMax,
          alignSelf: "center",
          paddingHorizontal: inverse && desktop ? layout.heroPadding : 24,
          paddingVertical: desktop ? 24 : 16,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Pressable
          accessibilityRole="link"
          accessibilityLabel="WayFarer home"
          onPress={() => router.push("/")}
          style={s.row}
        >
          <View
            style={{
              width: 32,
              height: 32,
              borderRadius: radius.small,
              backgroundColor: inverse ? glass.hover : colors.navy,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon name="navigate" color="white" size={18} />
          </View>
          <Text
            style={{
              fontSize: 23,
              fontWeight: "700",
              letterSpacing: -1,
              color: inverse ? "white" : colors.navy,
            }}
          >
            WayFarer
            <Text style={{ color: inverse ? colors.aqua : colors.blue }}>
              .
            </Text>
          </Text>
        </Pressable>
        <View style={[s.row, { gap: 34 }]}>
          {desktop &&
            (["Explore", "Saved", "Trips"] as const).map((label, i) => {
              const path = (["/", "/saved", "/trips"] as const)[i];
              const active = pathname === path;
              return (
                <Pressable
                  key={label}
                  accessibilityRole="link"
                  accessibilityState={{ selected: active }}
                  onPress={() => router.push(path)}
                  style={({ pressed }) => ({
                    paddingVertical: 8,
                    borderBottomWidth: 2,
                    borderColor: active
                      ? inverse
                        ? "white"
                        : colors.blue
                      : "transparent",
                    opacity: pressed ? 0.6 : 1,
                  })}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: active ? "700" : "500",
                      color: inverse
                        ? active
                          ? "white"
                          : glass.muted
                        : active
                          ? colors.blue
                          : colors.navy,
                    }}
                  >
                    {label}
                  </Text>
                </Pressable>
              );
            })}
          <Pressable
            accessibilityRole="link"
            accessibilityLabel="Open profile"
            onPress={() => router.push("/profile")}
            style={{
              width: 36,
              height: 36,
              borderRadius: 18,
              backgroundColor: "#E4E9E5",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{ fontSize: 12, fontWeight: "600", color: colors.navy }}
            >
              AT
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
