import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const { time, name } = await req.json();
  const score = await prisma.leaderboard.create({
    data: {
      time,
      name,
    },
  });

  return NextResponse.json(score);
}
