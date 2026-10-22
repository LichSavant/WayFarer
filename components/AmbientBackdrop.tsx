import { Image, StyleSheet, View } from "react-native";
import { useResponsive } from "../hooks/useResponsive";
export function AmbientBackdrop() {
  const { wide } = useResponsive();
  return (
    <View
      pointerEvents="none"
      accessible={false}
      style={StyleSheet.absoluteFill}
    >
      <Image
        source={require("../assets/destinations/cabin-window.png")}
        resizeMode="cover"
        style={{ width: "100%", height: "100%", position: "absolute" }}
      />
      <View
        style={[
          StyleSheet.absoluteFill,
          {
            backgroundColor: wide
              ? "rgba(24,19,15,0.16)"
              : "rgba(24,19,15,0.48)",
          },
        ]}
      />
    </View>
  );
}
