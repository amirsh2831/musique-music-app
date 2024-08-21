// app/api/library/like-song/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth/next';
import { options } from '@/app/api/auth/[...nextauth]/options';

const prisma = new PrismaClient()

export async function POST(req: Request) {
  const { songId } = await req.json();
  const session = await getServerSession(options);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  if(!session.user){
    return NextResponse.json({error: 'No User'}, {status: 401})
  }
  if(!session.user.email){
    return NextResponse.json({error: 'No Email'}, {status: 401})
  }
  console.log(session.user.email)
  const user = await prisma.user.update({
    where: { email: session.user.email },
    data: {
      likedTracks: {
        connect: { id: songId }
      }
    }
  });

  return NextResponse.json(user.username, {status: 200});
}
