import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth/next';
import { options } from '@/app/api/auth/[...nextauth]/options';
const prisma = new PrismaClient()

export async function GET() {
    const session = await getServerSession(options);

  if (!session) {
    return NextResponse.json({error: "Unauthorized"}, {status: 401});
  }
  if(!session.user){
    return NextResponse.json({error: 'No User'}, {status: 401})
  }
  if(!session.user.email){
    return NextResponse.json({error: 'No Email'}, {status: 401})
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: {
      likedTracks: {
        include: {
          artist: true, // Include artist details
          album: true,  // Include album details
        },
      },
    },
  });
  if (!user) {
    return NextResponse.json({error: "UnAuthorized Access"}, {status: 401})
  }
  const likedSongs = user.likedTracks.map((song) => ({
    id: song.id,
    title: song.title,
    artistName: song.artist.name,
    albumCover: song.album?.coverUrl || null, // Fallback to null if no cover image
    audioUrl: song.audioUrl,
  }));
  
    return NextResponse.json({likedSongs});
}