import { useState, useEffect } from 'react';

const useScrollPostion = (truePostion = false) => {
  const [scroll, setScroll] = useState(0);
  const [scrolledDown, setScrolledDown] = useState(false);
  const handleScroll = () => {
    setScroll(window?.scrollY);
    console.log(scroll);
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (scroll > 150) setScrolledDown(true);
    else if (scrolledDown) setScrolledDown(false);
  }, [scroll]);

  if (truePostion) return scroll;

  return scrolledDown;
};

export default useScrollPostion;
