-- AlterTable
ALTER TABLE "PlaylistItem" ADD COLUMN     "videoProcessed" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "Video" (
    "id" TEXT NOT NULL,
    "channelId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "publishedAt" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "channelTitle" TEXT,
    "thumbnails" TEXT,
    "tags" TEXT[],
    "categoryId" TEXT NOT NULL,
    "liveBroadcastContent" TEXT NOT NULL,
    "localized" TEXT,
    "defaultAudioLanguage" TEXT,
    "contentDetails" TEXT,
    "status" TEXT,
    "statistics" TEXT,
    "player" TEXT,
    "topicDetails" TEXT,
    "recordingDetails" TEXT,
    "liveStreamingDetails" TEXT,
    "whenAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Video_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Video_id_key" ON "Video"("id");

-- CreateIndex
CREATE INDEX "Video_liveBroadcastContent_idx" ON "Video"("liveBroadcastContent");

-- CreateIndex
CREATE INDEX "Video_whenAt_idx" ON "Video"("whenAt" DESC);

-- CreateIndex
CREATE INDEX "Video_liveBroadcastContent_whenAt_idx" ON "Video"("liveBroadcastContent", "whenAt" DESC);

-- CreateIndex
CREATE INDEX "Video_channelId_idx" ON "Video"("channelId");
