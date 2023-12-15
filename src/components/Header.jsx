import { useEffect } from 'react';
import { OPTIONS } from '../utils/contants';
import useScrollPostion from '../hooks/useScrollPostion';

const Header = () => {
  const scroll = useScrollPostion();

  useEffect(() => {
    fetch('https://api.themoviedb.org/3/search/movie?query=' + 'king', OPTIONS)
      .then(response => response.json())
      .then(response => console.log(response.results))
      .catch(err => console.error(err));
  }, []);
  return (
    <header
      className={
        'flex items-center px-4 text-white w-full z-50 transition-all duration-200 ease-in fixed ' +
        `${!scroll ? '' : 'bg-black'}`
      }
    >
      <p className="text-2xl font-bold text-red-600">Netflix</p>
      <div className="flex justify-between w-full mx-4">
        <ul className="flex gap-4 justify-around">
          <li>Home</li>
          <li>movies</li>
          <li>tv</li>
          <li>new and popular</li>
        </ul>
        <ul className="flex gap-4 justify-around">
          <li>icon</li>
          {/* onclick open input and on blur and if input is empty show icon */}
          <li>bell icon</li>
          <li>profile</li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
