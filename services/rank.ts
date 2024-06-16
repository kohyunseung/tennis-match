import { http } from "@/lib/http";

export function postPlayersRank(data: any) {
  return http.post<any>("/api/rank", data);
}
