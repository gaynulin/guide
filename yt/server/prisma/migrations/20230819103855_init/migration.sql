-- CreateTable
CREATE TABLE "Channel" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "customUrl" TEXT,
    "publishedAt" TIMESTAMP(3) NOT NULL,
    "thumbnails" TEXT,
    "localized" TEXT,
    "likesPlaylists" TEXT,
    "uploadsPlaylists" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Channel_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Channel_id_key" ON "Channel"("id");
