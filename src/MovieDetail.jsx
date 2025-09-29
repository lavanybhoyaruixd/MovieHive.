import { useEffect, useState, useCallback } from "react";
import { useAuth } from "./AuthContext.jsx";
import { useFavorites } from './contexts/FavoritesContext';
import { useParams, Link, useNavigate } from "react-router-dom";
import "./MovieDetail.css";
import ShinyText from "./component/ShinyText";

const MovieDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { isFavorite, toggleFavorite } = useFavorites();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [cast, setCast] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showTrailerModal, setShowTrailerModal] = useState(false);
  const [isTogglingFavorite, setIsTogglingFavorite] = useState(false);
  const [favoriteMessage, setFavoriteMessage] = useState('');

  const fetchMovieDetails = useCallback(async () => {
    try {
      setLoading(true);
      const apiOptions = {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
          'Content-Type': 'application/json',
        },
      };

      const [movieRes, trailerRes, creditsRes, recommendationsRes] = await Promise.all([
        fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, apiOptions),
        fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, apiOptions),
        fetch(`https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`, apiOptions),
        fetch(`https://api.themoviedb.org/3/movie/${id}/recommendations?language=en-US&page=1`, apiOptions)
      ]);

      const [movieData, trailerData, creditsData, recommendationsData] = await Promise.all([
        movieRes.json(),
        trailerRes.json(),
        creditsRes.json(),
        recommendationsRes.json()
      ]);

      setMovie(movieData);
      
      // Find official trailer
      const officialTrailer = trailerData.results.find(
        video => video.type === "Trailer" && video.official
      ) || trailerData.results.find(video => video.type === "Trailer");
      setTrailer(officialTrailer);
      
      setCast(creditsData.cast.slice(0, 12));
      setRecommendations(recommendationsData.results.slice(0, 6));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchMovieDetails();
  }, [fetchMovieDetails]);

  const openLoginModal = () => {
    setShowLoginModal(true);
  };

  const closeLoginModal = () => {
    setShowLoginModal(false);
  };

  const openTrailerModal = () => {
    if (trailer) {
      setShowTrailerModal(true);
    }
  };

  const closeTrailerModal = () => {
    setShowTrailerModal(false);
  };

  const formatRuntime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const formatCurrency = (amount) => {
    if (!amount) return 'N/A';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatRevenue = (amount) => {
    if (!amount) return 'N/A';
    if (amount >= 1000000000) {
      return `$${(amount / 1000000000).toFixed(1)} Billion`;
    } else if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)} Million`;
    }
    return formatCurrency(amount);
  };

  const handleFavoriteClick = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (!movie) return;

    try {
      setIsTogglingFavorite(true);
      setFavoriteMessage('');
      
      const wasAlreadyFavorite = isFavorite(movie.id);
      
      await toggleFavorite({
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        release_date: movie.release_date,
        vote_average: movie.vote_average,
        original_language: movie.original_language,
        overview: movie.overview,
        genre_ids: movie.genres ? movie.genres.map(g => g.id) : undefined,
      });
      
      // Show success message
      if (wasAlreadyFavorite) {
        setFavoriteMessage('Removed from favorites!');
      } else {
        setFavoriteMessage('Added to favorites!');
      }
      
      // Clear message after 3 seconds
      setTimeout(() => setFavoriteMessage(''), 3000);
      
    } catch (e) {
      console.error('Failed to toggle favorite from details:', e);
      setFavoriteMessage('Error: ' + e.message);
      setTimeout(() => setFavoriteMessage(''), 5000);
    } finally {
      setIsTogglingFavorite(false);
    }
  };

  if (loading) {
    return (
      <div className="movie-detail">
        <div className="container">
          <div className="loading">Loading movie details...</div>
        </div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="movie-detail">
        <div className="container">
          <div className="error">
            Error: {error || "Movie not found"}
            <button onClick={fetchMovieDetails}>Try Again</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="movie-detail">
      <div className="container">
        {/* Top Navigation Bar */}
        <div className="top-nav">
          <Link to="/" className="back-btn">
            ← Back to Movies
          </Link>
          
          <div className="movie-rating-section">
            <div className="rating-display">
              <img src="/star.svg" alt="Rating" className="star-icon" />
              <span className="rating-text">{movie.vote_average.toFixed(1)}/10</span>
              <span className="rating-count">({Math.floor(movie.vote_count / 1000)}K)</span>
            </div>
            <div className="favorite-section">
              <button
                className={`detail-favorite-btn ${movie && isFavorite(movie.id) ? 'favorited' : ''}`}
                onClick={handleFavoriteClick}
                disabled={isTogglingFavorite}
                title={movie && isFavorite(movie.id) ? 'Remove from favorites' : 'Add to favorites'}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill={movie && isFavorite(movie.id) ? "#ff6b6b" : "none"}
                  stroke={movie && isFavorite(movie.id) ? "#ff6b6b" : "currentColor"}
                  strokeWidth="2"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
                <span className="detail-favorite-text">
                  {isTogglingFavorite ? 'Saving...' : movie && isFavorite(movie.id) ? 'Favorited' : 'Add to Favorites'}
                </span>
              </button>
              {favoriteMessage && (
                <div className={`favorite-message ${favoriteMessage.includes('Error') ? 'error' : 'success'}`}>
                  {favoriteMessage}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Movie Header */}
        <div className="movie-header">
          <div className="movie-title-section">
            <h1 className="movie-title">{movie.title}</h1>
            <div className="movie-meta">
              {movie.release_date && (
                <span>{new Date(movie.release_date).getFullYear()}</span>
              )}
              {movie.runtime && (
                <span>• {formatRuntime(movie.runtime)}</span>
              )}
              {movie.adult === false && (
                <span>• PG-13</span>
              )}
            </div>
          </div>
        </div>

        {/* Movie Visuals Section */}
        <div className="movie-visuals">
          <div className="movie-poster">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
              className="poster-image"
            />
          </div>
          
          <div className="trailer-preview">
            <div className="trailer-thumbnail" onClick={openTrailerModal}>
              <img
                src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                alt={`${movie.title} Trailer`}
                className="trailer-image"
              />
              <div className="trailer-overlay">
                <div className="play-button">
                  <span className="play-icon">▶</span>
                  <span className="play-text">
                    {trailer ? `Trailer • ${Math.floor(trailer.duration / 60)}:${(trailer.duration % 60).toString().padStart(2, '0')}` : 'No Trailer'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Movie Details Section */}
        <div className="movie-details">
          <div className="genres-section">
            {movie.genres && movie.genres.map((genre, index) => (
              <button key={genre.id} className="genre-btn">
                {genre.name}
              </button>
            ))}
          </div>

          <div className="overview-section">
            <h3>Overview</h3>
            <p>{movie.overview}</p>
          </div>

          <div className="details-grid">
            <div className="detail-item">
              <span className="detail-label">Release date:</span>
              <span className="detail-value">
                {movie.release_date ? new Date(movie.release_date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                }) : 'N/A'} (Worldwide)
              </span>
            </div>

            <div className="detail-item">
              <span className="detail-label">Countries:</span>
              <span className="detail-value">
                {movie.production_countries && movie.production_countries.length > 0
                  ? movie.production_countries.map(country => country.name).join(' • ')
                  : 'N/A'}
              </span>
            </div>

            <div className="detail-item">
              <span className="detail-label">Status:</span>
              <span className="detail-value">{movie.status}</span>
            </div>

            <div className="detail-item">
              <span className="detail-label">Language:</span>
              <span className="detail-value">
                {movie.spoken_languages && movie.spoken_languages.length > 0
                  ? movie.spoken_languages.map(lang => lang.name).join(' • ')
                  : movie.original_language ? movie.original_language.toUpperCase() : 'N/A'}
              </span>
            </div>

            <div className="detail-item">
              <span className="detail-label">Budget:</span>
              <span className="detail-value">{formatCurrency(movie.budget)}</span>
          </div>

            <div className="detail-item">
              <span className="detail-label">Revenue:</span>
              <span className="detail-value">{formatRevenue(movie.revenue)}</span>
              </div>

            {movie.tagline && (
              <div className="detail-item">
                <span className="detail-label">Tagline:</span>
                <span className="detail-value">{movie.tagline}</span>
              </div>
            )}

            <div className="detail-item">
              <span className="detail-label">Production Companies:</span>
              <span className="detail-value">
                {movie.production_companies && movie.production_companies.length > 0
                  ? movie.production_companies.map(company => company.name).join(' • ')
                  : 'N/A'}
              </span>
            </div>
          </div>
        </div>

        {/* Cast Section */}
        <div className="cast-section">
          <h2>Cast</h2>
          <div className="cast-grid">
            {cast.map((person) => (
              <div key={person.id} className="cast-item">
                <img
                  src={`https://image.tmdb.org/t/p/w185${person.profile_path}`}
                  alt={person.name}
                  className="cast-image"
                  onError={(e) => {
                    e.target.src = '/no-movie.png';
                  }}
                />
                <div className="cast-info">
                  <h3 className="cast-name">{person.name}</h3>
                  <p className="cast-character">{person.character}</p>
                </div>
              </div>
            ))}
          </div>
          </div>

        {/* Recommendations Section */}
        <div className="recommendations-section">
            <h2>
              <ShinyText text="Recommended Movies" speed={9} />
            </h2>
            {!user ? (
            <button className="login-btn" onClick={openLoginModal}>
               Login to view recommendations
             </button>
            ) : (
            <div className="recommendations-grid">
                {recommendations.length === 0 && (
                  <div className="no-results">No recommendations found.</div>
                )}
                {recommendations.map((rec) => (
                                     <Link
                     to={`/movie/${rec.id}`}
                     key={rec.id}
                  className="recommendation-item"
                   >
                     <img
                    src={`https://image.tmdb.org/t/p/w200${rec.poster_path}`}
                       alt={rec.title}
                    className="recommendation-poster"
                  />
                  <div className="recommendation-info">
                    <h3 className="recommendation-title">{rec.title}</h3>
                    <p className="recommendation-year">
                         {rec.release_date ? new Date(rec.release_date).getFullYear() : 'N/A'}
                       </p>
                     </div>
                   </Link>
                ))}
              </div>
            )}
        </div>
          </div>

      {/* Trailer Modal */}
      {showTrailerModal && trailer && (
        <div className="modal-overlay" onClick={closeTrailerModal}>
          <div className="trailer-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeTrailerModal}>×</button>
            <div className="trailer-video-container">
              <iframe
                src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
                title={`${movie.title} Trailer`}
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
            </div>
          </div>
        </div>
      )}

      {/* Login Modal */}
      {showLoginModal && (
        <div className="modal-overlay" onClick={closeLoginModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeLoginModal}>×</button>
            <h2>Login Required</h2>
            <p>Please log in to view movie recommendations.</p>
            <button onClick={closeLoginModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetail;
