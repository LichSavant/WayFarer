import React, { createContext, useContext, useState } from "react";
import { Route, SavedRoute, Search } from "../types/route";
interface TravelState {
  search: Search;
  setSearch: React.Dispatch<React.SetStateAction<Search>>;
  saved: SavedRoute[];
  toggleSave: (route: Route, itinerary?: Search) => void;
  isSaved: (id: string, date?: string) => boolean;
}
const Context = createContext<TravelState | null>(null);
export const formatDate = (date: string) =>
  new Date(`${date}T12:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
export function TravelProvider({ children }: React.PropsWithChildren) {
  const [search, setSearch] = useState<Search>({
    origin: "Cebu City",
    destination: "Bohol",
    date: "2026-10-24",
    passengers: 1,
  });
  const [saved, setSaved] = useState<SavedRoute[]>([]);
  const isSaved = (id: string, date = search.date) =>
    saved.some((s) => s.route.id === id && s.search.date === date);
  const toggleSave = (route: Route, itinerary = search) =>
    setSaved((current) =>
      current.some(
        (s) => s.route.id === route.id && s.search.date === itinerary.date,
      )
        ? current.filter(
            (s) =>
              !(s.route.id === route.id && s.search.date === itinerary.date),
          )
        : [...current, { route, search: { ...itinerary } }],
    );
  return (
    <Context.Provider value={{ search, setSearch, saved, toggleSave, isSaved }}>
      {children}
    </Context.Provider>
  );
}
export function useTravel() {
  const value = useContext(Context);
  if (!value) throw new Error("TravelProvider required");
  return value;
}
