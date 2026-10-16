import { TravelOption } from "../../types/travel";
/** Same physical journey across inventory sources; prefer the cheaper offer. */
export function deduplicateOptions(options: TravelOption[]): TravelOption[] {
  const inventory = new Map<string, TravelOption>();
  for (const option of options) {
    const key = option.segments
      .map((s) =>
        [
          s.provider.trim().toLowerCase(),
          s.mode,
          s.origin.id,
          s.destination.id,
          new Date(s.departureTime).toISOString(),
          new Date(s.arrivalTime).toISOString(),
        ].join("|"),
      )
      .join(">");
    const existing = inventory.get(key);
    if (
      !existing ||
      option.pricePerTraveler < existing.pricePerTraveler ||
      (option.pricePerTraveler === existing.pricePerTraveler &&
        option.id < existing.id)
    )
      inventory.set(key, option);
  }
  return [...inventory.values()];
}
