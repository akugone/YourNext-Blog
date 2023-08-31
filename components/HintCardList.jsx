import React from 'react';
import HintCard from './HintCard';

const HintCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 hint_layout'>
      {data.map(post => (
        <HintCard key={post._id} post={post} handleTagClick={handleTagClick} />
      ))}
    </div>
  );
};

export default HintCardList;
