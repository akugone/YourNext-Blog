'use client';

import { useState, useEffect } from 'react';
import HintCardList from './HintCardList';
import HintApiRepository, { HintWithAuthor } from '@/utils/HintApiRepository';
import { useDebounce } from '@/app/hooks/useDebounce';

const Feed = () => {
  const [allPosts, setAllPosts] = useState<HintWithAuthor[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<HintWithAuthor[]>([]);
  const [searchText, setSearchText] = useState<string>('');

  useEffect(() => {
    async function fetchHints() {
      const data = await HintApiRepository.findAll();
      setAllPosts(data);
      setFilteredPosts(data);
    }
    fetchHints();
  }, []);

  const filterHints = useDebounce((searchtext: string) => {
    const regex = new RegExp(searchtext, 'i');
    const filtered = allPosts.filter(
      item =>
        regex.test(item.author.name) ||
        (item.tags && regex.test(item.tags)) ||
        regex.test(item.hint),
    );
    setFilteredPosts(filtered);
  }, 200);

  useEffect(() => {
    filterHints(searchText);
  }, [searchText, allPosts]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleTagClick = (tagName: string) => {
    setSearchText(tagName);
  };

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type='text'
          placeholder='Search for a tag or a username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>
      <HintCardList data={filteredPosts} handleTagClick={handleTagClick} />
    </section>
  );
};

export default Feed;
