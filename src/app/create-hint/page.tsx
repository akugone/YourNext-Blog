'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Form from '@/components/Form';
import HintApiRepository from '@/utils/HintApiRepository';

interface CreateHintProps {
  hint: string;
  tag: string;
}

const CreateHint = () => {
  const router = useRouter();
  const [submitting, setIsSubmitting] = useState<boolean>(false);
  const [post, setPost] = useState<CreateHintProps>({ hint: '', tag: '' });

  const createHint = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

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
