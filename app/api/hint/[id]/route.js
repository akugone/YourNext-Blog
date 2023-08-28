import Hint from '@models/hint';
import { connectToDB } from '@utils/database';

export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const hint = await Hint.findById(params.id).populate('creator');
    if (!hint) return new Response('hint Not Found', { status: 404 });

    return new Response(JSON.stringify(hint), { status: 200 });
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 });
  }
};

export const PATCH = async (request, { params }) => {
  const { hint, tag } = await request.json();

  try {
    await connectToDB();

    // Find the existing hint by ID
    const existingHint = await Hint.findById(params.id);

    if (!existingHint) {
      return new Response('Hint not found', { status: 404 });
    }

    // Update the hint with new data
    existingHint.hint = hint;
    existingHint.tag = tag;

    await existingHint.save();

    return new Response('Successfully updated the Hints', { status: 200 });
  } catch (error) {
    return new Response('Error Updating Hint', { status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();

    // Find the hint by ID and remove it
    await Hint.findByIdAndRemove(params.id);

    return new Response('HInt deleted successfully', { status: 200 });
  } catch (error) {
    return new Response('Error deleting hint', { status: 500 });
  }
};
