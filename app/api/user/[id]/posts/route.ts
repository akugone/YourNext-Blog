import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';

interface Params {
  params: {
    id: string;
  };
}

export const GET = async (request: Request, { params }: Params) => {
  try {
    const userId = params.id as string;

    if (!userId) {
      return NextResponse.json('User not found', { status: 404 });
    }

    // get all the Hint fomr user id
    const hints = await prisma.hint.findMany({
      where: {
        authorId: userId,
      },
      include: {
        author: {
          select: {
            name: true,
            image: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json(hints, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json('Failed to fetch the Hints', { status: 500 });
  }
};
