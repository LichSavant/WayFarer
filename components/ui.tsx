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
import { SiteHeader } from "./SiteHeader";
import { useResponsive } from "../hooks/useResponsive";
import { colors } from "./theme";
import { Icon } from "./Icon";
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
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        s.button,
        secondary && s.secondary,
        pressed && { opacity: 0.7 },
      ]}
    >
      <Text style={[s.buttonText, secondary && { color: colors.navy }]}>
        {title}
      </Text>
      {icon && (
        <Icon name={icon} color={secondary ? colors.navy : "white"} size={19} />
      )}
    </Pressable>
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
  const { wide } = useResponsive();
  return (
    <SafeAreaView
      edges={["top", "left", "right"]}
      style={{ flex: 1, backgroundColor: colors.bg }}
    >
      {!immersive && <SiteHeader />}
      <ScrollView
        contentContainerStyle={[
          immersive ? { width: "100%" } : s.page,
          !immersive && { padding: wide ? 32 : 20 },
          style,
        ]}
        keyboardShouldPersistTaps="handled"
      >
        {children}
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
    maxWidth: 1200,
    alignSelf: "center",
    padding: 24,
    paddingBottom: 40,
    gap: 24,
  },
  title: {
    fontSize: 34,
    fontWeight: "700",
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
    backgroundColor: "white",
    borderRadius: 12,
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
    backgroundColor: colors.navy,
    borderRadius: 12,
    padding: 17,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  buttonText: { color: "white", fontSize: 15, fontWeight: "600" },
  secondary: { backgroundColor: colors.pale },
  line: { height: 1, backgroundColor: colors.line },
  price: {
    fontSize: 25,
    fontWeight: "700",
    color: colors.navy,
    letterSpacing: -0.7,
  },
});
