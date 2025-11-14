/*
  Warnings:

  - You are about to drop the column `Experience` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `skills` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "Experience",
DROP COLUMN "skills";

-- CreateTable
CREATE TABLE "UserProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "resumeUrl" TEXT,
    "parsedResume" JSONB,
    "skills" JSONB,
    "experience" JSONB,
    "education" JSONB,
    "projects" JSONB,
    "summary" TEXT,
    "preferredRole" TEXT,
    "preferredLocation" TEXT,
    "expectedSalary" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserProfile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserProfile_userId_key" ON "UserProfile"("userId");

-- AddForeignKey
ALTER TABLE "UserProfile" ADD CONSTRAINT "UserProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
