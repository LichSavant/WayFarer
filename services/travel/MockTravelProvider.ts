import { routes } from "../../data/routes";
import {
  TravelProvider,
  TravelSearchRequest,
  TravelOption,
} from "../../types/travel";
import { fromLegacyRoute } from "./adapters";
export class MockTravelProvider implements TravelProvider {
  constructor(
    public id: string,
    public name: string,
    private mode: "flight" | "ferry",
    private delay = 550,
    private fail = false,
  ) {}
  async search(request: TravelSearchRequest): Promise<TravelOption[]> {
    await new Promise((resolve) => setTimeout(resolve, this.delay));
    if (this.fail) throw new Error(`${this.name} temporarily unavailable`);
    return routes
      .filter(
        (r) =>
          r.mode === this.mode &&
          r.origin === request.origin.market &&
          r.destination === request.destination.market,
      )
      .filter(
        (r) =>
          (request.origin.type !== "airport" &&
            request.destination.type !== "airport") ||
          r.mode === "flight",
      )
      .filter(
        (r) =>
          (request.origin.type !== "seaport" &&
            request.destination.type !== "seaport") ||
          r.mode === "ferry",
      )
      .map((r) => fromLegacyRoute(r, request.departureDate));
  }
}
export const mockProviders: TravelProvider[] = [
  new MockTravelProvider("mock-flights", "Flight providers", "flight", 650),
  new MockTravelProvider("mock-ferries", "Ferry providers", "ferry", 850),
];
