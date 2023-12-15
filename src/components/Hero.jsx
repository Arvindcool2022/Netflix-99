import { useEffect, useState } from 'react';
import { OPTIONS } from '../utils/contants';

const Hero = () => {
  const [data, setData] = useState({});
  useEffect(() => {
    fetch(
      'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1',
      OPTIONS
    )
      .then(response => response.json())
      .then(res => setData(res.results[Math.floor(Math.random() * 20)]))
      .catch(err => console.error(err));
  }, []);

  if (!data.backdrop_path) return null;

  return (
    <div className={'h-[90vh] text-white relative '}>
      <div className="absolute -z-10 left-0 -top-13 right-0 bottom-0 bg-black bg-opacity-50">
        <img
          src={`https://image.tmdb.org/t/p/original${data?.backdrop_path}`}
          className="object-cover mix-blend-darken"
        />
      </div>
      <div className="pt-[40vh] w-1/2 ps-4 font-medium text-lg ">
        <h1 className="text-3xl font-bold mb-4">{data.title}</h1>
        <p className="mb-4">{data.overview}</p>
        <div className="">
          <button className="me-4 px-12 py-2 rounded bg-white text-black">
            Play
          </button>
          <button className="me-4 px-12 py-2 rounded bg-gray-600 bg-opacity-75">
            More Info
          </button>
        </div>
        <div className="absolute right-0 px-2 border-l-2 border-white bg-gray-600 bg-opacity-75">
          13+
        </div>
      </div>
    </div>
  );
};

export default Hero;

// todo: fetch('https://api.themoviedb.org/3/movie/{movieID}?language=en-US', OPTIONS).then(response => response.json()).then(response => console.log(response)).catch(err => console.error(err))
