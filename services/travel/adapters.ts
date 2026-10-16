import { Route, Search } from "../../types/route";
import {
  JourneyRoute,
  TravelOption,
  TravelSearchRequest,
} from "../../types/travel";
import { terminalLocation, resolveLocation } from "../../data/locations";
export function toTravelRequest(search: Search): TravelSearchRequest {
  const origin = resolveLocation(search.origin);
  const destination = resolveLocation(search.destination);
  if (!origin || !destination)
    throw new Error(
      "Choose an origin and destination from the location suggestions.",
    );
  if (origin.market === destination.market)
    throw new Error("Choose two different destinations.");
  if (
    !Number.isInteger(search.passengers) ||
    search.passengers < 1 ||
    search.passengers > 6
  )
    throw new Error("Choose between 1 and 6 travelers.");
  return {
    origin,
    destination,
    departureDate: search.date,
    travelers: search.passengers,
  };
}
function timestamp(date: string, time: string) {
  const match = /^(\d{2}):(\d{2}) (AM|PM)$/.exec(time);
  if (!match) throw new Error("Invalid mock departure time");
  const hour = (Number(match[1]) % 12) + (match[3] === "PM" ? 12 : 0);
  return `${date}T${String(hour).padStart(2, "0")}:${match[2]}:00+08:00`;
}
export function fromLegacyRoute(route: Route, date: string): JourneyRoute {
  const type =
    route.mode === "flight"
      ? "airport"
      : route.mode === "ferry"
        ? "seaport"
        : "city";
  return {
    ...route,
    segments: [
      {
        id: `${route.id}-segment`,
        mode: route.mode,
        provider: route.provider,
        origin: terminalLocation(route.departureTerminal, route.origin, type),
        destination: terminalLocation(
          route.arrivalTerminal,
          route.destination,
          type,
        ),
        departureTime: timestamp(date, route.departureTime),
        arrivalTime: timestamp(date, route.arrivalTime),
        durationMinutes: route.durationMinutes,
        vehicle: route.vehicle,
        baggage: route.luggage,
      },
    ],
    totalDurationMinutes: route.durationMinutes,
    transferCount: route.transfers,
    pricePerTraveler: route.price,
    bookingProvider: route.provider,
  };
}
const displayTime = (value: string) =>
  new Date(value).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Manila",
  });
export function toJourneyRoute(option: TravelOption): JourneyRoute {
  const first = option.segments[0];
  const last = option.segments[option.segments.length - 1];
  return {
    ...option,
    provider: option.bookingProvider,
    mode: first.mode,
    origin: first.origin.market,
    destination: last.destination.market,
    departureTime: displayTime(first.departureTime),
    arrivalTime: displayTime(last.arrivalTime),
    durationMinutes: option.totalDurationMinutes,
    transfers: option.transferCount,
    price: option.pricePerTraveler,
    departureTerminal: first.origin.name,
    arrivalTerminal: last.destination.name,
    vehicle: first.vehicle ?? first.provider,
    luggage: first.baggage ?? "Confirm baggage allowance with the provider.",
  };
}
