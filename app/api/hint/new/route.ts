import { NextResponse } from 'next/server';
import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/app/libs/prismadb';
import { z } from 'zod';

export const POST = async (request: Request) => {
  try {
    const currentUser = await getCurrentUser();

    // VALIDATION
    if (!currentUser) {
      return NextResponse.error();
    }

    const { hint, tag } = await request.json();

    if (!hint || !tag) {
      return NextResponse.json('Missing hint or tag', { status: 400 });
    }

    // using zod for the validation
    const hintSchema = z.object({
      hint: z.coerce.string().min(1).max(255),
      tag: z.coerce.string().min(1).max(255),
    });

    hintSchema.parse({ hint, tag });

    // MAPPING
    const dataMapped = {
      hint: hint,
      tags: tag,
      author: { connect: { id: currentUser?.id } },
    };

    // PERSISTENCE
    const newHint = await prisma.hint.create({
      data: dataMapped,
    });

    return NextResponse.json(newHint, { status: 201 });
  } catch (error) {
    console.error('Prisma Error: ', error);
    return NextResponse.json('Failed to create a new Hint', { status: 500 });
  }
};
