import { RANKING } from "../config/ranking";
import { TravelOption } from "../types/travel";
export function totalPrice(option: TravelOption, travelers: number) {
  return option.pricePerTraveler * travelers;
}
export function isValidOption(o: TravelOption) {
  return (
    o.currency === "PHP" &&
    Number.isFinite(o.pricePerTraveler) &&
    o.pricePerTraveler >= 0 &&
    Number.isFinite(o.totalDurationMinutes) &&
    o.totalDurationMinutes > 0 &&
    Number.isInteger(o.transferCount) &&
    o.transferCount >= 0 &&
    o.segments.length > 0 &&
    o.segments.every(
      (segment) =>
        Number.isFinite(Date.parse(segment.departureTime)) &&
        Number.isFinite(Date.parse(segment.arrivalTime)) &&
        Date.parse(segment.arrivalTime) > Date.parse(segment.departureTime) &&
        Number.isFinite(segment.durationMinutes) &&
        segment.durationMinutes > 0,
    )
  );
}
const normalize = (value: number, min: number, max: number) =>
  max === min ? 0 : (value - min) / (max - min);
export function scoreOptions<T extends TravelOption>(
  options: readonly T[],
  travelers = 1,
) {
  const valid = options.filter(isValidOption);
  const prices = valid.map((o) => totalPrice(o, travelers));
  const times = valid.map((o) => o.totalDurationMinutes);
  const maxTransfers = Math.max(1, ...valid.map((o) => o.transferCount));
  const minPrice = Math.min(...prices),
    maxPrice = Math.max(...prices);
  const minTime = Math.min(...times),
    maxTime = Math.max(...times);
  return valid.map((option) => ({
    option,
    score:
      normalize(totalPrice(option, travelers), minPrice, maxPrice) *
        RANKING.priceWeight +
      normalize(option.totalDurationMinutes, minTime, maxTime) *
        RANKING.timeWeight +
      (option.transferCount / maxTransfers) * RANKING.transferWeight -
      (option.transferCount === 0 ? RANKING.directBonus : 0),
  }));
}
export type RouteSort = "Best" | "Cheapest" | "Fastest";
export function rankOptions<T extends TravelOption>(
  options: readonly T[],
  sort: RouteSort = "Best",
  travelers = 1,
): T[] {
  return scoreOptions(options, travelers)
    .sort((a, b) => {
      const primary =
        sort === "Cheapest"
          ? totalPrice(a.option, travelers) - totalPrice(b.option, travelers)
          : sort === "Fastest"
            ? a.option.totalDurationMinutes - b.option.totalDurationMinutes
            : a.score - b.score;
      return (
        primary ||
        totalPrice(a.option, travelers) - totalPrice(b.option, travelers) ||
        a.option.totalDurationMinutes - b.option.totalDurationMinutes ||
        a.option.id.localeCompare(b.option.id)
      );
    })
    .map((r) => r.option);
}
export const getCheapestRoute = <T extends TravelOption>(
  options: readonly T[],
  travelers = 1,
) => rankOptions(options, "Cheapest", travelers)[0];
export const getFastestRoute = <T extends TravelOption>(
  options: readonly T[],
  travelers = 1,
) => rankOptions(options, "Fastest", travelers)[0];
export const getBestValueRoute = <T extends TravelOption>(
  options: readonly T[],
  travelers = 1,
) => rankOptions(options, "Best", travelers)[0];
