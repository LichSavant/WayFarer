import React from "react";
import { View, ViewProps } from "react-native";
import { GlassLevel, GlassTone, glassStyle } from "./styles";
export interface GlassSurfaceProps extends ViewProps {
  level?: GlassLevel;
  tone?: GlassTone;
  blur?: boolean;
}
export function GlassSurface({
  level = "functional",
  tone = "dark",
  blur = true,
  style,
  ...props
}: GlassSurfaceProps) {
  return <View {...props} style={[glassStyle(level, tone, blur), style]} />;
}
