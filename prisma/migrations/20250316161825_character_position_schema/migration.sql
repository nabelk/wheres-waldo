/*
  Warnings:

  - You are about to drop the column `name` on the `CharacterPosition` table. All the data in the column will be lost.
  - Added the required column `characterName` to the `CharacterPosition` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CharacterPosition" DROP COLUMN "name",
ADD COLUMN     "characterName" TEXT NOT NULL;
