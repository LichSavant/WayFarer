import { useCallback, useEffect, useRef, useState } from "react";
import {
  AccessibilityInfo,
  Animated,
  AppState,
  Easing,
  Platform,
} from "react-native";
import { useFocusEffect } from "expo-router";
import { heroSlides, HERO_MOTION } from "../data/heroSlides";
const useNativeDriver = Platform.OS !== "web";
export function useHeroCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(true);
  const [motionReady, setMotionReady] = useState(false);
  const [focused, setFocused] = useState(false);
  const [foreground, setForeground] = useState(
    AppState.currentState !== "background",
  );
  const current = useRef(0);
  const busy = useRef(false);
  const transition = useRef<Animated.CompositeAnimation | null>(null);
  const [layers] = useState(() =>
    heroSlides.map((_, i) => ({
      opacity: new Animated.Value(i === 0 ? 1 : 0),
      scale: new Animated.Value(1),
    })),
  );
  const [entrance] = useState(() => new Animated.Value(0));
  const [progress] = useState(() => new Animated.Value(0));
  const [captionReveal] = useState(() => new Animated.Value(0));
  const playing = !paused && !reducedMotion && focused && foreground;
  useFocusEffect(
    useCallback(() => {
      setFocused(true);
      return () => setFocused(false);
    }, []),
  );
  useEffect(() => {
    let mounted = true;
    void AccessibilityInfo.isReduceMotionEnabled()
      .then((value) => {
        if (mounted) {
          setReducedMotion(value);
          setMotionReady(true);
        }
      })
      .catch(() => {
        if (mounted) setMotionReady(true);
      });
    const listener = AccessibilityInfo.addEventListener(
      "reduceMotionChanged",
      setReducedMotion,
    );
    const app = AppState.addEventListener("change", (state) =>
      setForeground(state === "active"),
    );
    return () => {
      mounted = false;
      listener.remove();
      app.remove();
    };
  }, []);
  useEffect(() => {
    if (!motionReady) return;
    const animation = Animated.timing(entrance, {
      toValue: 1,
      duration: reducedMotion ? 0 : HERO_MOTION.entrance,
      easing: Easing.out(Easing.cubic),
      useNativeDriver,
    });
    animation.start();
    return () => animation.stop();
  }, [entrance, reducedMotion, motionReady]);
  useEffect(() => {
    captionReveal.setValue(0);
    const animation = Animated.timing(captionReveal, {
      toValue: 1,
      duration: reducedMotion ? 0 : 700,
      easing: Easing.out(Easing.cubic),
      useNativeDriver,
    });
    animation.start();
    return () => animation.stop();
  }, [index, reducedMotion, captionReveal]);
  const goTo = useCallback(
    (target: number) => {
      const next = (target + heroSlides.length) % heroSlides.length;
      const previous = current.current;
      if (busy.current || next === previous) return;
      busy.current = true;
      current.current = next;
      layers[next].scale.setValue(1);
      progress.setValue(0);
      setIndex(next);
      transition.current = Animated.parallel(
        layers.map((layer, i) =>
          Animated.timing(layer.opacity, {
            toValue: i === next ? 1 : 0,
            duration: reducedMotion ? 0 : HERO_MOTION.crossfade,
            easing: Easing.inOut(Easing.cubic),
            useNativeDriver,
          }),
        ),
      );
      transition.current.start(() => {
        busy.current = false;
      });
    },
    [layers, reducedMotion, progress],
  );
  useEffect(() => {
    if (!playing) {
      progress.stopAnimation();
      return;
    }
    progress.setValue(0);
    const zoom = Animated.timing(layers[index].scale, {
      toValue: HERO_MOTION.zoom,
      duration: HERO_MOTION.interval + HERO_MOTION.crossfade,
      easing: Easing.linear,
      useNativeDriver,
    });
    const elapsed = Animated.timing(progress, {
      toValue: 1,
      duration: HERO_MOTION.interval,
      easing: Easing.linear,
      useNativeDriver,
    });
    zoom.start();
    elapsed.start();
    const timer = setTimeout(() => goTo(index + 1), HERO_MOTION.interval);
    return () => {
      clearTimeout(timer);
      zoom.stop();
      elapsed.stop();
    };
  }, [index, playing, goTo, layers, progress]);
  useEffect(
    () => () => {
      transition.current?.stop();
      layers.forEach((layer) => {
        layer.opacity.stopAnimation();
        layer.scale.stopAnimation();
      });
    },
    [layers],
  );
  return {
    index,
    layers,
    entrance,
    captionReveal,
    progress,
    paused,
    reducedMotion,
    goTo,
    togglePause: () => setPaused((value) => !value),
  };
}
