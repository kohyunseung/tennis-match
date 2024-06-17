export function postPlayersRank(data: any) {
  return fetch("/api/rank", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
