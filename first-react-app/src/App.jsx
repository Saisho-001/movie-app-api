import React, { useState, useEffect } from 'react';
import Search from '/src/components/Search.jsx';
import Loading from './components/Loading';
import Card from './components/card';

const App = () => {
  const[searchMovie, setSearchMovie] = useState('');

  const[errorMsg, setErrorMsg] = useState('');

  const[movieList, setMovieList] = useState([]);

  const[isLoading, setIsLoading] = useState(false);

  const [filteredMovies, setFilteredMovies] = useState([]);

const API_BASE_URL = 'https://imdb-top-100-movies.p.rapidapi.com/';
const API_KEY = import.meta.env.VITE_IMDB_API_KEY;
const API_OPTIONS ={ method: 'GET',
  headers: {
    'x-rapidapi-key': API_KEY,
    'x-rapidapi-host': 'imdb-top-100-movies.p.rapidapi.com',
    'Accept': 'application/json',
  }
}

const fetchMovies = async () => {
  setIsLoading(true);
  setErrorMsg('');

  try{
    const response = await fetch(API_BASE_URL, API_OPTIONS);

    if (!response.ok) {
      throw new Error(`Failed to fetch ${response.status}`);
    }

    const data = await response.json();
    
    if (data.response == 'false'){
      setErrorMsg(data.error || 'Failed to fetch movies');
      setMovieList([]);
      setFilteredMovies([]);
      return
    }
    setMovieList(data || []);
    setFilteredMovies(data || []);
  }
  catch(error){
    console.error(`Error fetching movies: ${error}`)
    setErrorMsg('Error fetching movies!!')
  }
  finally{
    setIsLoading(false)
  }
}
  useEffect(() => {
    fetchMovies();
  },[])

  useEffect(() => {
    const filtered = movieList.filter((movie) =>
      movie.title.toLowerCase().includes(searchMovie.toLowerCase())
    );
    setFilteredMovies(filtered);
  }, [searchMovie, movieList]);

  return (
    <main>
      <div className='pattern' />

      <div className='wrapper'>
        <header>
          <img className='max-w-[600px] w-full max-h-[300px] object-cover' src="/movies.jpg" alt="Movie banner" /><br />
        <h1>Find <span className='text-gradient'>Movies</span> You'll Enjoy</h1>

        <Search searchMovie={searchMovie} setSearchMovie={setSearchMovie}/>
        </header>

        <section className='all-movies'>
          <h2 className='mt-[40px]'>All Movies</h2>

          {isLoading ? (
            <Loading />
          ) : errorMsg ? (
            <p className='text-red-500'>{errorMsg}</p>
          ) : (
            <ul>
              {filteredMovies.map((movie) => (
                <Card key={movie.id} movie={movie}/>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}
 
export default App;