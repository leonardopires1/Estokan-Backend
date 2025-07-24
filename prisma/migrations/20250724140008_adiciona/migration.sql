/*
  Warnings:

  - Added the required column `status` to the `equipament` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `equipament` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_equipament" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "supplierId" INTEGER,
    "functionaryId" INTEGER,
    "workId" INTEGER,
    "type" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    CONSTRAINT "equipament_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Supplier" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "equipament_functionaryId_fkey" FOREIGN KEY ("functionaryId") REFERENCES "Funcionary" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "equipament_workId_fkey" FOREIGN KEY ("workId") REFERENCES "Work" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_equipament" ("createdAt", "description", "functionaryId", "id", "name", "supplierId", "updatedAt", "workId") SELECT "createdAt", "description", "functionaryId", "id", "name", "supplierId", "updatedAt", "workId" FROM "equipament";
DROP TABLE "equipament";
ALTER TABLE "new_equipament" RENAME TO "equipament";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
