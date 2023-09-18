import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';

export const GET = async () => {
  try {
    const hints = await prisma.user.findMany({});

    return NextResponse.json(hints, { status: 200 });
  } catch (error) {
    return NextResponse.json('Failed to fetch the Hint', { status: 500 });
  }
};
