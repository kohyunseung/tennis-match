import { http } from "@/lib/http";

export function fetchTodayMatches() {
  return http.get<any>("/api/today-match");
}

export function postTodayMatches(data: any) {
  return http.post<any>("/api/today-match", data);
}
