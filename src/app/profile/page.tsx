'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Hint, Session } from '@prisma/client';

import Profile from '@/components/Profile';
import HintApiRepository from '@/utils/HintApiRepository';

const MyProfile = () => {
  const router = useRouter();

  // we get in the session the user data session.user.email / session.user.image / session.user.name / session.user.id
  const { data: session } = useSession();
  const [myPosts, setMyPosts] = useState<Hint[]>([]);

  useEffect(() => {
    if (!session?.user) {
      return;
    }

    const fetchPosts = async () => {
      const response = await HintApiRepository.findUserHints(session.user.id);
      setMyPosts(response);
    };

    fetchPosts();
  }, [session?.user?.id]);

  const handleEdit = (post: Hint) => {
    router.push(`/update-hint?id=${post.id}`);
  };

  const handleDelete = async (post: Hint) => {
    const hasConfirmed = confirm('Are you sure you want to delete this hint?');

    if (hasConfirmed) {
      try {
        await HintApiRepository.deleteHint(post.id);

        const filteredPosts = myPosts.filter(item => item.id !== post.id);

        setMyPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Profile
      name='My'
      desc='Welcome to your personalized profile page. Share your exceptional hints and inspire others with the power of your imagination'
      data={myPosts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
