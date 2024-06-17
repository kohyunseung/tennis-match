export function postPlayersRank(data: any) {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/rank`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}
