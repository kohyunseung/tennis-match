export function postPlayersRank(data: any) {
  return fetch("http://localhost:3000/api/rank", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
