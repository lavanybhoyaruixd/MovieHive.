import { Link } from 'react-router-dom';
import { useFavorites } from '../contexts/FavoritesContext';
import { useAuth } from '../AuthContext';
import { useState } from 'react';

const MovieCard = ({ movie }) => {
  const { user } = useAuth();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [isToggling, setIsToggling] = useState(false);
  
  const {
    id,
    title,
    poster_path,
    release_date,
    vote_average,
    original_language
  } = movie;

  const posterUrl = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : '/no-movie.png';

  const year = release_date ? new Date(release_date).getFullYear() : 'N/A';
  const rating = vote_average ? vote_average.toFixed(1) : 'N/A';
  const language = original_language ? original_language.toUpperCase() : 'N/A';

  const handleFavoriteClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      // Redirect to login if not authenticated
      window.location.href = '/login';
      return;
    }

    try {
      setIsToggling(true);
      await toggleFavorite(movie);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    } finally {
      setIsToggling(false);
    }
  };

  const isMovieFavorite = isFavorite(id);

  return (
    <div className="movie-card">
      <Link to={`/movie/${id}`} className="movie-card-link">
        <img src={posterUrl} alt={title} />
        <div className="content">
          <h3>{title}</h3>
          <div className="rating">
            <img src="/star.svg" alt="Rating" />
            <p>{rating}</p>
          </div>
          <div className="meta">
            <span className="year">{year}</span>
            <span className="lang">{language}</span>
          </div>
        </div>
      </Link>
      
      {/* Favorite Button */}
      <button
        className={`favorite-btn ${isMovieFavorite ? 'favorited' : ''} ${isToggling ? 'loading' : ''}`}
        onClick={handleFavoriteClick}
        title={isMovieFavorite ? 'Remove from favorites' : 'Add to favorites'}
        disabled={isToggling}
      >
        {isToggling ? (
          <div className="loading-spinner"></div>
        ) : (
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill={isMovieFavorite ? "#ff6b6b" : "none"} 
            stroke={isMovieFavorite ? "#ff6b6b" : "currentColor"} 
            strokeWidth="2"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        )}
      </button>
    </div>
  );
};

export default MovieCard;
