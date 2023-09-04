import Hint from '@/models/hint';
import { connectToDB } from '@/utils/database';
import { authOptions } from '../../auth/[...nextauth]/route';
import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';
import { NextApiRequest } from 'next';

export const POST = async (req: NextApiRequest) => {
  const { userId, hint, tag } = await req.json();
  const session = await getServerSession(authOptions);

  try {
    await connectToDB();
    const newHint = new Hint({
      creator: userId,
      hint: hint,
      tag: tag,
    });

    await newHint.save();

    return NextResponse.json(newHint, { status: 201 });
  } catch (error) {
    return NextResponse.json('Failed to create a new Hint', { status: 500 });
  }
};
