-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Work" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ownerCpf" TEXT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Work_ownerCpf_fkey" FOREIGN KEY ("ownerCpf") REFERENCES "Client" ("cpf") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Work" ("createdAt", "description", "id", "ownerCpf", "title", "updatedAt") SELECT "createdAt", "description", "id", "ownerCpf", "title", "updatedAt" FROM "Work";
DROP TABLE "Work";
ALTER TABLE "new_Work" RENAME TO "Work";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
