-- CreateTable
CREATE TABLE "Links" (
    "id" TEXT NOT NULL,
    "updateToken" TEXT NOT NULL,
    "creationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiryDate" TIMESTAMP(3) NOT NULL,
    "destination" TEXT NOT NULL,
    "shortlink" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Links_id_key" ON "Links"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Links_updateToken_key" ON "Links"("updateToken");

-- CreateIndex
CREATE UNIQUE INDEX "Links_shortlink_key" ON "Links"("shortlink");
