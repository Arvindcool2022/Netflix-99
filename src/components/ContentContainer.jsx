import { useEffect, useState } from 'react';
import { OPTIONS } from '../utils/contants';
import Carousel from './Carousel';
import Shimmer from './Shimmer';

const ContentContainer = () => {
  const [popularData, setPopularData] = useState([]);
  const [nowData, setNowData] = useState([]);
  const [topData, setTopData] = useState([]);
  const [UpcomingData, setUpcomingData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(
      'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1',
      OPTIONS
    )
      .then(response => response.json())
      .then(res => setPopularData(res.results))
      .catch(err => console.error(err));

    fetch(
      'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1',
      OPTIONS
    )
      .then(response => response.json())
      .then(response => setNowData(response.results))
      .catch(err => console.error(err));

    fetch(
      'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1',
      OPTIONS
    )
      .then(response => response.json())
      .then(response => setTopData(response.results))
      .catch(err => console.error(err));

    fetch(
      'https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1',
      OPTIONS
    )
      .then(response => response.json())
      .then(response => {
        setUpcomingData(response.results);
        setIsLoading(false);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-3">
      {isLoading ? (
        [...Array(4).keys()].map(x => <Shimmer />)
      ) : (
        <>
          <Carousel data={popularData} title={'popular movies'} />
          <Carousel data={topData} title={'top-rated movies'} />
          <Carousel data={UpcomingData} title={'upcoming movies'} />
          <Carousel data={nowData} title={'global nominees'} />
        </>
      )}
    </div>
  );
};

export default ContentContainer;
