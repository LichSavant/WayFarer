import { Route, Search } from "../types/route";
export const routes: Route[] = [
  {
    id: "oceanjet",
    provider: "OceanJet",
    mode: "ferry",
    origin: "Cebu City",
    destination: "Bohol",
    departureTime: "08:00 AM",
    arrivalTime: "10:00 AM",
    durationMinutes: 120,
    transfers: 0,
    price: 800,
    currency: "PHP",
    departureTerminal: "Cebu Pier 1",
    arrivalTerminal: "Tagbilaran Port",
    vehicle: "OceanJet FastCraft · Tourist class",
    luggage: "1 hand-carry bag, up to 10 kg",
  },
  {
    id: "supercat",
    provider: "SuperCat",
    mode: "ferry",
    origin: "Cebu City",
    destination: "Bohol",
    departureTime: "09:30 AM",
    arrivalTime: "12:00 PM",
    durationMinutes: 150,
    transfers: 0,
    price: 650,
    currency: "PHP",
    departureTerminal: "Cebu Pier 1",
    arrivalTerminal: "Tagbilaran Port",
    vehicle: "SuperCat Fast Ferry · Economy",
    luggage: "1 hand-carry bag, up to 10 kg",
  },
  {
    id: "pal",
    provider: "Philippine Airlines",
    mode: "flight",
    origin: "Cebu City",
    destination: "Bohol",
    departureTime: "01:15 PM",
    arrivalTime: "02:05 PM",
    durationMinutes: 50,
    transfers: 0,
    price: 2450,
    currency: "PHP",
    departureTerminal: "Mactan–Cebu Airport (CEB)",
    arrivalTerminal: "Bohol–Panglao Airport (TAG)",
    vehicle: "PR 2841 · Economy",
    luggage: "1 cabin bag, up to 7 kg",
  },
  ...["Manila", "Boracay", "Siargao"].map((destination, i): Route => ({
    id: `flight-${i}`,
    provider: "Cebu Pacific",
    mode: "flight",
    origin: i === 1 ? "Manila" : "Cebu City",
    destination,
    departureTime: "10:00 AM",
    arrivalTime: "11:30 AM",
    durationMinutes: 90,
    transfers: 0,
    price: [1499, 1890, 2199][i],
    currency: "PHP",
    departureTerminal: i === 1 ? "Ninoy Aquino Airport" : "Mactan–Cebu Airport",
    arrivalTerminal: `${destination} Airport`,
    vehicle: "Cebu Pacific · Economy",
    luggage: "1 cabin bag, up to 7 kg",
  })),
];
const normalize = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/^cebu$/, "cebu city");
// Replace this repository with a transport API adapter when services are ready.
export const routeRepository = {
  search: (search: Search) =>
    routes.filter(
      (r) =>
        normalize(r.origin) === normalize(search.origin) &&
        normalize(r.destination) === normalize(search.destination),
    ),
  get: (id: string) => routes.find((r) => r.id === id),
};
export const fare = (price: number) => `₱${price.toLocaleString("en-PH")}`;
export const duration = (minutes: number) =>
  `${Math.floor(minutes / 60) ? `${Math.floor(minutes / 60)}h ` : ""}${minutes % 60 ? `${minutes % 60}m` : ""}`.trim();
