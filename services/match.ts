import { http } from "@/lib/http";

export function fetchTodayMatches() {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/today-match`);
}

export function postTodayMatches(data: any) {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/today-match`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}
