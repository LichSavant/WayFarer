import { ImageBackground, Pressable, Text, View } from "react-native";
import { popularRoutes } from "../data/popularRoutes";
import { fare } from "../data/routes";
import { s } from "./ui";
export function PopularRouteCard({
  item,
  onPress,
}: {
  item: (typeof popularRoutes)[number];
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => ({
        width: 236,
        opacity: pressed ? 0.7 : 1,
        gap: 10,
      })}
    >
      <ImageBackground
        source={{ uri: item.image }}
        imageStyle={{ borderRadius: 14 }}
        style={{
          height: 165,
          justifyContent: "flex-end",
          padding: 15,
          backgroundColor: "#759BA5",
          borderRadius: 14,
        }}
      >
        <View
          style={{
            backgroundColor: "#152C3BB8",
            alignSelf: "flex-start",
            borderRadius: 6,
            paddingHorizontal: 9,
            paddingVertical: 4,
          }}
        >
          <Text style={{ color: "white", fontSize: 11 }}>{item.modes}</Text>
        </View>
      </ImageBackground>
      <View style={s.between}>
        <Text style={[s.body, { fontWeight: "700" }]}>
          {item.origin.replace(" City", "")} → {item.destination}
        </Text>
      </View>
      <Text style={s.muted}>
        {item.subtitle} · from{" "}
        <Text style={{ fontWeight: "700" }}>{fare(item.price)}</Text>
      </Text>
    </Pressable>
  );
}
