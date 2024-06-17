import { NextResponse } from "next/server";
import dayjs from "dayjs";

import { writeFile } from "fs/promises";
import { customReadFile } from "@/lib/file";
import path from "path";

import { dividePlayers, generateMatchups } from "@/lib/match";

const RANK_FILE_PATH =
  process.env.VERCEL === "1"
    ? path.join("/tmp", "tennis-match/rank.json")
    : path.join(process.cwd() + "/app/data/rank.json");

const MATCH_FILE_PATH =
  process.env.VERCEL === "1"
    ? path.join("/tmp", "tennis-match/match.json")
    : path.join(process.cwd() + "/app/data/match.json");

export async function GET(req: Request) {
  try {
    const today = dayjs().format("YYYY-MM-DD");
    const match = await customReadFile(MATCH_FILE_PATH);
    const jsonData = JSON.parse(match);

    console.log("[TODAY-MATCH-JSON-DATA]", jsonData);

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
    const rank = await customReadFile(RANK_FILE_PATH);
    const jsonData = JSON.parse(rank);

    console.log(jsonData);

    const match = await customReadFile(MATCH_FILE_PATH);
    const matchJsonData = JSON.parse(match);

    console.log(matchJsonData);

    const today = dayjs().format("YYYY-MM-DD");

    // 오늘 경기 뛸 선수들
    const { players } = await req.json();
    const [first, second] = dividePlayers(players, jsonData);

    const matchups = generateMatchups(first, second);

    matchJsonData[today] = matchups;

    console.log("[MATCH-JSON]", matchJsonData);

    writeFile(MATCH_FILE_PATH, JSON.stringify(matchJsonData));

    return NextResponse.json({
      result: true,
      data: matchups,
    });
  } catch (error) {
    console.log("[TODAY-MATCH-POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
