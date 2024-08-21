/*
  Warnings:

  - The primary key for the `Album` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `name` on the `Album` table. All the data in the column will be lost.
  - The `id` column on the `Album` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Artist` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Artist` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `Song` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_UserLikedSongs` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `artistId` to the `Album` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Album` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Album` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `A` on the `_UserFavoriteArtists` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Song" DROP CONSTRAINT "Song_albumId_fkey";

-- DropForeignKey
ALTER TABLE "Song" DROP CONSTRAINT "Song_artistId_fkey";

-- DropForeignKey
ALTER TABLE "_UserFavoriteArtists" DROP CONSTRAINT "_UserFavoriteArtists_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserLikedSongs" DROP CONSTRAINT "_UserLikedSongs_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserLikedSongs" DROP CONSTRAINT "_UserLikedSongs_B_fkey";

-- AlterTable
ALTER TABLE "Album" DROP CONSTRAINT "Album_pkey",
DROP COLUMN "name",
ADD COLUMN     "artistId" INTEGER NOT NULL,
ADD COLUMN     "coverUrl" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Album_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Artist" DROP CONSTRAINT "Artist_pkey",
ADD COLUMN     "imageUrl" TEXT,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Artist_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "_UserFavoriteArtists" DROP COLUMN "A",
ADD COLUMN     "A" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Song";

-- DropTable
DROP TABLE "_UserLikedSongs";

-- CreateTable
CREATE TABLE "Track" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "artistId" INTEGER NOT NULL,
    "albumId" INTEGER,
    "duration" INTEGER NOT NULL,
    "audioUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Track_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_UserLikedTracks" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserLikedTracks_AB_unique" ON "_UserLikedTracks"("A", "B");

-- CreateIndex
CREATE INDEX "_UserLikedTracks_B_index" ON "_UserLikedTracks"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_UserFavoriteArtists_AB_unique" ON "_UserFavoriteArtists"("A", "B");

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Album" ADD CONSTRAINT "Album_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserLikedTracks" ADD CONSTRAINT "_UserLikedTracks_A_fkey" FOREIGN KEY ("A") REFERENCES "Track"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserLikedTracks" ADD CONSTRAINT "_UserLikedTracks_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserFavoriteArtists" ADD CONSTRAINT "_UserFavoriteArtists_A_fkey" FOREIGN KEY ("A") REFERENCES "Artist"("id") ON DELETE CASCADE ON UPDATE CASCADE;
