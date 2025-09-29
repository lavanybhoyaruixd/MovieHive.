import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import MovieCard from './component/MovieCard';
import Loading from './component/Loading';
import ShinyText from './component/ShinyText';
import './Category.css';

const Category = () => {
  const { genreId, genreName } = useParams();
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [hasMoreMovies, setHasMoreMovies] = useState(true);
  const [loadMoreLoading, setLoadMoreLoading] = useState(false);

  // Genre mapping for display names
  const genreMap = {
    '28': 'Action',
    '12': 'Adventure',
    '16': 'Animation',
    '35': 'Comedy',
    '80': 'Crime',
    '99': 'Documentary',
    '18': 'Drama',
    '10751': 'Family',
    '14': 'Fantasy',
    '36': 'History',
    '27': 'Horror',
    '10402': 'Music',
    '9648': 'Mystery',
    '10749': 'Romance',
    '878': 'Science Fiction',
    '10770': 'TV Movie',
    '53': 'Thriller',
    '10752': 'War',
    '37': 'Western'
  };

  useEffect(() => {
    if (genreId) {
      fetchMoviesByGenre(genreId);
    }
  }, [genreId]);

  const fetchMoviesByGenre = async (genreId, page = 1, append = false) => {
    try {
      if (page === 1) {
        setLoading(true);
      } else {
        setLoadMoreLoading(true);
      }
      
      setError(null);
      
      const apiUrl = `https://api.themoviedb.org/3/discover/movie?language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreId}`;
      
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch movies: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      if (append) {
        setMovies(prevMovies => [...prevMovies, ...data.results]);
      } else {
        setMovies(data.results);
      }
      
      setTotalPages(data.total_pages);
      setCurrentPage(page);
      setHasMoreMovies(page < data.total_pages);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
      setLoadMoreLoading(false);
    }
  };

  const handleLoadMore = async () => {
    await fetchMoviesByGenre(genreId, currentPage + 1, true);
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  const displayGenreName = genreName || genreMap[genreId] || 'Movies';

  if (loading) {
    return (
      <div className="category">
        <div className="container">
          <Loading type="spinner" size="large" text="Loading movies..." />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="category">
        <div className="container">
          <div className="error">
            <p>Error: {error}</p>
            <button onClick={() => fetchMoviesByGenre(genreId)}>Try Again</button>
            <button onClick={handleBackToHome} className="back-button">Back to Home</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="category">
      <div className="category-header">
        <div className="container">
          <button
            onClick={handleBackToHome}
            aria-label="Back to Home"
            className="breadcrumb-link category-back-btn"
          >
            ← Back
          </button>
          <h1 className="category-title">
            <ShinyText text={`${displayGenreName} Movies`} speed={4} />
          </h1>
          <p className="category-description">
            Discover the best {displayGenreName.toLowerCase()} movies from our collection
          </p>
        </div>
      </div>

      <div className="container">
        <div className="category-stats">
          <p>
            Showing {movies.length} movies 
            {totalPages > 1 && ` (Page ${currentPage} of ${totalPages})`}
          </p>
        </div>

        <div className="movies-grid">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>

        {/* Load More Button */}
        {hasMoreMovies && movies.length > 0 && (
          <div className="load-more-section">
            <button 
              className="load-more-button"
              onClick={handleLoadMore}
              disabled={loadMoreLoading}
            >
              {loadMoreLoading ? (
                <Loading type="spinner" size="small" text="Loading more..." />
              ) : (
                'Load More Movies'
              )}
            </button>
          </div>
        )}

        {movies.length === 0 && (
          <div className="no-movies">
            <p>No {displayGenreName.toLowerCase()} movies found at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;
