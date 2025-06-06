-- CreateEnum
CREATE TYPE "ArticleStatus" AS ENUM ('PENDING', 'CLOSED');

-- AlterTable
ALTER TABLE "articles" ADD COLUMN     "status" "ArticleStatus" NOT NULL DEFAULT 'PENDING';
