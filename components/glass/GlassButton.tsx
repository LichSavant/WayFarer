import { useState, ComponentProps } from "react";
import {
  Pressable,
  Text,
  ViewStyle,
  StyleProp,
  AccessibilityState,
  StyleSheet,
} from "react-native";
import { colors, glass, radius } from "../theme";
import { Icon } from "../Icon";
import { ClearGlassEffect } from "./ClearGlassEffect";
import { GlassTone } from "./styles";
export function GlassButton({
  title,
  icon,
  onPress,
  primary = false,
  tone = "dark",
  style,
  accessibilityLabel,
  disabled = false,
  accessibilityState,
}: {
  title?: string;
  icon?: ComponentProps<typeof Icon>["name"];
  onPress: () => void;
  primary?: boolean;
  tone?: GlassTone;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
  disabled?: boolean;
  accessibilityState?: AccessibilityState;
}) {
  const [hover, setHover] = useState(false);
  const suppliedRadius = StyleSheet.flatten(style)?.borderRadius;
  const curve =
    typeof suppliedRadius === "number" ? suppliedRadius : radius.medium;
  const text = primary || tone === "light" ? colors.navy : glass.text;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? title}
      accessibilityState={{ ...accessibilityState, disabled }}
      disabled={disabled}
      onPress={onPress}
      onHoverIn={() => setHover(true)}
      onHoverOut={() => setHover(false)}
      style={({ pressed }) => [
        {
          position: "relative",
          minHeight: 48,
          paddingVertical: 13,
          paddingHorizontal: title ? 20 : 14,
          borderRadius: curve,
          borderWidth: 1,
          borderColor: hover
            ? glass.highlight
            : tone === "light"
              ? glass.borderStrong
              : glass.border,
          flexDirection: "row",
          gap: 10,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: primary
            ? "rgba(189,239,242,0.60)"
            : tone === "light"
              ? "rgba(255,255,255,0.28)"
              : "rgba(255,255,255,0.045)",
          opacity: disabled ? 0.5 : pressed ? 0.75 : 1,
        },
        style,
      ]}
    >
      <ClearGlassEffect
        borderRadius={curve}
        distortionScale={-60}
        displace={0.5}
        backgroundOpacity={hover ? 0.18 : 0.08}
        refraction={false}
        tone={primary ? "light" : tone}
      />
      {title && (
        <Text
          style={{ color: text, fontSize: 14, fontWeight: "600", zIndex: 1 }}
        >
          {title}
        </Text>
      )}
      {icon && <Icon name={icon} size={18} color={text} />}
    </Pressable>
  );
}
