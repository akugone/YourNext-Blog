import Hint from '@models/hint';
import { connectToDB } from '@utils/database';
import { authOptions } from '../../auth/[...nextauth]/route';
import { getServerSession } from 'next-auth/next';

export const POST = async req => {
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

    return new Response(JSON.stringify(newHint), { status: 201 });
  } catch (error) {
    return new Response('Failed to create a new Hint', { status: 500 });
  }
};
