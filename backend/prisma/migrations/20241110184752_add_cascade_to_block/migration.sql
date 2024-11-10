-- DropForeignKey
ALTER TABLE "Block" DROP CONSTRAINT "Block_websiteId_fkey";

-- AddForeignKey
ALTER TABLE "Block" ADD CONSTRAINT "Block_websiteId_fkey" FOREIGN KEY ("websiteId") REFERENCES "Website"("id") ON DELETE CASCADE ON UPDATE CASCADE;
