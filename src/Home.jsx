// src/Home.jsx
import { useEffect, useState, useCallback } from 'react'
import Search from './component/Search.jsx'
import Spinner from './Spinner.jsx';
import MovieCard from './component/MovieCard.jsx';
import { useDebounce } from 'react-use';
import { getTrendingMovies, updateSearchCount } from './Appwrite.js';

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
};

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [TrendingMovies, setTrendingMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // ✅ NEW: toggle state
  const [showAdult, setShowAdult] = useState(false);

  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);

  const fetchMovies = useCallback(async (query = '', pageNum = 1, append = false) => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      let randomPage = pageNum;
      if (!query && pageNum === 1) {
        randomPage = Math.floor(Math.random() * 50) + 1;
      }

      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}&page=${pageNum}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc&page=${randomPage}`;

      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) throw new Error('Failed to fetch movies');

      const data = await response.json();

      if (!data || !data.results) {
        setErrorMessage('Failed to fetch movies');
        setMovieList([]);
        return;
      }

      // use functional update to avoid capturing stale movieList
      setMovieList(prev => (append ? [...prev, ...data.results] : data.results));
      setTotalPages(data.total_pages);

      if (query && data.results.length > 0 && pageNum === 1) {
        await updateSearchCount(query, data.results[0]);
      }
    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
      setErrorMessage('Error fetching movies. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loadtrendingMovies = useCallback(async () => {
    try {
      const movies = await getTrendingMovies();
      setTrendingMovies(movies);
    } catch (error) {
      console.error(`Error fetching trending movies: ${error}`);
    }
  }, []);

  useEffect(() => {
    setPage(1);
    fetchMovies(debouncedSearchTerm, 1, false);
  }, [debouncedSearchTerm, fetchMovies]);

  useEffect(() => {
    loadtrendingMovies();
    fetchMovies('', 1, false);
  }, [loadtrendingMovies, fetchMovies]);

  const handleLoadMore = () => {
    if (page < totalPages) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchMovies(debouncedSearchTerm, nextPage, true);
    }
  };

  // ✅ Filter applied here
  const filteredMovies = showAdult
    ? movieList
    : movieList.filter(movie => !movie.adult);

  // Toggle handler
  const handleToggleAdult = () => {
    setShowAdult((prev) => !prev);
  };

  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="hero Banner" />
          <h1>
            Find <span className="text-gradient">Movies</span> You'll Enjoy Without the Hassle
          </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        {TrendingMovies.length > 0 && (
          <section className="trending">
            <h2>Trending Movies</h2>
            <ul>
              {TrendingMovies.map((movie, index) => (
                <li key={movie.$id}>
                  <p>{index + 1}</p>
                  <img src={movie.poster_url} alt={movie.title} />
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="all-movie">
          <h2>All Movies</h2>

         {/* ✅ Adult Filter Toggle */}
<button
  onClick={handleToggleAdult}
  role="switch"
  aria-checked={showAdult}
  className="mb-2 px-2 py-0.5 text-xs rounded bg-indigo-600 text-white hover:bg-indigo-700"
>
  {showAdult ? "Hide Adult" : "Show Adult"}
</button>


          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <>
              <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 list-none p-0">
                {filteredMovies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </ul>

              {page < totalPages && (
                <div className="flex justify-center mt-6">
                  <button
                    onClick={handleLoadMore}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Load More
                  </button>
                </div>
              )}
            </>
          )}
        </section>
      </div>
    </main>
  );
};

export default Home;
