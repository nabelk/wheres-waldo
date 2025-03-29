/*
  Warnings:

  - A unique constraint covering the columns `[characterName]` on the table `CharacterPosition` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CharacterPosition_characterName_key" ON "CharacterPosition"("characterName");
