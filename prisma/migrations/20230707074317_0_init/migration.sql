-- CreateTable
CREATE TABLE "Links" (
    "id" TEXT NOT NULL,
    "deleteToken" TEXT NOT NULL,
    "creationDate" TIMESTAMP(3) NOT NULL,
    "destination" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Links_id_key" ON "Links"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Links_deleteToken_key" ON "Links"("deleteToken");
