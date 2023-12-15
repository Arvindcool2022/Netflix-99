import { useEffect, useState } from 'react';
import { OPTIONS } from '../utils/contants';
import Carousel from './Carousel';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
const settings = {
  dots: false,
  lazyLoad: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  initialSlide: 0,

  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        dots: false
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        initialSlide: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
};

const ContentContainer = () => {
  const [popularData, setPopularData] = useState([]);
  const [nowData, setNowData] = useState([]);
  const [topData, setTopData] = useState([]);
  const [UpcomingData, setUpcomingData] = useState([]);

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
      .then(response => setUpcomingData(response.results))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-3">
      <h1 className="text-2xl mb-2 font-bold capitalize">popular movies</h1>
      <Slider {...settings}>
        {popularData.map(data => (
          <Carousel name={data.title} img={data.backdrop_path} key={data.id} />
        ))}
      </Slider>
      <h1 className="text-2xl mb-2 font-bold capitalize">top-rated movies</h1>
      <Slider {...settings}>
        {topData.map(data => (
          <Carousel name={data.title} img={data.backdrop_path} key={data.id} />
        ))}
      </Slider>
      <h1 className="text-2xl mb-2 font-bold capitalize">upcoming movies</h1>
      <Slider {...settings}>
        {UpcomingData.map(data => (
          <Carousel name={data.title} img={data.backdrop_path} key={data.id} />
        ))}
      </Slider>
      <h1 className="text-2xl mb-2 font-bold capitalize">global nominees</h1>
      <Slider {...settings}>
        {nowData.map(data => (
          <Carousel name={data.title} img={data.backdrop_path} key={data.id} />
        ))}
      </Slider>
    </div>
  );
};

export default ContentContainer;
