/*
  Warnings:

  - You are about to drop the column `userId` on the `articles` table. All the data in the column will be lost.
  - The `role` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `authors` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `author_type` to the `users_articles` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('STUDENT', 'PROFESSOR', 'TECH_MANAGER', 'ADMIN');

-- CreateEnum
CREATE TYPE "ArticleRole" AS ENUM ('REVIEWR', 'AUTHOR', 'CO_AUTHOR');

-- DropForeignKey
ALTER TABLE "articles" DROP CONSTRAINT "articles_userId_fkey";

-- DropForeignKey
ALTER TABLE "authors" DROP CONSTRAINT "authors_article_id_fkey";

-- AlterTable
ALTER TABLE "articles" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "role",
ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'STUDENT';

-- AlterTable
ALTER TABLE "users_articles" ADD COLUMN     "author_type" "ArticleRole" NOT NULL;

-- DropTable
DROP TABLE "authors";

-- DropEnum
DROP TYPE "AuthorType";

-- DropEnum
DROP TYPE "Role";
