import React, { useEffect, useState } from 'react'
import { useDebounce } from 'react-use'
import Search from './components/Search'
import Spinner from './components/Spinner';
import MovieCard from './components/MovieCard';
import { getTrendingMovies, updateSearchCount } from './appwrite';

//API - Application Programming Interface - a set of rules that allows one software application to talk to another

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const   API_OPTIONS = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${API_KEY}`
  }
}

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedSearchTerm, SetDebouncedSearchTerm] = useState('');

  //Debounce the search term to prevent making too many API requests
  //by waiting for the user to stop typing for 500ms
  useDebounce(() => SetDebouncedSearchTerm(searchTerm), 500, [searchTerm])

  const fetchMovies = async (query = '') => {
    setIsLoading(true);
    setErrorMessage('');

    try{
      const endpoint = query 
      ?  `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
      : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`
      //but like this even if we type a single letter, or as we write , api requests are sent each time , and hence like this there will be too many requests sent, which may cause our application to break, thus we intend to use debounce technique

      const response = await fetch(endpoint, API_OPTIONS)

      if(!response.ok){
        throw new Error('Failed to fetch movies'); //this will send us to the catch(error) block from here 
      }

      // alert(response);
      const data = await response.json();

      if(data.Response === 'False'){
        setErrorMessage(data.Error || 'Failed to fetch movies');
        setMovieList([]);
        return ;
      }

      setMovieList(data.results || []);
      // console.log(data.results[0])

      if(query && data.results.length > 0){
        await updateSearchCount(query, data.results[0]);
      }
    }catch(error){
      console.error(`Error fetching movies: ${error}`);
      setErrorMessage(`Error fetching movies. Please try again later.`);
    }finally {
      setIsLoading(false);
    }
  }

  const loadTrendingMovies = async () => {
    try{
      const movies = await getTrendingMovies();
      setTrendingMovies(movies);
    }catch(error){
      console.error(`Error fetching trending movies : ${error}`);
    }
  }

  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm])  //so that whenever searchterm changes, fetchMovies with changed/new searchterm gets called
  //we won't add loadingTrendingMovies() here as that will fetch the trending movues everytime the use searches something, causig too many unnecessary api calls, thus we will create yet another useEffect()

  useEffect(() => {
    loadTrendingMovies();
  }, [])

  return (
    <div>
      <main>
        <div className="pattern" />

        <div className="wrapper">
          <header>
            <img src="./hero.png" alt="Hero Banner" />
            <h1>Find <span className='text-gradient'>Movies</span> You'll Enjoy Without the Hassle</h1>

            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </header>

          {/* Now we will use the TMDB movie database to fetch some of the movies through api request */}

          {trendingMovies.length > 0 && (
            <section className='trending'>
              <h2>Trending Movies</h2>

              <ul>
                {trendingMovies.map((movie, index) => {
                  return (
                  <li key={movie.$id}> 
                  {/* using $id insteas of id as here movie is coming from the appwrite database , not from tmdb database  */}
                    <p>{index+1}</p>
                    <img src={movie.poster_url} alt={movie.title} />
                  </li>
                  )
                })}
              </ul>
            </section>
          )}

          <section className='all-movies'>
            <h2 className=''>All Movies</h2>

            {isLoading ? (
              <Spinner />
            ) : errorMessage ? (
              <p className='text-red-500'>{errorMessage}</p>
            )   : (
              <ul>
                {movieList.map((movie) => {
                  return(
                    // <p key={movie.id} className='text-white'>{movie.title}</p>
                    <MovieCard key={movie.id} movie={movie} />
                  )
                })}
              </ul>
            )}
          </section>
        </div>
      </main>
    </div>
  )
}

export default App
