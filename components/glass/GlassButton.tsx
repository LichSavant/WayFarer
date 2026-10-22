import { useState, ComponentProps } from "react";
import {
  Pressable,
  Text,
  ViewStyle,
  StyleProp,
  AccessibilityState,
} from "react-native";
import { colors, radius } from "../theme";
import { Icon } from "../Icon";
import { GlassTone } from "./styles";
export function GlassButton({
  title,
  icon,
  onPress,
  primary = false,
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
  const ink = primary ? colors.white : colors.navy;
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
          minHeight: 48,
          paddingVertical: 13,
          paddingHorizontal: title ? 20 : 14,
          borderRadius: radius.small,
          borderWidth: 1,
          borderColor: primary ? colors.navy : colors.line,
          flexDirection: "row",
          gap: 10,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: primary
            ? hover
              ? "#383833"
              : colors.navy
            : hover
              ? colors.pale
              : colors.white,
          opacity: disabled ? 0.45 : pressed ? 0.7 : 1,
        },
        style,
      ]}
    >
      {title && (
        <Text
          style={{
            color: ink,
            fontSize: 12,
            fontWeight: "700",
            letterSpacing: 0.5,
          }}
        >
          {title}
        </Text>
      )}
      {icon && <Icon name={icon} size={17} color={ink} />}
    </Pressable>
  );
}
