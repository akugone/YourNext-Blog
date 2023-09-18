'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Profile from '@/components/Profile';
import { Hint } from '@prisma/client';

interface UserProfileProps {
  params: {
    id: string;
  };
}

const UserProfile = ({ params }: UserProfileProps) => {
  const searchParams = useSearchParams();
  const userName = searchParams.get('name');
  const [userPosts, setUserPosts] = useState<Hint[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/user/${params?.id}/posts`);
      const data = await response.json();

      setUserPosts(data);
    };

    if (params?.id) fetchPosts();
  }, [params.id]);

  return (
    <Profile
      name={userName}
      desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination`}
      data={userPosts}
    />
  );
};

export default UserProfile;
