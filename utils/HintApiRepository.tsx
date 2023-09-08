const resource = '/api/hint';
import type { Hint, User } from '@prisma/client';

export type HintWithAuthor = Hint & {
  author: User;
};

// Get all the posts from the database
const findAll = async (): Promise<HintWithAuthor[]> => {
  const response = await fetch(resource);
  const data = await response.json();

  // then store the data in the allPosts
  return data;
};

// Get all the posts from the database
const findUnique = async (hintId: string): Promise<HintWithAuthor> => {
  const response = await fetch(`${resource}/${hintId}`);
  const data = await response.json();

  // then store the data in the allPosts
  return data;
};

const HintApiRepository = {
  findAll: findAll,
  findUnique: findUnique,
};

export default HintApiRepository;
