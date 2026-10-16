import {
  TravelProvider,
  TravelSearchRequest,
  TravelSearchResult,
} from "../../types/travel";
import { mockProviders } from "./MockTravelProvider";
import { deduplicateOptions } from "./deduplicate";
import { isValidOption, rankOptions } from "../../utils/ranking";
import { toJourneyRoute } from "./adapters";
export async function searchTravelOptions(
  request: TravelSearchRequest,
  providers: TravelProvider[] = mockProviders,
): Promise<TravelSearchResult> {
  const results = await Promise.allSettled(
    providers.map((provider) =>
      Promise.resolve().then(() => provider.search(request)),
    ),
  );
  const warnings: string[] = [];
  const options = results.flatMap((result, i) => {
    if (result.status === "fulfilled") return result.value;
    warnings.push(
      `${providers[i].name} could not be checked. Results may be incomplete.`,
    );
    return [];
  });
  if (results.length > 0 && results.every((r) => r.status === "rejected"))
    throw new Error(
      "We could not check providers. Please try searching again.",
    );
  return {
    options: rankOptions(
      deduplicateOptions(options.filter(isValidOption)),
      "Best",
      request.travelers,
    ).map(toJourneyRoute),
    warnings,
  };
}
