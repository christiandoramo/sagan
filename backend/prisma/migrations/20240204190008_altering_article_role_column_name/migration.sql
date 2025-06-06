/*
  Warnings:

  - You are about to drop the column `author_type` on the `users_articles` table. All the data in the column will be lost.
  - Added the required column `article_role` to the `users_articles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users_articles" DROP COLUMN "author_type",
ADD COLUMN     "article_role" "ArticleRole" NOT NULL;
