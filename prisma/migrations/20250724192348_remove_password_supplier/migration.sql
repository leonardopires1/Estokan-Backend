/*
  Warnings:

  - You are about to drop the `equipament` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `password` on the `Supplier` table. All the data in the column will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "equipament";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Equipament" (
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
    CONSTRAINT "Equipament_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Supplier" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Equipament_functionaryId_fkey" FOREIGN KEY ("functionaryId") REFERENCES "Funcionary" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Equipament_workId_fkey" FOREIGN KEY ("workId") REFERENCES "Work" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Supplier" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cnpj" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Supplier" ("cnpj", "createdAt", "email", "id", "location", "name", "updatedAt") SELECT "cnpj", "createdAt", "email", "id", "location", "name", "updatedAt" FROM "Supplier";
DROP TABLE "Supplier";
ALTER TABLE "new_Supplier" RENAME TO "Supplier";
CREATE UNIQUE INDEX "Supplier_cnpj_key" ON "Supplier"("cnpj");
CREATE UNIQUE INDEX "Supplier_email_key" ON "Supplier"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
