import { useEffect } from 'react';
import { OPTIONS } from './utils/contants';

function App() {
  useEffect(() => {
    fetch(
      'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1',
      OPTIONS
    )
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(err => console.error(err));

    //# images
    // fetch(
    //   'https://api.themoviedb.org/3/collection/collection_id/images',
    //   options
    // )
    //   .then(response => response.json())
    //   .then(response => console.log(response))
    //   .catch(err => console.error(err));
  }, []);

  return <div></div>;
}

export default App;
