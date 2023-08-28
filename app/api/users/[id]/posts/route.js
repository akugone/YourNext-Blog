import Prompt from '@models/hint';
import { connectToDB } from '@utils/database';

export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const hints = await Prompt.find({ creator: params.id }).populate('creator');

    return new Response(JSON.stringify(hints), { status: 200 });
  } catch (error) {
    return new Response('Failed to fetch hints created by user', {
      status: 500,
    });
  }
};
