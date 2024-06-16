import { http } from "@/lib/http";

export function fetchTodayMatches() {
  return http.get<string[][]>("/api/today-match");
}

export function postTodayMatches(data) {
  return http.post("/api/today-match", data);
}
