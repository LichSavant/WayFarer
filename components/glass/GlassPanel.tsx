import { GlassSurface, GlassSurfaceProps } from "./GlassSurface";
export function GlassPanel({ style, ...props }: GlassSurfaceProps) {
  return <GlassSurface {...props} style={[{ padding: 24, gap: 18 }, style]} />;
}
