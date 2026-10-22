import React from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GlassButton } from "./glass/GlassButton";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { useResponsive } from "../hooks/useResponsive";
import { colors, radius, layout } from "./theme";
import { Icon } from "./Icon";
import { AmbientBackdrop } from "./AmbientBackdrop";
import { glassStyle } from "./glass/styles";
export { colors } from "./theme";
export { Icon } from "./Icon";
export function Button({
  title,
  onPress,
  secondary = false,
  icon,
}: {
  title: string;
  onPress: () => void;
  secondary?: boolean;
  icon?: React.ComponentProps<typeof Icon>["name"];
}) {
  return (
    <GlassButton
      title={title}
      icon={icon}
      onPress={onPress}
      primary={!secondary}
      tone="light"
    />
  );
}
export function Page({
  children,
  style,
  immersive = false,
}: {
  children: React.ReactNode;
  style?: ViewStyle;
  immersive?: boolean;
}) {
  const { wide, gutter } = useResponsive();
  return (
    <SafeAreaView
      edges={["top", "left", "right"]}
      style={{ flex: 1, backgroundColor: "#302820" }}
    >
      <AmbientBackdrop />
      <ScrollView
        contentContainerStyle={{ width: "100%", minHeight: "100%" }}
        keyboardShouldPersistTaps="handled"
      >
        <SiteHeader />
        <View
          style={[
            s.page,
            { paddingHorizontal: gutter, paddingTop: wide ? 32 : 20 },
            style,
          ]}
        >
          <View
            style={
              immersive
                ? undefined
                : {
                    backgroundColor: "rgba(245,239,231,0.97)",
                    borderRadius: 16,
                    padding: wide ? 28 : 16,
                    gap: 26,
                    borderWidth: 1,
                    borderColor: "rgba(255,255,255,0.35)",
                  }
            }
          >
            {children}
          </View>
          <SiteFooter />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
export function SectionHeader({
  title,
  caption,
}: {
  title: string;
  caption?: string;
}) {
  return (
    <View style={s.section}>
      <Text style={s.sectionTitle}>{title}</Text>
      {caption && <Text style={s.muted}>{caption}</Text>}
    </View>
  );
}
export function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <View style={{ padding: 35, alignItems: "center", gap: 12 }}>
      <Icon name="compass-outline" size={40} color={colors.blue} />
      <Text style={s.sectionTitle}>{title}</Text>
      <Text style={[s.muted, { textAlign: "center" }]}>{body}</Text>
    </View>
  );
}
export const s = StyleSheet.create({
  page: {
    width: "100%",
    maxWidth: 1440,
    alignSelf: "center",
    padding: 24,
    paddingBottom: 40,
    gap: 24,
  },
  title: {
    fontSize: 34,
    fontWeight: "500",
    color: colors.navy,
    letterSpacing: -1.2,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.navy,
    letterSpacing: -0.4,
  },
  body: { fontSize: 15, color: colors.navy, lineHeight: 23 },
  muted: { fontSize: 13, color: colors.muted, lineHeight: 20 },
  eyebrow: {
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1.8,
    color: colors.blue,
  },
  row: { flexDirection: "row", alignItems: "center", gap: 12 },
  between: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  card: {
    ...glassStyle("functional", "light", false),
    borderRadius: radius.medium,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.line,
    gap: 16,
  },
  section: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
  },
  button: {
    backgroundColor: colors.aqua,
    borderRadius: 12,
    padding: 17,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  buttonText: { color: colors.navy, fontSize: 15, fontWeight: "600" },
  secondary: { backgroundColor: colors.pale },
  line: { height: 1, backgroundColor: colors.line },
  price: {
    fontSize: 25,
    fontWeight: "700",
    color: colors.navy,
    letterSpacing: -0.7,
  },
});
