-- DropIndex
DROP INDEX "UserUser_supId_subId_idx";

-- CreateIndex
CREATE INDEX "UserUser_subId_supId_idx" ON "UserUser"("subId", "supId");
