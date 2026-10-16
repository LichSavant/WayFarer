import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
} from "react";
import { Route, SavedRoute, Search } from "../types/route";
import { TravelSearchResult } from "../types/travel";
import { toTravelRequest } from "../services/travel/adapters";
import { searchTravelOptions } from "../services/travel/searchTravelOptions";
interface SearchSession extends TravelSearchResult {
  request: Search;
}
interface TravelState {
  search: Search;
  setSearch: React.Dispatch<React.SetStateAction<Search>>;
  saved: SavedRoute[];
  toggleSave: (route: Route, itinerary?: Search) => void;
  isSaved: (id: string, date?: string) => boolean;
  session: SearchSession | null;
  searching: boolean;
  searchError: string;
  runSearch: (request: Search) => Promise<boolean>;
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
  const [session, setSession] = useState<SearchSession | null>(null);
  const [searching, setSearching] = useState(false);
  const [searchError, setSearchError] = useState("");
  const latest = useRef(0);
  const runSearch = useCallback(async (request: Search) => {
    const sequence = ++latest.current;
    setSearching(true);
    setSearchError("");
    try {
      const result = await searchTravelOptions(toTravelRequest(request));
      await new Promise((resolve) => setTimeout(resolve, 450));
      if (sequence !== latest.current) return false;
      setSession({ ...result, request: { ...request } });
      return true;
    } catch (error) {
      if (sequence === latest.current) {
        setSearchError(
          error instanceof Error
            ? error.message
            : "Search unavailable. Please try again.",
        );
        setSession(null);
      }
      return false;
    } finally {
      if (sequence === latest.current) setSearching(false);
    }
  }, []);
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
    <Context.Provider
      value={{
        search,
        setSearch,
        saved,
        toggleSave,
        isSaved,
        session,
        searching,
        searchError,
        runSearch,
      }}
    >
      {children}
    </Context.Provider>
  );
}
export function useTravel() {
  const value = useContext(Context);
  if (!value) throw new Error("TravelProvider required");
  return value;
}
