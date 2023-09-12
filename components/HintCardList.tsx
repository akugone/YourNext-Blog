import HintCard from './HintCard';
import { HintWithAuthor } from '@/utils/HintApiRepository';

interface HintCardListProps {
  data: HintWithAuthor[];
  handleTagClick?: (tag: string) => void;
}

const HintCardList = ({ data, handleTagClick }: HintCardListProps) => {
  return (
    <div className='mt-16 hint_layout'>
      {data.map(post => (
        <HintCard key={post.id} post={post} handleTagClick={handleTagClick} />
      ))}
    </div>
  );
};

export default HintCardList;
