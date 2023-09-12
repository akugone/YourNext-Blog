'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Form from '@/components/Form';
import HintApiRepository from '@/utils/HintApiRepository';

const CreateHint = () => {
  const router = useRouter();
  const [submitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState({ hint: '', tag: '' });

  const createHint = async e => {
    e.preventDefault();
    setIsSubmitting(true);

    // TODO security breach the userId should no be handle by the client

    try {
      const response = await HintApiRepository.create(post.hint, post.tag);
      console.log(response);

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
