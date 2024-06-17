import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";

export async function POST(req: Request) {
  try {
    const { players } = await req.json();
    const playersWithRank = players
      .split(",")
      .reduce((acc: any, cur: any, i: number) => {
        acc[cur] = i + 1;
        return acc;
      }, {});

    console.log("[RANK]", playersWithRank);

    writeFile(
      process.cwd() + "/app/data/ranking.json",
      JSON.stringify(playersWithRank)
    );

    return NextResponse.json({
      result: true,
      data: playersWithRank,
    });
  } catch (error) {
    console.log("[TODAY-MATCH-POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
