import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const leaderboard = await prisma.leaderboard.findMany({
    orderBy: {
      time: "asc",
    },
  });
  return NextResponse.json(leaderboard);
}
