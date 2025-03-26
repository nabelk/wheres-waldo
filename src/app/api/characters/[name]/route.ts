import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ name: string }> }
) {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const requestApiKey = req.headers.get("x-api-key");

  if (!requestApiKey || requestApiKey !== apiKey) {
    return redirect("/?error=unauthorized");
  }

  const { name } = await params;
  const character = await prisma.characterPosition.findFirst({
    where: {
      characterName: name,
    },
  });

  return NextResponse.json(character);
}
