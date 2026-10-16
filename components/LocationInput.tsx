import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { Location } from "../types/location";
import { suggestLocations } from "../data/locations";
import { colors, Icon, s } from "./ui";
export function LocationInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const suggestions = suggestLocations(value);
  const choose = (location: Location) => {
    onChange(location.name);
    setOpen(false);
  };
  return (
    <View style={{ flex: 1, minWidth: 0, zIndex: open ? 10 : 1, gap: 5 }}>
      <Text style={s.eyebrow}>{label.toUpperCase()}</Text>
      <TextInput
        accessibilityLabel={label === "From" ? "Origin" : "Destination"}
        accessibilityHint="Type to find a city, island, airport or seaport"
        value={value}
        selectTextOnFocus
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 180)}
        onChangeText={(text) => {
          onChange(text);
          setOpen(true);
          setActive(0);
        }}
        onKeyPress={(event) => {
          if (event.nativeEvent.key === "Escape") setOpen(false);
          if (event.nativeEvent.key === "ArrowDown")
            setActive((i) => Math.min(i + 1, suggestions.length - 1));
          if (event.nativeEvent.key === "ArrowUp")
            setActive((i) => Math.max(0, i - 1));
          if (event.nativeEvent.key === "Enter" && open && suggestions[active])
            choose(suggestions[active]);
        }}
        style={{
          fontSize: 18,
          fontWeight: "600",
          color: colors.navy,
          paddingVertical: 8,
          width: "100%",
        }}
      />
      {open && (
        <View
          style={{
            position: "absolute",
            top: 69,
            left: -12,
            right: -12,
            minWidth: 230,
            backgroundColor: "white",
            borderWidth: 1,
            borderColor: colors.line,
            borderRadius: 10,
            padding: 6,
            zIndex: 20,
            boxShadow: "0 8px 24px #152C3B12",
          }}
        >
          {suggestions.length ? (
            suggestions.map((location, i) => (
              <Pressable
                key={location.id}
                accessibilityRole="button"
                accessibilityLabel={`Select ${location.name}`}
                onPress={() => choose(location)}
                style={({ pressed }) => ({
                  padding: 10,
                  borderRadius: 6,
                  backgroundColor:
                    pressed || i === active ? colors.pale : "white",
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
                  color={colors.blue}
                  size={18}
                />
                <View style={{ flex: 1 }}>
                  <Text
                    style={[
                      s.body,
                      { fontSize: 13, lineHeight: 18, fontWeight: "600" },
                    ]}
                  >
                    {location.name}
                  </Text>
                  <Text style={[s.muted, { fontSize: 11 }]}>
                    {location.type} · {location.country}
                    {location.code ? ` · ${location.code}` : ""}
                  </Text>
                </View>
              </Pressable>
            ))
          ) : (
            <Text style={[s.muted, { padding: 12 }]}>
              No matching locations. Try Cebu or Bohol.
            </Text>
          )}
        </View>
      )}
    </View>
  );
}
