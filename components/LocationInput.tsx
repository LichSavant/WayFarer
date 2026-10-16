import { useEffect, useRef, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { Location } from "../types/location";
import { suggestLocations } from "../data/locations";
import { colors, Icon, s } from "./ui";
import { glass, radius } from "./theme";
import { GlassSurface } from "./glass/GlassSurface";
export function LocationInput({
  label,
  value,
  onChange,
  inverse = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  inverse?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );
  const suggestions = suggestLocations(value);
  useEffect(() => () => clearTimeout(closeTimer.current), []);
  const choose = (location: Location) => {
    clearTimeout(closeTimer.current);
    onChange(location.name);
    setOpen(false);
  };
  return (
    <View style={{ flex: 1, minWidth: 0, zIndex: open ? 10 : 1, gap: 5 }}>
      <Text
        style={[
          s.eyebrow,
          { fontSize: 9, color: inverse ? glass.muted : colors.blue },
        ]}
      >
        {label.toUpperCase()}
      </Text>
      <TextInput
        accessibilityRole="combobox"
        accessibilityState={{ expanded: open }}
        accessibilityLabel={label === "From" ? "Origin" : "Destination"}
        accessibilityHint="Type to find a city, island, airport or seaport. Use arrow keys and Enter to select."
        value={value}
        selectTextOnFocus
        onFocus={() => {
          clearTimeout(closeTimer.current);
          setOpen(true);
        }}
        onBlur={() => {
          closeTimer.current = setTimeout(() => setOpen(false), 180);
        }}
        onChangeText={(text) => {
          onChange(text);
          setOpen(true);
          setActive(0);
        }}
        onKeyPress={(event) => {
          if (event.nativeEvent.key === "Escape") setOpen(false);
          if (event.nativeEvent.key === "ArrowDown")
            setActive((i) =>
              Math.max(0, Math.min(i + 1, suggestions.length - 1)),
            );
          if (event.nativeEvent.key === "ArrowUp")
            setActive((i) => Math.max(0, i - 1));
          if (event.nativeEvent.key === "Enter" && open && suggestions[active])
            choose(suggestions[active]);
        }}
        style={{
          fontSize: 18,
          fontWeight: "500",
          color: inverse ? glass.text : colors.navy,
          paddingVertical: 8,
          width: "100%",
        }}
      />
      {open && (
        <GlassSurface
          tone="dark"
          level="functional"
          style={{
            position: "absolute",
            top: 65,
            left: -12,
            right: -12,
            minWidth: 230,
            backgroundColor: glass.darkStrong,
            padding: 6,
            zIndex: 20,
          }}
        >
          {suggestions.length ? (
            suggestions.map((location, i) => (
              <Pressable
                key={location.id}
                accessibilityRole="button"
                accessibilityLabel={`Select ${location.name}`}
                accessibilityState={{ selected: i === active }}
                onPress={() => choose(location)}
                style={({ pressed }) => ({
                  padding: 10,
                  borderRadius: radius.small,
                  backgroundColor:
                    pressed || i === active ? glass.hover : "transparent",
                  flexDirection: "row",
                  gap: 10,
                  alignItems: "center",
                })}
              >
                <Icon
                  name={
                    location.type === "airport"
                      ? "airplane-outline"
                      : location.type === "seaport"
                        ? "boat-outline"
                        : "location-outline"
                  }
                  color={colors.aqua}
                  size={18}
                />
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontSize: 13,
                      lineHeight: 19,
                      fontWeight: "500",
                      color: glass.text,
                    }}
                  >
                    {location.name}
                  </Text>
                  <Text
                    style={{ fontSize: 11, lineHeight: 18, color: glass.dim }}
                  >
                    {location.type} · {location.country}
                    {location.code ? ` · ${location.code}` : ""}
                  </Text>
                </View>
              </Pressable>
            ))
          ) : (
            <Text style={{ fontSize: 13, color: glass.muted, padding: 12 }}>
              No matching locations. Try Cebu or Bohol.
            </Text>
          )}
        </GlassSurface>
      )}
    </View>
  );
}
