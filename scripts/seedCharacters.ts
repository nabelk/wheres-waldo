import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const characterPositions = JSON.parse(
    process.env.CHARACTER_POSITIONS || "[]"
  );

  for (const position of characterPositions) {
    await prisma.characterPosition.upsert({
      where: {
        characterName: position.name,
      },
      update: {},
      create: {
        characterName: position.name,
        x: position.x,
        y: position.y,
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
