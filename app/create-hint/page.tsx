'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Form from '@/components/Form';
import HintApiRepository from '@/utils/HintApiRepository';

// @note i would use Hint from prisma client typing but the id is mandatory, do i need to create a new type for this? with Ommit?
const CreateHint = () => {
  const router = useRouter();
  const [submitting, setIsSubmitting] = useState<boolean>(false);
  const [post, setPost] = useState({ hint: '', tag: '' });

  const createHint = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // TODO security breach the userId should no be handle by the client

    try {
      await HintApiRepository.create(post.hint, post.tag);

      router.push('/');
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form
      type='Create'
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createHint}
    />
  );
};

export default CreateHint;
