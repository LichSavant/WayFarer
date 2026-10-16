import { Location } from "../types/location";
const make = (
  id: string,
  name: string,
  type: Location["type"],
  market: string,
  city?: string,
  code?: string,
): Location => ({ id, name, type, market, city, code, country: "Philippines" });
export const locations: Location[] = [
  make("cebu", "Cebu City", "city", "Cebu City", "Cebu"),
  make("cebu-island", "Cebu, Philippines", "island", "Cebu City", "Cebu"),
  make(
    "ceb",
    "Mactan-Cebu International Airport",
    "airport",
    "Cebu City",
    "Cebu",
    "CEB",
  ),
  make("cebu-pier", "Cebu Pier 1", "seaport", "Cebu City", "Cebu"),
  make("bohol", "Bohol", "island", "Bohol", "Tagbilaran"),
  make("tagbilaran", "Tagbilaran", "city", "Bohol", "Bohol"),
  make("panglao", "Panglao", "island", "Bohol", "Bohol"),
  make("tag-port", "Tagbilaran Port", "seaport", "Bohol", "Bohol"),
  make(
    "tag",
    "Bohol-Panglao International Airport",
    "airport",
    "Bohol",
    "Panglao",
    "TAG",
  ),
  make("manila", "Manila", "city", "Manila", "Metro Manila"),
  make(
    "mnl",
    "Ninoy Aquino International Airport",
    "airport",
    "Manila",
    "Manila",
    "MNL",
  ),
  make("boracay", "Boracay", "island", "Boracay", "Malay"),
  make("siargao", "Siargao", "island", "Siargao", "Surigao del Norte"),
];
const normalize = (value: string) => value.trim().toLowerCase();
export function suggestLocations(query: string) {
  const value = normalize(query);
  return locations
    .filter(
      (l) =>
        !value ||
        [l.name, l.city, l.code, l.market].some((t) =>
          t?.toLowerCase().includes(value),
        ),
    )
    .slice(0, 6);
}
export function resolveLocation(value: string): Location | undefined {
  const normalized = normalize(value);
  return (
    locations.find(
      (l) =>
        normalize(l.name) === normalized ||
        l.code?.toLowerCase() === normalized,
    ) ?? (normalized === "cebu" ? locations[0] : undefined)
  );
}
export function terminalLocation(
  name: string,
  market: string,
  type: Location["type"],
): Location {
  return (
    locations.find((l) => l.name === name) ?? {
      id: name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      name,
      country: "Philippines",
      market,
      type,
    }
  );
}
