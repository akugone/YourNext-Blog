import HintCard from './HintCard';

interface HintCardListProps {
  data: any[];
  handleTagClick?: (tag: string) => void;
}

const HintCardList = ({ data, handleTagClick }: HintCardListProps) => {
  return (
    <div className='mt-16 hint_layout'>
      {data.map(post => (
        <HintCard key={post._id} post={post} handleTagClick={handleTagClick} />
      ))}
    </div>
  );
};

export default HintCardList;
