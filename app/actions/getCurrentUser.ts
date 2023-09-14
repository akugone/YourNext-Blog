import { getServerSession } from 'next-auth/next';
import { User } from '@prisma/client';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/app/libs/prismadb';

/**
 * Retrieves the current user session from the server session.
 */
export async function getSession() {
  return await getServerSession(authOptions);
}

/**
 * Retrieves the current user from the session and returns their information.
 */
export default async function getCurrentUser() {
  try {
    const session = await getSession();
    const user = session?.user as User | undefined;

    console.log('you', session);

    const currentUser = await prisma.user.findUnique({
      where: {
        id: user?.id,
      },
    });

    if (!currentUser) {
      return null;
    }

    return {
      ...currentUser,
      createdAt: currentUser.createdAt?.toISOString() || null,
      updatedAt: currentUser.updatedAt?.toISOString() || null,
      emailVerified: currentUser.emailVerified?.toISOString() || null,
    };
  } catch (error: any) {
    return null;
  }
}
