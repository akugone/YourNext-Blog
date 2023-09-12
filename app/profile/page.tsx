'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import Profile from '@/components/Profile';
import { IPost } from '@/app/types';
import HintApiRepository from '@/utils/HintApiRepository';

const MyProfile = () => {
  const router = useRouter();

  // we get in the session the user data session.user.email / session.user.image / session.user.name / session.user.id
  const { data: session } = useSession();

  const [myPosts, setMyPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await HintApiRepository.findUserHints(session.user.id);
      setMyPosts(response);
    };

    if (session?.user?.id) fetchPosts();
  }, [session?.user?.id]);

  const handleEdit = (post: IPost) => {
    router.push(`/update-hint?id=${post._id}`);
  };

  const handleDelete = async (post: IPost) => {
    const hasConfirmed = confirm('Are you sure you want to delete this hint?');

    if (hasConfirmed) {
      try {
        await fetch(`/api/hint/${post._id?.toString()}`, {
          method: 'DELETE',
        });

        const filteredPosts = myPosts.filter(item => item._id !== post._id);

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
