-- CreateTable
CREATE TABLE "PlaylistItem" (
    "id" TEXT NOT NULL,
    "playlistId" TEXT NOT NULL,
    "playlistItemId" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "channelId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "publishedAt" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "channelTitle" TEXT,
    "thumbnails" TEXT,
    "videoId" TEXT NOT NULL,
    "videoOwnerChannelTitle" TEXT NOT NULL,
    "videoOwnerChannelId" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PlaylistItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PlaylistItem_id_key" ON "PlaylistItem"("id");

-- CreateIndex
CREATE INDEX "PlaylistItem_videoOwnerChannelId_idx" ON "PlaylistItem"("videoOwnerChannelId");

-- CreateIndex
CREATE INDEX "PlaylistItem_playlistId_idx" ON "PlaylistItem"("playlistId");

-- CreateIndex
CREATE INDEX "PlaylistItem_channelId_idx" ON "PlaylistItem"("channelId");

-- CreateIndex
CREATE INDEX "PlaylistItem_videoId_idx" ON "PlaylistItem"("videoId");
