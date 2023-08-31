'use client';

import { useState, useEffect } from 'react';
import HintCardList from './HintCardList';

const Feed = () => {
  //store all posts
  const [allPosts, setAllPosts] = useState([]);

  // Search states
  const [searchText, setSearchText] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  // Get all the posts from the database
  const fetchPosts = async () => {
    const response = await fetch('/api/hint');
    console.log(response);
    const data = await response.json();

    // then store the data in the allPosts
    setAllPosts(data);
  };

  // fetch all posts when the component is mounted
  useEffect(() => {
    fetchPosts();
  }, []);

  /**
   * Filters the posts based on the search text.
   * @param {string} searchtext - The text to search for.
   * @returns {Array} - An array of posts that match the search text.
   */
  const filterHints = searchtext => {
    const regex = new RegExp(searchtext, 'i'); // 'i' flag for case-insensitive search
    return allPosts.filter(
      item =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.hint),
    );
  };

  /**
   * Handles the change event of the search input field.
   * @param {Object} e - The event object.
   */
  const handleSearchChange = e => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterHints(e.target.value);
        setSearchedResults(searchResult);
      }, 500),
    );
  };

  const handleTagClick = tagName => {
    setSearchText(tagName);

    const searchResult = filterHints(tagName);
    setSearchedResults(searchResult);
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

      {/* All Hints */}
      {searchText ? (
        <HintCardList data={searchedResults} handleTagClick={handleTagClick} />
      ) : (
        <HintCardList data={allPosts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;
