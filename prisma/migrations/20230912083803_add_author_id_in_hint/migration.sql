/*
  Warnings:

  - Added the required column `author_id` to the `Hint` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Hint" DROP CONSTRAINT "Hint_id_fkey";

-- AlterTable
ALTER TABLE "Hint" ADD COLUMN     "author_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Hint" ADD CONSTRAINT "Hint_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
