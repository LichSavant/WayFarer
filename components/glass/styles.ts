import { Platform, ViewStyle } from "react-native";
import { glass, radius, shadow } from "../theme";
export type GlassLevel = "structural" | "functional" | "micro";
export type GlassTone = "dark" | "light";
/** The only web-specific style boundary; native receives a readable tint fallback. */
type WebGlassStyle = ViewStyle & {
  backdropFilter?: string;
  WebkitBackdropFilter?: string;
};
export function glassStyle(
  level: GlassLevel,
  tone: GlassTone,
  blur = true,
): WebGlassStyle {
  const dark = tone === "dark";
  const amount = glass.blur[level];
  const web: WebGlassStyle = {
    backgroundColor: dark ? glass.dark : glass.light,
    ...(blur && amount > 0
      ? {
          backdropFilter: `blur(${amount}px)`,
          WebkitBackdropFilter: `blur(${amount}px)`,
        }
      : {}),
    ...(level === "structural" ? { boxShadow: shadow.elevated } : {}),
  };
  return {
    borderWidth: 1,
    borderColor: dark ? glass.border : glass.borderStrong,
    borderRadius:
      level === "structural"
        ? radius.hero
        : level === "functional"
          ? radius.medium
          : radius.small,
    ...Platform.select({
      web,
      default: {
        backgroundColor: dark ? glass.native.dark : glass.native.light,
      },
    }),
  };
}
