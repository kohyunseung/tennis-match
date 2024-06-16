import { http } from "@/lib/http";

export function fetchTodayMatches() {
  return http.get<string[][]>("/today-match");
}
