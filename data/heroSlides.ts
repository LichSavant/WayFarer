import { ImageSourcePropType } from "react-native";
export interface HeroSlide {
  id: string;
  image: ImageSourcePropType;
  title: string;
  caption: string;
}
export const heroSlides: HeroSlide[] = [
  {
    id: "islands",
    image: require("../assets/destinations/islands.jpg"),
    title: "A little further.\nA little freer.",
    caption: "Hidden coves. Open possibilities.",
  },
  {
    id: "coast",
    image: require("../assets/destinations/coast.jpg"),
    title: "Take the scenic\nway there.",
    caption: "For the journeys that feel like the destination.",
  },
  {
    id: "sunset",
    image: require("../assets/destinations/palms.jpg"),
    title: "Chase the light.\nKeep the memories.",
    caption: "Slow evenings. Something to look forward to.",
  },
];
export const HERO_MOTION = {
  interval: 8000,
  crossfade: 1200,
  zoom: 1.075,
  entrance: 800,
} as const;
