import Feed from '@/components/Feed';

const Home = () => {
  return (
    <section className='w-full flex-center flex-col'>
      <h1 className='head_text text-center'>
        Discover & Share <br className='max-md:hidden' />
        <span className='orange_gradient text-center'>Daily coding tips</span>
      </h1>
      <p className='desc text-center'>This project is a first version of WILT project</p>
      {/* <Feed /> */}
    </section>
  );
};

export default Home;
