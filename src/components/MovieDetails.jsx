import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { OPTIONS } from '../utils/contants';
import Skeleton from 'react-loading-skeleton';

const MovieDetails = () => {
  const [movieData, setMovieData] = useState({});
  const [videoData, setVideoData] = useState({});
  const { id } = useParams();
  console.log(movieData, videoData);
  useEffect(() => {
    if (id) {
      fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, OPTIONS)
        .then(response => response.json())
        .then(response => setMovieData(response))
        .catch(err => console.error(err));

      fetch(
        `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
        OPTIONS
      )
        .then(response => response.json())
        .then(response => setVideoData(response?.results[0]))
        .catch(err => console.error(err));
    }
  }, [id]);

  return (
    <section className="pt-12 mx-auto max-w-6xl">
      <div className="flex justify-between pb-4">
        <div>
          <div className="pb-2">
            <h1 className="text-4xl font-bold">
              {movieData.title || (
                <Skeleton
                  enableAnimation={false}
                  className="bg-stone-500 animate-pulse"
                />
              )}
            </h1>
            <p className="font-medium text-stone-800">
              {movieData.tagline || (
                <Skeleton
                  enableAnimation={false}
                  className="bg-stone-500 animate-pulse"
                />
              )}
            </p>
          </div>
          <div className="flex gap-3">
            {movieData.runtime ? (
              <p>Duration: {calcTime(movieData.runtime)}</p>
            ) : (
              <Skeleton
                enableAnimation={false}
                className="bg-stone-500 animate-pulse"
              />
            )}
            {movieData.release_date ? (
              <p>Release Date: {movieData.release_date}</p>
            ) : (
              <Skeleton
                enableAnimation={false}
                className="bg-stone-500 animate-pulse"
              />
            )}
          </div>
        </div>
        <ul className="flex gap-3 items-center ">
          {movieData.genres &&
            movieData?.genres.map(item => (
              <li
                className="border px-3 py-1 rounded-full text-sm border-black"
                key={item.id}
              >
                {item.name}
              </li>
            ))}
        </ul>
      </div>
      <div className="flex gap-1">
        {movieData.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/original${movieData?.poster_path}`}
            alt={`${movieData.original_title} poster`}
            className="max-h-[430px]"
          />
        ) : (
          <div className="h-[430px] w-72 bg-black animate-pulse" />
        )}
        <div className="relative w-2/3 overflow-hidden pb-[28.125%]">
          <iframe
            className="absolute w-full h-full left-0 top-0"
            src={`https://www.youtube.com/embed/${videoData.key}?autoplay=1&mute=1`}
            allowFullScreen
          ></iframe>
        </div>
        <div>
          <h2 className="text-lg font-medium text-stone-800">Rating</h2>
          {!movieData.vote_average && <p>'unknown'/10 </p>}
          {movieData.vote_average && (
            <p className=" font-semibold text-2xl">
              {movieData.vote_average.toFixed(2)}/10
            </p>
          )}
          {movieData.vote_count && (
            <p className="text-stone-600 font-medium">
              {formatNumber(movieData.vote_count)} votes
            </p>
          )}
        </div>
      </div>
      <p className="mt-4">
        {movieData.overview || (
          <Skeleton
            enableAnimation={false}
            className="bg-stone-500 animate-pulse"
          />
        )}
      </p>
      <div className="flex w-full justify-center mt-8">
        <Link
          className="border-2 px-3 py-1 rounded-full  border-blue-600 text-blue-600 font-semibold"
          to={'/'}
        >
          Go home
        </Link>
      </div>
    </section>
  );
};

export default MovieDetails;

function calcTime(minutes) {
  if (isNaN(minutes) || minutes < 0) {
    return 'Invalid input';
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (hours === 0) {
    return `${remainingMinutes}m`;
  } else if (remainingMinutes === 0) {
    return `${hours}h`;
  } else {
    return `${hours}h ${remainingMinutes}m`;
  }
}

function formatNumber(num) {
  if (isNaN(num)) {
    return 'Invalid input';
  }

  if (num < 1000) {
    return num.toString();
  } else if (num < 1000000) {
    return (num / 1000).toFixed(2) + 'k';
  } else {
    return (num / 1000000).toFixed(2) + 'M';
  }
}

/**
 * Here are the keys for the provided data:

- adult
- backdrop_path
- genres
  - id
  - name
- id
- imdb_id
- original_language
- original_title
- overview
- popularity
- poster_path
- release_date
- runtime
- spoken_languages
  - english_name
  - iso_639_1
  - name
- status
- tagline
- title
- vote_average
- vote_count

 */
