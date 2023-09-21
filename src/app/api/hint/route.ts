import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';

export const GET = async () => {
  try {
    const hints = await prisma.hint.findMany({
      include: {
        author: true,
      },
    });

    return NextResponse.json(hints, { status: 200 });
  } catch (error) {
    return NextResponse.json('Failed to fetch the Hint', { status: 500 });
  }
};
