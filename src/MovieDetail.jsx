import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./MovieDetail.css"; // Import external CSS

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [err, setErr] = useState("");

  const TMDB_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const isV4 = TMDB_KEY?.startsWith("ey"); // v4 tokens start with 'ey...'

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setErr("");
        const url = new URL(`https://api.themoviedb.org/3/movie/${id}`);
        url.searchParams.set("language", "en-US");
        if (!isV4) url.searchParams.set("api_key", TMDB_KEY);

        const res = await fetch(url, {
          headers: {
            accept: "application/json",
            ...(isV4 ? { Authorization: `Bearer ${TMDB_KEY}` } : {}),
          },
        });

        if (!res.ok) throw new Error(`TMDB ${res.status}`);

        const data = await res.json();
        setMovie(data);
      } catch (e) {
        console.error("Movie detail error:", e);
        setErr("Could not load movie. Please try again later.");
      }
    };

    const fetchTrailer = async () => {
      try {
        const url = new URL(`https://api.themoviedb.org/3/movie/${id}/videos`);
        url.searchParams.set("language", "en-US");
        if (!isV4) url.searchParams.set("api_key", TMDB_KEY);

        const res = await fetch(url, {
          headers: {
            accept: "application/json",
            ...(isV4 ? { Authorization: `Bearer ${TMDB_KEY}` } : {}),
          },
        });

        if (!res.ok) return;

        const data = await res.json();
        const trailer = data.results.find(
          (vid) => vid.type === "Trailer" && vid.site === "YouTube"
        );
        if (trailer) setTrailerKey(trailer.key);
      } catch (e) {
        console.error("Trailer fetch error:", e);
      }
    };

    fetchMovie();
    fetchTrailer();
  }, [id, TMDB_KEY, isV4]);

  if (err) return <div className="error">{err}</div>;
  if (!movie) return <p className="loading">Loading…</p>;

  const starRating = Math.round((movie.vote_average || 0) / 2);

  return (
    <div className="movie-detail">
      <div className="container">
        <Link to="/" className="back-btn">← Back</Link>

        <div className="movie-content">
          <img
            className="poster"
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "/no-movie.png"
            }
            alt={movie.title}
          />

          <div className="info">
            <h1>{movie.title}</h1>
            {movie.tagline && <p className="tagline">“{movie.tagline}”</p>}

            {/* ⭐ Star Rating */}
            <div className="rating">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className={i < starRating ? "star filled" : "star"}>
                  ★
                </span>
              ))}
              <span className="score">{(movie.vote_average || 0).toFixed(1)} / 10</span>
            </div>

            <div className="details">
              <p><strong>Release:</strong> {movie.release_date || "—"}</p>
              <p><strong>Runtime:</strong> {movie.runtime ? `${movie.runtime} min` : "—"}</p>
              <p><strong>Language:</strong> {movie.original_language?.toUpperCase() || "—"}</p>
              <p><strong>Genres:</strong> {movie.genres?.map((g) => g.name).join(", ") || "—"}</p>
            </div>

            <h2>Overview</h2>
            <p className="overview">{movie.overview || "No overview available."}</p>

            {/* 🎥 Trailer */}
            {trailerKey ? (
              <div className="trailer">
                <h2>Watch Trailer</h2>
                <div className="video-wrap">
                  <iframe
                    src={`https://www.youtube.com/embed/${trailerKey}`}
                    title="Movie Trailer"
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            ) : (
              <p className="no-trailer">No trailer available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
