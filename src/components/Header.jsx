import { useEffect, useRef, useState } from 'react';
import { OPTIONS } from '../utils/contants';
import useScrollPostion from '../hooks/useScrollPostion';
import useDebounce from '../hooks/useDebounce';
import IconSearch from './ReactSVG/IconSearch';
import IconBell from './ReactSVG/IconBell';
import IconUserAstronaut from './ReactSVG/IconUserAstronaut';
import Card from './Card';
import { Link } from 'react-router-dom';

const Header = () => {
  const scroll = useScrollPostion();
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const inputRef = useRef(null);
  const debounceTimer = useRef(null);

  useEffect(() => {
    if (inputValue.trim()) {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
      debounceTimer.current = setTimeout(() => {
        fetch(
          'https://api.themoviedb.org/3/search/movie?query=' + inputValue,
          OPTIONS
        )
          .then(response => response.json())
          .then(response => setSearchResult(response.results))
          .catch(err => console.error(err));
      }, 500);
    } else setSearchResult([]);

    return () => {
      clearTimeout(debounceTimer.current);
    };
  }, [inputValue]);
  return (
    <div className=" text-white w-full z-50 fixed">
      <header
        className={
          'flex items-center px-4 py-2 transition-all duration-200 ease-in ' +
          `${scroll || searchResult.length ? 'bg-black' : ''}`
        }
      >
        <Link to={'/'} className="text-2xl font-bold text-red-600 uppercase">
          Netflix
        </Link>
        <div className="flex justify-between w-full mx-4">
          <ul className="flex gap-4 justify-around capitalize items-center">
            <li>Home</li>
            <li>movies</li>
            <li>TV</li>
            <li>new and popular</li>
          </ul>
          <ul className="flex gap-4 justify-around">
            <li className="flex">
              <input
                ref={inputRef}
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                className={`${
                  showInput ? 'scale-x-100 border border-white' : 'scale-x-0'
                } transition-transform duration-200 ease-out  bg-inherit text-white px-2 outline-none rounded`}
                onBlur={e => {
                  if (!e.target.value) setShowInput(p => !p);
                }}
              />
              {!showInput && (
                <IconSearch
                  className="mt-1 h-6 w-6"
                  onClick={() => {
                    setShowInput(p => !p);
                    if (inputRef) inputRef.current.focus();
                  }}
                />
              )}
            </li>
            {/* onclick open input and on blur and if input is empty show icon */}
            <li>
              <IconBell className="mt-1 h-5 w-5" />
            </li>
            <li>
              <IconUserAstronaut className="mt-1 h-6 w-6" />
            </li>
          </ul>
        </div>
      </header>
      {searchResult && (
        <div className="flex flex-wrap justify-center bg-black gap-y-4">
          {searchResult.map(data => {
            if (data.backdrop_path)
              return (
                <Card
                  name={data.title}
                  img={data?.backdrop_path}
                  key={data.id}
                  id={data.id}
                  className="w-80 overflow-hidden"
                />
              );
          })}
        </div>
      )}
    </div>
  );
};

export default Header;
