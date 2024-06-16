import { fetchTodayMatches } from "@/services/match";

const EmptyMatch = () => {
  return (
    <div className="shadow-md">
      <p>아직 관리자가 매칭을 생성하지 않았어요🥲</p>
    </div>
  );
};

const Match = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              라운드
            </th>
            <th scope="col" className="px-6 py-3">
              조합
            </th>
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
};

const Round = ({ round, player }: { round: number; player: string }) => {
  return (
    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {round + 1}라운드
      </th>
      <td className="px-6 py-4">{player}</td>
    </tr>
  );
};

const Main = async () => {
  // const todayMatch = [];
  const { data: todayMatch } = await fetchTodayMatches();

  return (
    <main className="flex min-h-screen max-w-96 flex-col m-auto items-center justify-center">
      <div className="w-full min-h-screen">
        <p>오늘의 매칭🎾</p>

        {todayMatch.length === 0 ? (
          <EmptyMatch />
        ) : (
          <Match>
            {todayMatch.map((x: any, i: number) => (
              <Round key={x + i} round={i} player={x} />
            ))}
          </Match>
        )}
      </div>
    </main>
  );
};

export default Main;
