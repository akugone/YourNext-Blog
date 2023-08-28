import Hint from '@models/hint';
import { connectToDB } from '@utils/database';

export const GET = async req => {
  try {
    await connectToDB();
    const hints = await Hint.find({}).populate('creator');

    return new Response(JSON.stringify(hints), { status: 201 });
  } catch (error) {
    return new Response('Failed to fetch the Hint', { status: 500 });
  }
};
