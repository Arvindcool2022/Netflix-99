import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ name, img, className = '', id }) => {
  const URL = img
    ? `https://image.tmdb.org/t/p/original${img}`
    : 'https://img.freepik.com/premium-vector/no-symbol-circle-prohibition-red-stop-sign-no-entry-symbol_532867-433.jpg?w=740';
  return (
    <Link to={'/details/' + id}>
      <div className={`h-52 relative me-3 ${className}`}>
        <p className="absolute text-white bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent text-center  font-medium">
          {name}
        </p>
        <img className="object-cover" src={URL} />
      </div>
    </Link>
  );
};

export default Card;
