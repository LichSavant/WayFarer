import { Location } from "./location";
import { Route } from "./route";
export type JourneyMode = "flight" | "ferry" | "bus" | "van" | "train";
export interface JourneySegment {
  id: string;
  mode: JourneyMode;
  provider: string;
  origin: Location;
  destination: Location;
  departureTime: string;
  arrivalTime: string;
  durationMinutes: number;
  vehicle?: string;
  baggage?: string;
}
export interface TravelOption {
  id: string;
  segments: JourneySegment[];
  totalDurationMinutes: number;
  transferCount: number;
  pricePerTraveler: number;
  currency: "PHP";
  bookingProvider: string;
  bookingUrl?: string;
}
export interface TravelSearchRequest {
  origin: Location;
  destination: Location;
  departureDate: string;
  travelers: number;
}
export interface TravelProvider {
  id: string;
  name: string;
  search(request: TravelSearchRequest): Promise<TravelOption[]>;
}
/** Transitional view model preserves existing Saved/Trips and route components. */
export type JourneyRoute = Route & TravelOption;
export interface TravelSearchResult {
  options: JourneyRoute[];
  warnings: string[];
}
