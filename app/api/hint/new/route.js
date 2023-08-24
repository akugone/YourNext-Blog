// pages/api/hints.js

import Hint from '@models/hint';
import { connectToDB } from '@utils/database';

export const POST = async req => {
  const { hint, tag } = await req.json();

  if (!hint || !tag) {
    throw new Error('hint or tag is missing from the request body');
  }

  try {
    await connectToDB();

    const newHint = new Hint({
      creator: userId,
      hint: hint,
      tag: tag,
    });

    await newHint.save();
    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    return new Response('Failed to create a new prompt', { status: 500 });
  }
};
