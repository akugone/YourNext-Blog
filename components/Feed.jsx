'use client';

import { useState, useEffect } from 'react';
import HintCard from '@components/HintCard';

const HintCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 hint_layout'>
      {data.map(post => (
        <HintCard key={post._id} post={post} handleTagClick={handleTagClick} />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [posts, setAllPosts] = useState([]);
  console.log(searchText);

  const handSearchChange = e => {
    setSearchText(e.target.value);
  };

  const fetchPosts = async () => {
    const response = await fetch('/api/hint');
    const data = await response.json();
    setAllPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type='text'
          placeholder='search you tips'
          onChange={handSearchChange}
          value={searchText}
          className='search_input peer '
        />
      </form>
      <HintCardList data={posts} handletagClick={() => {}} />
    </section>
  );
};

export default Feed;
