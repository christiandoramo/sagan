/*
  Warnings:

  - The values [REVIEWR] on the enum `ArticleRole` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ArticleRole_new" AS ENUM ('REVIEWER', 'AUTHOR', 'CO_AUTHOR');
ALTER TABLE "users_articles" ALTER COLUMN "author_type" TYPE "ArticleRole_new" USING ("author_type"::text::"ArticleRole_new");
ALTER TYPE "ArticleRole" RENAME TO "ArticleRole_old";
ALTER TYPE "ArticleRole_new" RENAME TO "ArticleRole";
DROP TYPE "ArticleRole_old";
COMMIT;
