import HintCard from './HintCard';

interface ProfileProps {
  name: string | null;
  desc: string | null;
  data: any[];
  handleEdit?: (post: any) => void;
  handleDelete?: (post: any) => void;
}

const Profile = ({
  name,
  desc,
  data,
  handleEdit,
  handleDelete,
}: ProfileProps) => {
  return (
    <section className='w-full'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>{name} Profile</span>
      </h1>
      <p className='desc text-left'>{desc}</p>

      <div className='mt-10 hint_layout'>
        {data.map(post => (
          <HintCard
            key={post._id}
            post={post}
            handleEdit={() => handleEdit && handleEdit(post)}
            handleDelete={() => handleDelete && handleDelete(post)}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;
