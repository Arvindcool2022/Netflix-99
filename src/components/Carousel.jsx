import React from 'react';
import Card from './Card';
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

const Carousel = ({ data, title }) => {
  return (
    <>
      <h1 className="text-2xl mb-2 font-bold capitalize">{title}</h1>
      <Slider {...settings}>
        {data.map(data => (
          <Card
            name={data.title}
            img={data.backdrop_path}
            key={data.id}
            id={data.id}
          />
        ))}
      </Slider>
    </>
  );
};

export default Carousel;
