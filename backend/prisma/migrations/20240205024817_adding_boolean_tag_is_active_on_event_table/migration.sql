/*
  Warnings:

  - The values [ADMIN] on the enum `EventRole` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `college` on the `users` table. All the data in the column will be lost.
  - Added the required column `initials` to the `colleges` table without a default value. This is not possible if the table is not empty.
  - Added the required column `college_id` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "EventRole_new" AS ENUM ('PARTICIPANT', 'ORGANIZER', 'OWNER');
ALTER TABLE "users_events" ALTER COLUMN "event_role" TYPE "EventRole_new" USING ("event_role"::text::"EventRole_new");
ALTER TYPE "EventRole" RENAME TO "EventRole_old";
ALTER TYPE "EventRole_new" RENAME TO "EventRole";
DROP TYPE "EventRole_old";
COMMIT;

-- AlterTable
ALTER TABLE "colleges" ADD COLUMN     "initials" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "events" ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "college",
ADD COLUMN     "college_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_college_id_fkey" FOREIGN KEY ("college_id") REFERENCES "colleges"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
