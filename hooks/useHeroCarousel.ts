import { useCallback, useEffect, useState } from "react";
import { AccessibilityInfo, Animated, Easing, Platform } from "react-native";
import { heroSlides, HERO_MOTION } from "../data/heroSlides";
export function useHeroCarousel() {
  const [index, setIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(true);
  const [fade] = useState(() => new Animated.Value(1));
  useEffect(() => {
    let mounted = true;
    void AccessibilityInfo.isReduceMotionEnabled()
      .then((value) => {
        if (mounted) setReducedMotion(value);
      })
      .catch(() => {});
    const listener = AccessibilityInfo.addEventListener(
      "reduceMotionChanged",
      setReducedMotion,
    );
    return () => {
      mounted = false;
      listener.remove();
    };
  }, []);
  useEffect(() => {
    fade.setValue(reducedMotion ? 1 : 0);
    const animation = Animated.timing(fade, {
      toValue: 1,
      duration: reducedMotion ? 0 : HERO_MOTION.crossfade,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: Platform.OS !== "web",
    });
    animation.start();
    return () => animation.stop();
  }, [index, reducedMotion, fade]);
  const goTo = useCallback(
    (target: number) =>
      setIndex((target + heroSlides.length) % heroSlides.length),
    [],
  );
  return { index, fade, goTo, reducedMotion };
}
