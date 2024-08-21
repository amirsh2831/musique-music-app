import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

async function main() {
  // Load and parse JSON files
  // const artistsPath = path.join(__dirname, 'data/artists.json');
  // const albumsPath = path.join(__dirname, 'data/albums.json');
  // const tracksPath = path.join(__dirname, 'data/tracks.json');

  const artists = JSON.parse(fs.readFileSync("public/data/artists.json", 'utf-8'));
  const albums = JSON.parse(fs.readFileSync("public/data/albums.json", 'utf-8'));
  const tracks = JSON.parse(fs.readFileSync("public/data/tracks.json", 'utf-8'));

  // Insert artists into the database
  // for (const artist of artists) {
  //   await prisma.artist.create({
  //     data: {
  //       // id: artist.id,
  //       name: artist.name,
  //       imageUrl: artist.image,
  //       // other fields
  //     },
  //   });
  // }

  // Insert albums into the database
  // for (const album of albums) {
  //   const artist = await prisma.artist.findUnique({ where: { id: album.artistId } });

  //   if (artist) {
  //     await prisma.album.create({
  //       data: {
  //         id: album.id,
  //         title: album.title,
  //         artistId: artist.id,
  //         coverUrl: album.coverImage,
  //         // other fields
  //       },
  //     });
  //   }
  // }

  // Insert tracks into the database
  for (const track of tracks) {
    const artist = await prisma.artist.findUnique({ where: { id: track.artistId } });
    const album = await prisma.album.findUnique({ where: { id: track.albumId } });

    if (artist) {
      await prisma.track.create({
        data: {
          id: track.id,
          title: track.name,
          artistId: artist.id,
          albumId: album ? album.id : null,
          duration: track.duration,
          audioUrl: track.url,
          // other fields
        },
      });
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
