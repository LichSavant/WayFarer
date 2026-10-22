import { View, ViewProps, DimensionValue } from "react-native";
import { ClearGlassEffect } from "./ClearGlassEffect";
export interface ClearGlassProps extends ViewProps {
  width?: DimensionValue;
  height?: DimensionValue;
  borderRadius?: number;
  distortionScale?: number;
  displace?: number;
  backgroundOpacity?: number;
  refraction?: boolean;
  frosted?: boolean;
}
/** Clear center, thin specular edges; refraction is a progressive web enhancement. */
export function ClearGlassSurface({
  children,
  style,
  width,
  height,
  borderRadius = 32,
  distortionScale = -180,
  displace = 0.5,
  backgroundOpacity = 0.035,
  refraction = true,
  frosted = false,
  ...props
}: ClearGlassProps) {
  return (
    <View
      {...props}
      style={[
        {
          width,
          height,
          borderRadius,
          borderWidth: 1,
          borderColor: "rgba(255,255,255,0.70)",
          backgroundColor: `rgba(255,255,255,${backgroundOpacity})`,
        },
        style,
      ]}
    >
      <ClearGlassEffect
        borderRadius={borderRadius}
        distortionScale={distortionScale}
        displace={displace}
        backgroundOpacity={backgroundOpacity}
        refraction={refraction}
        frosted={frosted}
      />
      {children}
    </View>
  );
}
export default ClearGlassSurface;
