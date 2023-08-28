'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import Form from '@components/Form';

const UpdateHint = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const hintId = searchParams.get('id');

  const [post, setPost] = useState({ hint: '', tag: '' });
  const [submitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const getHintDetails = async () => {
      const response = await fetch(`/api/hint/${hintId}`);
      const data = await response.json();

      setPost({
        hint: data.hint,
        tag: data.tag,
      });
    };

    if (hintId) getHintDetails();
  }, [hintId]);

  const updateHint = async e => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!hintId) return alert('Missing HintId!');

    try {
      const response = await fetch(`/api/hint/${hintId}`, {
        method: 'PATCH',
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
      type='Edit'
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updateHint}
    />
  );
};

export default UpdateHint;
