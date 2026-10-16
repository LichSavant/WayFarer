import { TravelOption } from "../types/travel";
import {
  getBestValueRoute,
  getCheapestRoute,
  getFastestRoute,
  totalPrice,
} from "./ranking";
import { fare, duration } from "../data/routes";
export function getRecommendations<T extends TravelOption>(
  options: readonly T[],
  travelers: number,
) {
  const best = getBestValueRoute(options, travelers),
    cheapest = getCheapestRoute(options, travelers),
    fastest = getFastestRoute(options, travelers);
  if (!best || !cheapest || !fastest) return [];
  const saving = totalPrice(best, travelers) - totalPrice(cheapest, travelers);
  const timeSaved = best.totalDurationMinutes - fastest.totalDurationMinutes;
  return [
    {
      key: "best",
      label: "Best Value",
      option: best,
      reason: "Our best balance of total fare, journey time and transfers.",
      note:
        best.transferCount === 0
          ? "Direct journey · balanced choice"
          : "Balanced price and journey time",
    },
    {
      key: "cheapest",
      label: "Cheapest",
      option: cheapest,
      reason: "The lowest total fare across all available options.",
      note:
        saving > 0
          ? `Save ${fare(saving)} vs Best Value`
          : "Best Value is also the lowest fare",
    },
    {
      key: "fastest",
      label: "Fastest",
      option: fastest,
      reason: "The shortest end-to-end journey, including any transfers.",
      note:
        timeSaved > 0
          ? `${duration(timeSaved)} faster than Best Value`
          : "Best Value is also the fastest option",
    },
  ];
}
