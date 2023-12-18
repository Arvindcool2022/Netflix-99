import Skeleton from 'react-loading-skeleton';

const Shimmer = () => {
  return (
    <>
      <Skeleton className="w-52 py-2 bg-stone-500 mb-3" />
      <div className="flex overflow-hidden gap-4 mb-4">
        {[...Array(4).keys()].map(x => (
          <div className="bg-stone-500 animate-pulse h-48 w-full" />
        ))}
      </div>
    </>
  );
};

export default Shimmer;
