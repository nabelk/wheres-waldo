import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const requestApiKey = req.headers.get("x-api-key");

  if (!requestApiKey || requestApiKey !== apiKey) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  const { time, name } = await req.json();
  const score = await prisma.leaderboard.create({
    data: {
      time,
      name,
    },
  });

  return NextResponse.json(score);
}
