import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function GET(
  req: Request,
  { params }: { params: { title: string } }
) {
  const { title } = params;

  if (typeof title !== "string") {
    return NextResponse.json({ error: "Invalid album title" }, { status: 500 });
  }

  try {
    const album = await prisma.album.findFirst({
      where: {
        title: title,
      },
      include: {
        tracks: true,
        artist: true,
      },
    });

    if (!album) {
      return NextResponse.json({ error: "Album not found" }, { status: 404 });
    }
    const formattedTracks = album.tracks.map((track) => ({
      ...track,
      albumCover: album.coverUrl, // Assuming the album has a coverImage field
      artistName: album.artist.name, // Assuming artist has a name field
      albumTitle: album.title,
    }));

    return NextResponse.json(formattedTracks);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch tracks" },
      { status: 500 }
    );
  }
}
