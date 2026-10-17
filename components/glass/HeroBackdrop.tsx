import React from "react";
import { Image, ImageSourcePropType, StyleSheet } from "react-native";
export function GlassBackdropProvider({ children }: React.PropsWithChildren) {
  return <>{children}</>;
}
export function HeroPhoto({ source }: { source: ImageSourcePropType }) {
  return (
    <Image
      source={source}
      resizeMode="cover"
      style={[StyleSheet.absoluteFill, { width: "100%", height: "100%" }]}
    />
  );
}

export const useGlassBackdrop = ():
  React.RefObject<HTMLImageElement | null> | undefined => undefined;
