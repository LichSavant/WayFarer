import { Platform, useWindowDimensions } from "react-native";
export function useResponsive() {
  const { width } = useWindowDimensions();
  const gutter =
    width >= 1200 ? 76 : width >= 768 ? 40 : width >= 480 ? 24 : 16;
  return {
    gutter,
    contentWidth: Math.max(0, Math.min(width, 1440) - gutter * 2),
    width,
    desktop: Platform.OS === "web" && width >= 1024,
    wide: width >= 768,
    columns: width >= 1024 ? 3 : width >= 768 ? 2 : 1,
  };
}
