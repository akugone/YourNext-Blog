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
const findHintData = async (id: string): Promise<HintWithAuthor> => {
  const response = await fetch(`${resource}/${id}`, {
    method: 'GET',
  });
  return await response.json();
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

// update a hint in the database with the route api/hint/update
export const update = async (id: string, hint: string, tag: string) => {
  console.log(id, hint, tag);

  const response = await fetch(`${resource}/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({
      hint: hint,
      tag: tag,
    }),
  });

  console.log(response.status);

  if (response.status != 200) {
    throw new Error('Failed to update hint');
  }

  return await response.json();
};

// delete a hint in the database with the route api/hint/delete
export const deleteHint = async (id: string) => {
  const response = await fetch(`${resource}/${id}`, {
    method: 'DELETE',
  });

  console.log(response.status);

  return await response.json();
};

const HintApiRepository = {
  findAll: findAll,
  findHintData: findHintData,
  create: create,
  deleteHint: deleteHint,
  findUserHints: findUserHints,
  update: update,
};

export default HintApiRepository;
