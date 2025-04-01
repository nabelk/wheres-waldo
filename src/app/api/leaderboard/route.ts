import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const requestApiKey = req.headers.get("x-api-key");

  if (!requestApiKey || requestApiKey !== apiKey) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  const leaderboard = await prisma.leaderboard.findMany({
    orderBy: {
      time: "asc",
    },
  });
  return NextResponse.json(leaderboard);
}
