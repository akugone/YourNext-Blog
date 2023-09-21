import { NextResponse } from 'next/server';
import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/app/libs/prismadb';
import { z } from 'zod';

export const POST = async (request: Request) => {
  let currentUser;
  try {
    currentUser = await getCurrentUser();
  } catch (error) {
    console.error('Error getting user:', error);
    return NextResponse.error();
  }

  if (!currentUser) {
    return NextResponse.error();
  }

  try {
    const { hint, tag } = await request.json();
    if (!hint || !tag) {
      return NextResponse.json('Missing hint or tag', { status: 400 });
    }

    const hintSchema = z.object({
      hint: z.string().min(1).max(255),
      tag: z.string().min(1).max(255),
    });

    hintSchema.parse({ hint, tag });

    const dataMapped = {
      hint: hint,
      tags: tag,
      author: { connect: { id: currentUser.id } },
    };

    const newHint = await prisma.hint.create({
      data: dataMapped,
    });

    return NextResponse.json(newHint, { status: 201 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json('Failed to create a new Hint', { status: 500 });
  }
};
