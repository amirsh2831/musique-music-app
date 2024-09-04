import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { error } from "console";
const prisma = new PrismaClient();

interface mergeAlbumProps {
  artist?: {
    id: number;
    name: string;
    imageUrl: string | null;
  };
  id: number;
  title: string;
  artistId: number;
  coverUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
  artistName: string;
}

interface mergeTracksProps {
  album?: {
    id: number;
    title: string;
    artistId: number;
    coverUrl: string | null;
    createdAt: Date;
    updatedAt: Date;
  } | null;
  artist?: {
    id: number;
    name: string;
    imageUrl: string | null;
  };
  id: number;
  title: string;
  artistId: number;
  albumId: number | null;
  duration: number;
  audioUrl: string;
  createdAt: Date;
  updatedAt: Date;
  artistName: string;
  albumCover?: string | null;
}

export async function GET(
  req: Request,
  { params }: { params: { title: string } }
) {
  const { title } = params;

  if (typeof title !== "string") {
    return NextResponse.json(
      { error: "Invalid search query" },
      { status: 500 }
    );
  }

  try {
    const album = await prisma.album.findMany({
      where: {
        title: {
          contains: title,
        },
      },
      include: {
        artist: true,
      },
    });
    if (!album) {
      return NextResponse.json({ error: "Album not found" }, { status: 404 });
    }
    const songs = await prisma.track.findMany({
      where: {
        title: {
          contains: title,
        },
      },
      include: {
        album: true,
        artist: true,
      },
    });
    if (!songs) {
      return NextResponse.json({ error: "song not found" }, { status: 404 });
    }
    const formattedAlbums = album.map((data) => {
      const mergeData: mergeAlbumProps = {
        ...data,
        artistName: data.artist.name,
      };
      delete mergeData.artist;
      return mergeData;
    });
    const formattedTracks = songs.map((track) => {
      const mergedTracks: mergeTracksProps = {
        ...track,
        artistName: track?.artist.name,
        albumCover: track.album?.coverUrl,
      };
      delete mergedTracks.album;
      delete mergedTracks.artist;
      return mergedTracks;
    });
    return NextResponse.json({
      albums: formattedAlbums,
      tracks: formattedTracks,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch tracks" },
      { status: 500 }
    );
  }
}
