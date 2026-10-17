import ReactBitsGlassSurface from "../vendor/react-bits/GlassSurface";
import { useGlassBackdrop } from "./HeroBackdrop";
import type { ClearGlassEffectProps } from "./ClearGlassEffect";
/** Real React Bits renderer. Full refraction is reserved for large photographic surfaces. */
export function ClearGlassEffect({
  borderRadius,
  distortionScale,
  displace,
  backgroundOpacity = 0.08,
  refraction = true,
  tone = "dark",
}: ClearGlassEffectProps) {
  const backdrop = useGlassBackdrop();
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        borderRadius,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      <ReactBitsGlassSurface
        width="100%"
        height="100%"
        borderRadius={borderRadius}
        distortionScale={distortionScale}
        displace={displace}
        backgroundOpacity={backgroundOpacity}
        refraction={refraction}
        backdrop={refraction ? backdrop : undefined}
        borderWidth={0.09}
        blur={9}
        opacity={0.98}
        redOffset={0}
        greenOffset={3}
        blueOffset={6}
        saturation={1.12}
        className="wayfarer-liquid"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          colorScheme: tone === "dark" ? "dark" : "light",
        }}
      />
    </div>
  );
}
