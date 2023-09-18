import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';

interface ParamsType {
  params: {
    id: string;
  };
}

export const GET = async (request: Request, { params }: ParamsType) => {
  console.log('GET', params);

  try {
    const { id } = params;
    const data = await prisma.hint.findUnique({
      where: {
        id: id,
      },
      include: {
        author: true,
      },
    });

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json('Internal Server Error', { status: 500 });
  }
};

export const DELETE = async (request: Request, { params }: ParamsType) => {
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

export const PATCH = async (request: Request, { params }: ParamsType) => {
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
