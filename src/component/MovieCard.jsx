import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
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

  return (
    <Link to={`/movie/${id}`} className="movie-card">
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
  );
};

export default MovieCard;
