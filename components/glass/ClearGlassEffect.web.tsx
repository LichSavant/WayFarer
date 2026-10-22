import type { ClearGlassEffectProps } from "./ClearGlassEffect";

/** Static optical highlights: no canvas, frame loop, SVG filter, or backdrop capture. */
export function ClearGlassEffect({
  borderRadius,
  backgroundOpacity = 0.08,
  refraction = true,
  frosted = false,
  tone = "dark",
}: ClearGlassEffectProps) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        borderRadius,
        pointerEvents: "none",
        backdropFilter: frosted ? "blur(24px) saturate(115%)" : undefined,
        WebkitBackdropFilter: frosted ? "blur(24px) saturate(115%)" : undefined,
        background: `linear-gradient(135deg, rgba(255,255,255,${Math.min(backgroundOpacity + 0.12, 0.35)}) 0%, rgba(255,255,255,0.015) 48%, rgba(189,239,242,0.07) 100%)`,
        boxShadow: refraction
          ? "inset 0 1px 0 rgba(255,255,255,0.65), inset 0 -1px 0 rgba(255,255,255,0.16)"
          : "inset 0 1px 0 rgba(255,255,255,0.32)",
        colorScheme: tone === "dark" ? "dark" : "light",
      }}
    />
  );
}
