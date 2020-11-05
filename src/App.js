import React, { useState, useEffect } from 'react';
import Movie from './components/movie';

const Future_API =
  'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1';
const SEARCH_API =
  'https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=';

const App = () => {
  const [movies, setmovies] = useState([]);
  const [searchItem, setSearchItem] = useState('');
  useEffect(() => {
    getMovies(Future_API);
    // fetch(Future_API)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log(data);
    //     setmovies(data.results);
    //   });
  }, []);
  const getMovies = (API) => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setmovies(data.results);
      });
  };
  const handleOnsubmit = (e) => {
    e.preventDefault();
    if (searchItem) {
      getMovies(SEARCH_API + searchItem);
      // fetch(SEARCH_API + searchItem)
      //   .then((res) => res.json())
      //   .then((data) => {
      //     console.log(data);
      //     setmovies(data.results);
      //   });
      setSearchItem('');
    }
  };
  const handleChange = (event) => {
    setSearchItem(event.target.value);
  };
  return (
    <>
      <header>
        <form onSubmit={handleOnsubmit}>
          <input
            className="search"
            type="search"
            onChange={handleChange}
            value={searchItem}
            placeholder="Search..."
          />
        </form>
      </header>
      <div className="movie-container">
        {movies.length > 0 &&
          movies.map((movie) => <Movie key={movie.id} {...movie} />)}
      </div>
    </>
  );
};

export default App;
