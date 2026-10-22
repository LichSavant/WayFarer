import { ViewStyle } from "react-native";
import { colors, radius } from "../theme";
export type GlassLevel = "structural" | "functional" | "micro";
export type GlassTone = "dark" | "light";
/** Shared paper surface for ticket cards, dialogs, and controls. */
export function glassStyle(
  level: GlassLevel,
  _tone: GlassTone,
  _blur = false,
): ViewStyle {
  return {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius:
      level === "structural"
        ? radius.large
        : level === "functional"
          ? radius.medium
          : radius.small,
    boxShadow: "0 6px 24px rgba(54,37,22,0.04)",
  };
}
