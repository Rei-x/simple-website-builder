/*
  Warnings:

  - A unique constraint covering the columns `[websiteId,userId]` on the table `Member` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Member_websiteId_userId_key" ON "Member"("websiteId", "userId");
