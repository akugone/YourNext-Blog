import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';

export const GET = async (request, { params }) => {
  try {
    const { id } = params;
    const data = await prisma.hint.findUnique({
      where: {
        id: id,
      },
      include: {
        author: true, // This is a relation, so you can include it
      },
    });

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.log(error);

    return NextResponse.json('Internal Server Error', { status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  try {
    const { id } = params;
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

export const PATCH = async (request, { params }) => {
  try {
    const { id } = params;
    const res = await request.json();

    if (!res.hint || !res.tag) {
      return NextResponse.json('Missing hint or tag', { status: 400 });
    }

    console.log(res);

    const data = await prisma.hint.update({
      where: {
        id: id,
      },
      data: {
        hint: res.hint || '',
        tags: res.tag || undefined,
      },
    });

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json('Internal Server Error', { status: 500 });
  }
};
