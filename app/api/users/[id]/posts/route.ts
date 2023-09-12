import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';
import { NextApiRequest } from 'next';

interface Params {
  id: string;
}

export const GET = async (request: NextApiRequest) => {
  try {
    const userId = request.query.id as string;

    if (!userId) {
      return NextResponse.json('User not found', { status: 404 });
    }

    // Fetch the user and associated hints
    const hints = await prisma.hint.findMany({
      where: {
        authorId: userId,
      },
    });

    return NextResponse.json(hints, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json('Failed to fetch the Hints', { status: 500 });
  }
};
