import { GlassButton } from "./glass/GlassButton";
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
    <GlassButton
      title={label}
      primary={selected}
      tone="light"
      accessibilityState={{ selected }}
      onPress={onPress}
      style={{
        minHeight: 44,
        paddingHorizontal: 17,
        paddingVertical: 10,
        ...(selected
          ? {
              borderColor: "#191919",
              backgroundColor: "#191919",
            }
          : {}),
      }}
    />
  );
}
