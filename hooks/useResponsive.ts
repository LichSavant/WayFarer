import { Platform, useWindowDimensions } from "react-native";
export function useResponsive() {
  const { width } = useWindowDimensions();
  return {
    width,
    desktop: Platform.OS === "web" && width >= 1024,
    wide: width >= 768,
    columns: width >= 1024 ? 3 : width >= 768 ? 2 : 1,
  };
}
