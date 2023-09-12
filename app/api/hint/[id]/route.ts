import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';

export const GET = async (request, { params }: any) => {
  try {
    // use Prisma to find the user post
    const data = await prisma.hint.findUnique;

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json('Internal Server Error', { status: 500 });
  }
};

export const PATCH = async (request, { params }) => {};

export const DELETE = async (request, { params }) => {};
