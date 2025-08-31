import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MovieCard from './component/MovieCard';
import Search from './component/Search';
import ShinyText from './component/ShinyText';
import Loading from './component/Loading';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [trendingLoading, setTrendingLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMovies();
    fetchTrendingMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      
      // Debug: Check if API key is loaded
      console.log('API Key loaded:', import.meta.env.VITE_TMDB_API_KEY ? 'Yes' : 'No');
      console.log('API Key length:', import.meta.env.VITE_TMDB_API_KEY?.length);
      
      const apiUrl = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`;
      console.log('API URL:', apiUrl);
      
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
          'Content-Type': 'application/json',
        },
      });
      
      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        throw new Error(`Failed to fetch movies: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('API Response data:', data);
      setMovies(data.results);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchTrendingMovies = async () => {
    try {
      setTrendingLoading(true);
      
      const apiUrl = `https://api.themoviedb.org/3/trending/movie/week?language=en-US&page=1`;
      
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch trending movies: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      setTrendingMovies(data.results.slice(0, 10)); // Get top 10 trending movies
    } catch (err) {
      console.error('Trending fetch error:', err);
    } finally {
      setTrendingLoading(false);
    }
  };

  const handleSearch = async (query) => {
    if (!query.trim()) {
      fetchMovies();
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?language=en-US&query=${encodeURIComponent(query)}&page=1`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );
      
      if (!response.ok) {
        throw new Error('Failed to search movies');
      }
      
      const data = await response.json();
      setMovies(data.results);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="home">
        <Loading type="spinner" size="large" text="Loading movies..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        <p>Error: {error}</p>
        <button onClick={fetchMovies}>Try Again</button>
      </div>
    );
  }

  return (
    <div className="home">
      <div className="hero">
        <div className="hero-content">
          <h1>
            <ShinyText text="Discover Amazing Movies" speed={4} />
          </h1>
          <p>Find your next favorite film from our extensive collection</p>
          <Search onSearch={handleSearch} />
        </div>
      </div>

      {/* Trending Movies Section */}
      {trendingMovies.length > 0 && (
        <div className="trending-section">
          <div className="container">
            <h2 className="trending-title">
              <ShinyText text="Trending Movies" speed={6} />
            </h2>
            
            {trendingLoading ? (
              <div className="trending-loading">
                <Loading type="spinner" size="medium" text="Loading trending movies..." />
              </div>
            ) : (
              <div className="trending-grid">
                {trendingMovies.map((movie, index) => (
                  <Link 
                    to={`/movie/${movie.id}`} 
                    key={movie.id} 
                    className="trending-item"
                  >
                    <div className="trending-rank">{index + 1}</div>
                    <img
                      src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                      alt={movie.title}
                      className="trending-poster"
                    />
                    <div className="trending-info">
                      <h3 className="trending-title-text">{movie.title}</h3>
                      <div className="trending-rating">
                        <img src="/star.svg" alt="Rating" className="trending-star" />
                        <span>{movie.vote_average.toFixed(1)}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <div className="container">
        <h2 className="section-title">
          <ShinyText text="Popular Movies" speed={5} />
        </h2>
        
        <div className="movies-grid">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
        
        {movies.length === 0 && (
          <div className="no-movies">
            <p>No movies found. Try a different search term.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
