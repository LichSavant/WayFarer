import { Pressable, Text } from "react-native";
import { colors } from "./ui";
export function FilterChip({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      onPress={onPress}
      style={({ pressed }) => ({
        paddingHorizontal: 17,
        paddingVertical: 11,
        borderRadius: 24,
        backgroundColor: selected ? colors.navy : "white",
        borderWidth: 1,
        borderColor: selected ? colors.navy : colors.line,
        opacity: pressed ? 0.65 : 1,
      })}
    >
      <Text
        style={{
          color: selected ? "white" : colors.navy,
          fontSize: 13,
          fontWeight: "600",
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
}
