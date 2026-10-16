import { Route } from "./route";
export interface Trip {
  id: string;
  route: Route;
  date: string;
  status: "upcoming" | "past";
}
