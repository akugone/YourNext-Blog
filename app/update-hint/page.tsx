'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Form from '@/components/Form';
import HintApiRepository from '@/utils/HintApiRepository';

const UpdateHint = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const hintId = searchParams.get('id');

  const [post, setPost] = useState({ hint: '', tag: '' });
  const [submitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    const getHintDetails = async () => {
      if (!hintId) return;

      const res = await HintApiRepository.findHintData(hintId);

      console.log('response', res);

      console.log('update hint page', {
        hintId: hintId,
        post_hint: res.hint,
        post_tag: res.tags,
      });

      setPost({
        hint: res.hint || '',
        tag: res.tags || '',
      });
    };

    if (hintId) getHintDetails();
  }, [hintId]);

  const updateHint = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!hintId) return alert('Missing HintId!');

    try {
      await HintApiRepository.update(hintId as string, post.hint, post.tag);

      router.push('/');
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
