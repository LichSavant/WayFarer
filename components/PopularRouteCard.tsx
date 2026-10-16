import { ImageBackground, Pressable, Text, View } from "react-native";
import { popularRoutes } from "../data/popularRoutes";
import { fare } from "../data/routes";
import { s } from "./ui";
export function PopularRouteCard({
  item,
  onPress,
  fluid = false,
}: {
  item: (typeof popularRoutes)[number];
  onPress: () => void;
  fluid?: boolean;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Explore ${item.origin} to ${item.destination}`}
      onPress={onPress}
      style={({ pressed }) => ({
        width: fluid ? "100%" : 236,
        opacity: pressed ? 0.7 : 1,
        gap: 10,
      })}
    >
      <ImageBackground
        source={{ uri: item.image }}
        imageStyle={{ borderRadius: 10 }}
        style={{
          height: 178,
          justifyContent: "flex-end",
          padding: 14,
          backgroundColor: "#759BA5",
          borderRadius: 10,
        }}
      >
        <View
          style={{
            backgroundColor: "#152C3BB8",
            alignSelf: "flex-start",
            borderRadius: 5,
            paddingHorizontal: 9,
            paddingVertical: 4,
          }}
        >
          <Text style={{ color: "white", fontSize: 11 }}>{item.modes}</Text>
        </View>
      </ImageBackground>
      <Text style={[s.body, { fontWeight: "700" }]}>
        {item.origin.replace(" City", "")} → {item.destination}
      </Text>
      <Text style={s.muted}>{item.subtitle}</Text>
      <Text style={s.muted}>
        From{" "}
        <Text style={{ fontWeight: "700", color: "#152C3B" }}>
          {fare(item.price)}
        </Text>{" "}
        / traveler
      </Text>
    </Pressable>
  );
}
