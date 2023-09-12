'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Profile from '@/components/Profile';
import HintApiRepository from '@/utils/HintApiRepository';

interface UserProfileProps {
  params: {
    id: string;
  };
}

const UserProfile = ({ params }: UserProfileProps) => {
  const searchParams = useSearchParams();
  const userName = searchParams.get('name');

  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const data = await HintApiRepository.findUserPosts(params.id);
      setUserPosts(data);
    };

    if (params?.id) fetchPosts();
  }, [params.id]);

  return (
    <Profile
      name={userName}
      desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional hints and be inspired by the power of their imagination`}
      data={userPosts}
    />
  );
};

export default UserProfile;
