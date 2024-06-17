import { NextResponse } from "next/server";
import dayjs from "dayjs";
import match from "@/data/match.json";
import ranking from "@/data/ranking.json";

import { writeFile, readFile } from "fs/promises";

import { dividePlayers, generateMatchups } from "@/lib/match";

export async function GET(req: Request) {
  try {
    const today = dayjs().format("YYYY-MM-DD");
    const match = await readFile(process.cwd() + "/data/match.json", "utf8");
    const jsonData = JSON.parse(match);

    return NextResponse.json({
      data: jsonData[today] ?? [],
    });
  } catch (error) {
    console.log("[TODAY-MATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    // 랭킹 데이터
    const rank = await readFile(process.cwd() + "/data/ranking.json", "utf8");
    const jsonData = JSON.parse(rank);

    const match = await readFile(process.cwd() + "/data/match.json", "utf8");
    const matchJsonData = JSON.parse(match);

    const today = dayjs().format("YYYY-MM-DD");

    // 오늘 경기 뛸 선수들
    const { players } = await req.json();
    const [first, second] = dividePlayers(players, jsonData);

    const matchups = generateMatchups(first, second);

    matchJsonData[today] = matchups;
    console.log(process.cwd());

    writeFile(
      process.cwd() + "/data/match.json",
      JSON.stringify(matchJsonData)
    );

    return NextResponse.json({
      result: true,
      data: matchups,
    });
  } catch (error) {
    console.log("[TODAY-MATCH-POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
