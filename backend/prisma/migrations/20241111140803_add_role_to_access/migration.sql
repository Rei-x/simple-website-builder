/*
  Warnings:

  - Added the required column `role` to the `Access` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- AlterTable
ALTER TABLE "Access" ADD COLUMN     "role" "Role" NOT NULL;
