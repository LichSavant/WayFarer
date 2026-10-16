import { ImageSourcePropType } from "react-native";
export interface HeroSlide {
  id: string;
  image: ImageSourcePropType;
  title: string;
  caption: string;
}
/** Editorial imagery, deliberately separate from bookable mock inventory. */
export const heroSlides: HeroSlide[] = [
  {
    id: "islands",
    image: require("../assets/destinations/islands.jpg"),
    title: "A little further. A little freer.",
    caption: "Hidden coves. Open possibilities.",
  },
  {
    id: "coast",
    image: require("../assets/destinations/coast.jpg"),
    title: "Take the scenic way there.",
    caption: "For the journeys that feel like the destination.",
  },
  {
    id: "sunset",
    image: require("../assets/destinations/palms.jpg"),
    title: "Chase the light. Keep the memories.",
    caption: "Slow evenings. Something to look forward to.",
  },
];
export const HERO_MOTION = { crossfade: 550 } as const;
// Add verified destination-to-image mappings here when dedicated images are available.
// Generic imagery is not presented as photography of the selected destination.
export const destinationImagery: Readonly<Record<string, number>> = {};
export const getDestinationSlide = (destination?: string) =>
  destination ? (destinationImagery[destination.trim().toLowerCase()] ?? 0) : 0;
