/*
  Warnings:

  - You are about to drop the column `parentID` on the `AIQuestionLog` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AIQuestionLog" DROP COLUMN "parentID",
ADD COLUMN     "accountID" INTEGER;

-- AddForeignKey
ALTER TABLE "AIQuestionLog" ADD CONSTRAINT "AIQuestionLog_accountID_fkey" FOREIGN KEY ("accountID") REFERENCES "Account"("id") ON DELETE SET NULL ON UPDATE CASCADE;
