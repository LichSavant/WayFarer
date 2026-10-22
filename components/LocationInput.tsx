import { useEffect, useRef, useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { useResponsive } from "../hooks/useResponsive";
import { Location } from "../types/location";
import { suggestLocations } from "../data/locations";
import { colors, Icon, s } from "./ui";
import { glass, radius } from "./theme";
import { airportCode } from "./ticket";
import { GlassSurface } from "./glass/GlassSurface";
export function LocationInput({
  label,
  value,
  onChange,
  inverse = false,
  ticket = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  inverse?: boolean;
  ticket?: boolean;
}) {
  const { contentWidth } = useResponsive();
  const [fieldWidth, setFieldWidth] = useState(110);
  const codeSize = Math.max(26, Math.min(48, fieldWidth / 2.25));
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
    <View
      onLayout={(event) => setFieldWidth(event.nativeEvent.layout.width)}
      style={{ flex: 1, minWidth: 0, zIndex: open ? 10 : 1, gap: 5 }}
    >
      <Text
        style={[
          s.eyebrow,
          { fontSize: 9, color: inverse ? glass.muted : colors.blue },
        ]}
      >
        {ticket ? label : label.toUpperCase()}
      </Text>
      <TextInput
        accessibilityRole="combobox"
        accessibilityState={{ expanded: open }}
        accessibilityLabel={label === "From" ? "Origin" : "Destination"}
        accessibilityHint="Type to find a city, island, airport or seaport. Use arrow keys and Enter to select."
        value={ticket && !open ? airportCode(value) : value}
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
          fontSize: ticket && !open ? codeSize : 18,
          fontWeight: ticket ? "700" : "500",
          letterSpacing: ticket && !open ? -2 : 0,
          color: inverse ? glass.text : colors.navy,
          paddingVertical: ticket ? 0 : 8,
          height: ticket ? 58 : undefined,
          minWidth: 0,
          width: "100%",
        }}
      />
      {ticket && (
        <Text
          numberOfLines={1}
          style={{ fontSize: 9, letterSpacing: 2, color: "#65594D" }}
        >
          {value.replace(" City", "").toUpperCase()}
        </Text>
      )}
      {open && (
        <GlassSurface
          tone="dark"
          level="functional"
          style={{
            position: "absolute",
            top: ticket ? 98 : 65,
            left: label === "To" ? undefined : -8,
            right: label === "To" ? -8 : undefined,
            width: Math.min(280, Math.max(180, contentWidth - 44)),
            maxWidth: contentWidth - 28,
            backgroundColor: glass.darkStrong,
            padding: 6,
            zIndex: 20,
          }}
        >
          <ScrollView
            keyboardShouldPersistTaps="handled"
            nestedScrollEnabled
            style={{ maxHeight: 260 }}
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
          </ScrollView>
        </GlassSurface>
      )}
    </View>
  );
}
