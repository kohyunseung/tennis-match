import { http } from "@/lib/http";

export function postPlayersRank(data) {
  return http.post("/api/rank", data);
}
