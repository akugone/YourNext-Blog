import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';

export const GET = async () => {
  try {
    // use Prisma to find the user post
    const data = await prisma.hint.findUnique;

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json('Internal Server Error', { status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  const { id } = params;
  console.log('PUTAINNNN', id);

  try {
    // delete a user hint
    const data = await prisma.hint.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json('Internal Server Error', { status: 500 });
  }
};
