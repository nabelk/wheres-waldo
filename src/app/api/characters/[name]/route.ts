import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ name: string }> }
) {
  const { name } = await params;
  const character = await prisma.characterPosition.findFirst({
    where: {
      characterName: name,
    },
  });

  return NextResponse.json(character);
}
