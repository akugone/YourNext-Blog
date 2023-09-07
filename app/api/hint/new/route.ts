import { NextResponse } from 'next/server';
import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/app/libs/prismadb';

export const POST = async (request: Request) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { hint, tag } = await request.json();

  if (!hint || !tag) {
    return NextResponse.json('Missing hint or tag', { status: 400 });
  }

  try {
    const newHint = await prisma.hint.create({
      data: {
        authorId: Number(currentUser?.id), // relates the hint to the user
        hint: hint,
        tag: tag,
      },
    });

    return NextResponse.json(newHint, { status: 201 });
  } catch (error) {
    return NextResponse.json('Failed to create a new Hint', { status: 500 });
  }
};
