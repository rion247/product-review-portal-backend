/*
  Warnings:

  - You are about to drop the column `needsPasswordChange` on the `authentications` table. All the data in the column will be lost.
  - Added the required column `passwordChangedAt` to the `authentications` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "authentications" DROP COLUMN "needsPasswordChange",
ADD COLUMN     "passwordChangedAt" TIMESTAMP(3) NOT NULL;
