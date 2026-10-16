export type TransportMode = "ferry" | "flight";
export interface Route {
  id: string;
  provider: string;
  mode: TransportMode;
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  durationMinutes: number;
  transfers: number;
  price: number;
  currency: "PHP";
  badge?: string;
  departureTerminal: string;
  arrivalTerminal: string;
  vehicle: string;
  luggage: string;
}
export interface Search {
  origin: string;
  destination: string;
  date: string;
  passengers: number;
}
export interface SavedRoute {
  route: Route;
  search: Search;
}
