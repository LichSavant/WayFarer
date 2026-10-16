export type LocationType = "city" | "airport" | "seaport" | "island";
export interface Location {
  id: string;
  name: string;
  city?: string;
  province?: string;
  country: string;
  type: LocationType;
  code?: string;
  /** Geographic market used only by the mock inventory adapter. */
  market: string;
}
