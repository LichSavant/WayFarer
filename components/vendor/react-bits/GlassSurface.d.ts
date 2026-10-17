import { ComponentType, CSSProperties, ReactNode, RefObject } from "react";
export interface ReactBitsGlassProps {
  children?: ReactNode;
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
  borderWidth?: number;
  brightness?: number;
  opacity?: number;
  blur?: number;
  displace?: number;
  backgroundOpacity?: number;
  saturation?: number;
  distortionScale?: number;
  redOffset?: number;
  greenOffset?: number;
  blueOffset?: number;
  xChannel?: "R" | "G" | "B";
  yChannel?: "R" | "G" | "B";
  mixBlendMode?: CSSProperties["mixBlendMode"];
  refraction?: boolean;
  renderer?: "auto" | "svg" | "webgl";
  backdrop?: RefObject<
    HTMLImageElement | HTMLVideoElement | HTMLCanvasElement | null
  >;
  shape?: string;
  className?: string;
  style?: CSSProperties;
}
/** User-supplied React Bits JavaScript source, isolated behind a typed web boundary. */
declare const GlassSurface: ComponentType<ReactBitsGlassProps>;
export default GlassSurface;
