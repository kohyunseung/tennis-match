import { http } from "@/lib/http";

export function fetchTodayMatches() {
  return fetch(`/api/today-match`);
}

export function postTodayMatches(data: any) {
  return fetch(`/api/today-match`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}
