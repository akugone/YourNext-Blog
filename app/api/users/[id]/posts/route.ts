import Hint from '@/models/hint';
import type { NextApiRequest } from 'next';
import { connectToDB } from '@/utils/database';
import { NextResponse } from 'next/server';

interface Params {
  id: string;
}

export const GET = async (request: NextApiRequest, { params }) => {
  try {
    await connectToDB();

    const hints = await Hint.find({ creator: params.id }).populate('creator');

    return NextResponse.json(hints, { status: 200 });
  } catch (error) {
    return NextResponse.json('Failed to fetch hints created by user', {
      status: 500,
    });
  }
};
