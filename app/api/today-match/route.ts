import { NextResponse } from "next/server";
import dayjs from "dayjs";

import { writeFile } from "fs/promises";
import { customReadFile } from "@/lib/file";

import { dividePlayers, generateMatchups } from "@/lib/match";

export async function GET(req: Request) {
  try {
    const today = dayjs().format("YYYY-MM-DD");
    const match = await customReadFile("/app/data/match.json");
    const jsonData = JSON.parse(match);

    return NextResponse.json({
      data: jsonData[today] ?? [],
    });
  } catch (error) {
    console.log("[TODAY-MATCH]", error);

    return NextResponse.json({
      data: [],
    });
    // return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    // 랭킹 데이터
    const rank = await customReadFile("/app/data/ranking.json");
    const jsonData = JSON.parse(rank);

    const match = await customReadFile("/app/data/match.json");
    const matchJsonData = JSON.parse(match);

    const today = dayjs().format("YYYY-MM-DD");

    // 오늘 경기 뛸 선수들
    const { players } = await req.json();
    const [first, second] = dividePlayers(players, jsonData);

    const matchups = generateMatchups(first, second);

    matchJsonData[today] = matchups;

    writeFile(
      process.cwd() + "/app/data/match.json",
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
