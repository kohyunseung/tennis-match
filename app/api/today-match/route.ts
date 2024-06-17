import { NextResponse } from "next/server";
import dayjs from "dayjs";

import dbConnect from "@/lib/db";
import Match from "@/models/Match";
import Rank from "@/models/Rank";

// import { writeFile } from "fs/promises";
// import { customReadFile } from "@/lib/file";
// import path from "path";

import { dividePlayers, generateMatchups } from "@/lib/match";

export async function GET(req: Request) {
  try {
    await dbConnect();
    const today = dayjs().format("YYYY-MM-DD");
    const { matches } = await Match.findOne({
      date: today,
    });

    return NextResponse.json({
      data: matches || [],
    });
  } catch (error) {
    console.log("[TODAY-MATCH]", error);

    // return NextResponse.json({
    //   data: [],
    // });
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();

    const { rank } = await Rank.findOne({});

    console.log(rank);
    // 랭킹 데이터
    // const rank = await customReadFile(RANK_FILE_PATH);
    // const jsonData = JSON.parse(rank);

    // console.log(jsonData);

    // const match = await customReadFile(MATCH_FILE_PATH);
    // const matchJsonData = JSON.parse(match);

    // console.log(matchJsonData);

    const today = dayjs().format("YYYY-MM-DD");

    // 오늘 경기 뛸 선수들
    const { players } = await req.json();
    const [first, second] = dividePlayers(players, rank);

    const matchups = generateMatchups(first, second);

    const data = await Match.create({ date: today, matches: matchups });

    // matchJsonData[today] = matchups;

    // console.log("[MATCH-JSON]", matchJsonData);

    // writeFile(MATCH_FILE_PATH, JSON.stringify(matchJsonData));

    return NextResponse.json({
      result: true,
      data: matchups,
    });
  } catch (error) {
    console.log("[TODAY-MATCH-POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
