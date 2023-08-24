'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
// import { useSession } from 'next-auth/react';
import Form from '@components/Form';

const CreateHint = () => {
  const router = useRouter();
  const [submitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState({ hint: '', tag: '' });
  // const { data: session } = useSession();

  const createHint = async e => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/hint/new', {
        method: 'POST',
        body: JSON.stringify({
          hint: post.hint,
          // userId: session?.user.id,
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
