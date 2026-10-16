import { useState } from "react";
import { Pressable, Text, ViewStyle, StyleProp } from "react-native";
import { colors, glass, radius } from "../theme";
import { Icon } from "../Icon";
import { glassStyle, GlassTone } from "./styles";
import { ComponentProps } from "react";
export function GlassButton({
  title,
  icon,
  onPress,
  primary = false,
  tone = "dark",
  style,
  accessibilityLabel,
  disabled = false,
}: {
  title?: string;
  icon?: ComponentProps<typeof Icon>["name"];
  onPress: () => void;
  primary?: boolean;
  tone?: GlassTone;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
  disabled?: boolean;
}) {
  const [hover, setHover] = useState(false);
  const text = primary || tone === "light" ? colors.navy : glass.text;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? title}
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      onHoverIn={() => setHover(true)}
      onHoverOut={() => setHover(false)}
      style={({ pressed }) => [
        glassStyle("micro", tone, false),
        {
          minHeight: 48,
          paddingVertical: 13,
          paddingHorizontal: title ? 20 : 14,
          borderRadius: radius.small,
          flexDirection: "row",
          gap: 10,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: primary
            ? colors.aqua
            : hover
              ? glass.hover
              : tone === "dark"
                ? glass.dark
                : glass.light,
          borderColor: hover ? glass.highlight : glass.border,
          opacity: disabled ? 0.5 : pressed ? 0.75 : 1,
        },
        style,
      ]}
    >
      {title && (
        <Text style={{ color: text, fontSize: 14, fontWeight: "600" }}>
          {title}
        </Text>
      )}
      {icon && <Icon name={icon} size={18} color={text} />}
    </Pressable>
  );
}
