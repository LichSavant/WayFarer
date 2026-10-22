import React, { createContext, useContext, useRef } from "react";
import { Asset } from "expo-asset";
import type { ImageSourcePropType } from "react-native";
const Context = createContext<
  React.RefObject<HTMLImageElement | null> | undefined
>(undefined);
export const useGlassBackdrop = () => useContext(Context);
export function GlassBackdropProvider({ children }: React.PropsWithChildren) {
  const image = useRef<HTMLImageElement | null>(null);
  return <Context.Provider value={image}>{children}</Context.Provider>;
}
export function HeroPhoto({ source }: { source: ImageSourcePropType }) {
  const image = useGlassBackdrop();
  const first = Array.isArray(source) ? source[0] : source;
  const uri =
    typeof first === "number" ? Asset.fromModule(first).uri : first.uri;
  return (
    <img
      ref={image}
      src={uri}
      alt=""
      aria-hidden="true"
      draggable={false}
      decoding="async"
      fetchPriority="high"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        objectPosition: "center",
      }}
    />
  );
}
