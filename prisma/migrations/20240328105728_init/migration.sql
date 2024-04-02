/*
  Warnings:

  - Made the column `publication` on table `Announcement` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Announcement" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "creator" TEXT NOT NULL,
    "createdDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastUpdated" DATETIME NOT NULL,
    "tag" TEXT,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "publication" TEXT NOT NULL
);
INSERT INTO "new_Announcement" ("content", "createdDate", "creator", "id", "lastUpdated", "publication", "tag", "title") SELECT "content", "createdDate", "creator", "id", "lastUpdated", "publication", "tag", "title" FROM "Announcement";
DROP TABLE "Announcement";
ALTER TABLE "new_Announcement" RENAME TO "Announcement";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
