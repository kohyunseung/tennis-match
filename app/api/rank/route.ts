import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Rank from "@/models/Rank";

export async function POST(req: Request) {
  try {
    const { players } = await req.json();
    const playersWithRank = players
      .split(",")
      .reduce((acc: any, cur: any, i: number) => {
        acc[cur] = i + 1;
        return acc;
      }, {});

    await dbConnect();
    console.log("[RANK]", playersWithRank);
    // console.log("지우기전", await Rank.find({}));
    await Rank.deleteMany({});
    // console.log("지운후", await Rank.find({}));

    await Rank.create({ rank: playersWithRank });

    return NextResponse.json({
      result: true,
      data: playersWithRank,
    });
  } catch (error) {
    console.log("[TODAY-MATCH-POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
