const resource = '/api/hint';
const resourceUser = '/api/user';

import type { Hint, User } from '@prisma/client';

export type HintWithAuthor = Hint & {
  author: User;
};

// Get all the posts from the database
const findAll = async (): Promise<HintWithAuthor[]> => {
  const response = await fetch(resource);
  const data = await response.json();

  return data;
};

// Get one post with his id
const findUnique = async (hintId: string): Promise<HintWithAuthor> => {
  const response = await fetch(`${resource}/${hintId}`);
  const data = await response.json();

  return data;
};

// find all the posts from one user
export const findUserHints = async (userId: string) => {
  const response = await fetch(`${resourceUser}/${userId}/posts`);
  const data = await response.json();

  return data;
};

// create a anew hint in the database with the route api/hint/new
export const create = async (hint: string, tag: string) => {
  const response = await fetch(`${resource}/new`, {
    method: 'POST',
    body: JSON.stringify({
      hint: hint,
      tag: tag,
    }),
  });

  if (response.status != 201) {
    throw new Error('Failed to create hint');
  }

  return await response.json();
};

// delete a hint in the database with the route api/hint/delete
export const deleteHint = async (hintId: string) => {
  const response = await fetch(`${resource}/${hintId}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    return response.json();
  }
};

const HintApiRepository = {
  findAll: findAll,
  findUnique: findUnique,
  create: create,
  deleteHint: deleteHint,
  findUserHints: findUserHints,
};

export default HintApiRepository;
