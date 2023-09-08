import Hint from '@/models/hint';
import type { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';

export const GET = async (req: NextApiRequest) => {
  // try {
  //   await connectToDB();
  //   const hints = await Hint.find({}).populate('creator');
  //   return NextResponse.json(hints, { status: 200 });
  // } catch (error) {
  //   return NextResponse.json('Failed to fetch the Hint', { status: 500 });
  // }
};
