// pages/api/hints.js

import Hint from '@models/hint';
import { connectToDB } from '@utils/database';
import { getSession } from 'next-auth/react';
import { NextResponse } from 'next/server';

export const POST = async req => {
  const { hint, tag } = await req.json();
  const session = await getSession({ req });

  const userId = session.user.id;
  console.log('session', session);
  console.log('hint', hint);
  console.log('tag', tag);

  if (session) {
    // Signed in
    console.log('Session', JSON.stringify(session, null, 2));
  } else {
    // Not Signed in
    return NextResponse.json(401);
  }

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
    // Todo NextResponse.json(401)
    return new Response(JSON.stringify(newHint), { status: 201 });
  } catch (error) {
    return new Response('Failed to create a new Hint', { status: 500 });
  }
};
