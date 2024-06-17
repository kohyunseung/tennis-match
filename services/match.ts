import { http } from "@/lib/http";

export function fetchTodayMatches() {
  return fetch("http://localhost:3000/api/today-match");
}

export function postTodayMatches(data: any) {
  return fetch("http://localhost:3000/api/today-match", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
