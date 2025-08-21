// import React from 'react'

// const MovieCard = ({ movie: 
//     { title, vote_average, poster_path, release_date, original_language }
// }) => {
//   return (
//     <div className="movie-card">
//         <img
//         src={poster_path ?
//             `https://image.tmdb.org/t/p/w500/${poster_path}` : '/no-movie.png'}
//             alt={title}
//             />
//         <div className="mt-4">
//             <h3>{title}</h3>

//           <div className="content">
//             <div className="rating">
//                 <img src="star.svg" alt="star Icon" />
//                 <p>{vote_average ? vote_average.toFixed(1) : 'N/A'}</p>
//             </div>

//               <span>.</span>
//               <p className="lang">{original_language}</p>

//                 <span>.</span>
//                 <p className="year">
//                     {release_date ? release_date.split('-')[0] : 'N/A' }
//                 </p>
//           </div>

//         </div>
//     </div>
//   )
// }

// export default MovieCard



import React from 'react'
import { Link } from 'react-router-dom'

const MovieCard = ({ movie }) => {
  const { id, title, vote_average, poster_path, release_date, original_language } = movie;

  return (
    <Link to={`/movie/${id}`} className="movie-card">
      <img
        src={poster_path
          ? `https://image.tmdb.org/t/p/w500/${poster_path}`
          : '/no-movie.png'}
        alt={title}
      />
      <div className="mt-4">
        <h3>{title}</h3>

        {movie.adult && (
          <span className="inline-block ml-2 px-2 py-1 text-xs bg-red-600 text-white rounded">18+</span>
        )}

        <div className="content">
          <div className="rating">
            <img src="star.svg" alt="star Icon" />
            <p>{vote_average ? vote_average.toFixed(1) : 'N/A'}</p>
          </div>

          <span>.</span>
          <p className="lang">{original_language}</p>

          <span>.</span>
          <p className="year">
            {release_date ? release_date.split('-')[0] : 'N/A'}
          </p>
        </div>
      </div>
    </Link>
  )
}

export default MovieCard
