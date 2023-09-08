import type { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';

interface Params {
  id: string;
}

export const GET = async (request: NextApiRequest) => {
  try {
    const params = request.query.id as string;
    const user = await prisma.user.findUnique({ where: { id: params } });

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json('Failed to fetch the Hint', { status: 500 });
  }
};
