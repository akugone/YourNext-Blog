'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Form from '@components/Form';

const CreateHint = () => {
  const router = useRouter();
  const [submitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState({ hint: '', tag: '' });

  const createHint = async e => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/hint/new', {
        method: 'POST',
        body: JSON.stringify({
          hint: post.hint,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push('/');
      }
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
