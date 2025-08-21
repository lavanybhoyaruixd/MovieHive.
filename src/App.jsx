// import { useEffect, useState } from 'react'
// import Search from './component/Search.jsx'
// import Spinner from './Spinner.jsx';
// import MovieCard from './component/MovieCard.jsx';
// import { useDebounce } from 'react-use';
// import { getTrendingMovies, updateSearchCount } from './Appwrite.js';

// const API_BASE_URL ='https://api.themoviedb.org/3';

// const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

// const API_OPTIONS = {
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
//     Authorization: `Bearer ${API_KEY}`
//   }
// };
                               
// const  App = () => {
//   const [searchTerm, setSearchTerm] = useState('');
// const [errorMessage, setErrorMessage] = useState('');
// const [movieList , setMovieList] = useState([]);
// const [TrendingMovies , setTrendingMovies ] = useState([]);
// const [isLoading, setIsLoading] = useState(false);
// const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

// useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm])


// const fetchMovies = async (query ='') => {
//   setIsLoading(true);
//   setErrorMessage('');

//   try {
//     const endpoint = query
//     ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
//     : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

//     const response = await fetch(endpoint, API_OPTIONS);

//     if (!response.ok) {
//       throw new Error('Failed to fetch movies');
//     }

//     const data = await response.json();

//     // TMDB returns results; if none, clear list and show message
//     if (!data || !data.results) {
//       setErrorMessage('Failed to fetch movies');
//       setMovieList([]);
//       return;
//     }

//     setMovieList(data.results || []);

//     if (query && data.results.length > 0) {
//       await updateSearchCount(query, data.results[0]);
//     }


//   } catch (error) {
//     console.error(`Error fetching movies: ${error}`);
//     setErrorMessage('Error fetching movies. Please try again later.');
//   } finally {
//     setIsLoading(false);
//   }
// };

// const loadtrendingMovies = async () => {
//   try{ 
//     const movies = await getTrendingMovies();
//     setTrendingMovies(movies);
//    } catch ( error ){
//       console.error(`Error fetching trending movies: ${error}`);
//     }
//   }
 


// useEffect(() => {
// fetchMovies(debouncedSearchTerm); 
// }, [debouncedSearchTerm]);

// useEffect(() => {
// loadtrendingMovies(); 
// }, []);




//   return (
//   <main>
//     <div className="pattern" />
//     <div className="wrapper">
//       <header>
//         <img src="./hero.png" alt="hero Banner" />
//         <h1>Find <span className="text-gradient">Movies</span>  You'll Enjoy Without the Hassle</h1>
//             <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
//       </header>
     
// {TrendingMovies.length> 0 && (
//   <section className="trending">
//     <h2>Trending Movies</h2>
//  <ul>
// {TrendingMovies.map((movie, index) => (
//   <li key={movie.$id} >
//     <p>{index + 1}</p>
//     <img src={movie.poster_url} alt={movie.title} />
//   </li>
// ))}
//  </ul>
//   </section>
// )}



//      <section className="all-movie">
//       <h2>All Movies</h2>

//       {isLoading ? (
//         <Spinner/>
//       ) : errorMessage ? (
//         <p className="text-red-500">{errorMessage}</p>
//       ) : (
//         <ul
//          className="grid grid-cols-4 gap-6 list-none p-0">
//           {movieList.map((movie) => (
//             <MovieCard key={movie.id} movie={movie} />
//           ))}
//         </ul>
//       )}
    
//      </section>
//     </div>
//   </main>
//   )
// }

// export default App




// import { useEffect, useState } from 'react';
// import Search from './component/Search.jsx';

// const API_BASE_URL = 'https://api.themoviedb.org/3';
// const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

// const API_OPTIONS = {
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
//     Authorization: `Bearer ${API_KEY}`, // make sure this is a V4 key
//   },
// };

// const App = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');

//   const fetchMovies = async () => {
//     try {
//       const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
//       const response = await fetch(endpoint, API_OPTIONS);

//       if (!response.ok) {
//         throw new Error('Failed to fetch movies');
//       }

//       const data = await response.json();
//       console.log(data);
//     } catch (error) {
//       console.error(`Error fetching movies: ${error}`);
//       setErrorMessage(error.message);
//     }
//   };

//   useEffect(() => {
//     fetchMovies();
//   }, []);

//   return (
//     <main>
//       <div className="pattern" />
//       <div className="wrapper">
//         <header>
//           <img src="/hero.png" alt="hero Banner" />
//           <h1>
//             Find <span className="text-gradient">Movies</span> You'll Enjoy Without the Hassle
//           </h1>
//           <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
//         </header>

//         <section className="all-movie">
//           <h2>All Movies</h2>
//           {errorMessage && <p className="text-red-500">{errorMessage}</p>}
//         </section>
//       </div>
//     </main>
//   );
// };

// export default App;

// import { useEffect, useState } from 'react'
// import Search from './component/Search.jsx'
// import Spinner from './Spinner.jsx';
// import MovieCard from './component/MovieCard.jsx';
// import { useDebounce } from 'react-use';
// import { getTrendingMovies, updateSearchCount } from './Appwrite.js';

// // Base URL for TMDB API
// const API_BASE_URL = 'https://api.themoviedb.org/3';

// // TMDB API key stored in .env file
// const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

// // Options for API requests
// const API_OPTIONS = {
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
//     Authorization: `Bearer ${API_KEY}`
//   }
// };

// const App = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   const [movieList, setMovieList] = useState([]);
//   const [TrendingMovies, setTrendingMovies] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   // Debounce search input (500ms delay)
//   useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);

//   // Function to fetch movies (search or discover)
//   const fetchMovies = async (query = '', pageNum = 1, append = false) => {
//     setIsLoading(true);
//     setErrorMessage('');

//     try {
//       // Random page only when no search is happening
//       let randomPage = pageNum;
//       if (!query && pageNum === 1) {
//         randomPage = Math.floor(Math.random() * 50) + 1; // Random page between 1–50
//       }

//       const endpoint = query
//         ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}&page=${pageNum}`
//         : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc&page=${randomPage}`;

//       const response = await fetch(endpoint, API_OPTIONS);

//       if (!response.ok) {
//         throw new Error('Failed to fetch movies');
//       }

//       const data = await response.json();

//       if (!data || !data.results) {
//         setErrorMessage('Failed to fetch movies');
//         setMovieList([]);
//         return;
//       }

//       setMovieList(append ? [...movieList, ...data.results] : data.results);
//       setTotalPages(data.total_pages);

//       if (query && data.results.length > 0 && pageNum === 1) {
//         await updateSearchCount(query, data.results[0]);
//       }
//     } catch (error) {
//       console.error(`Error fetching movies: ${error}`);
//       setErrorMessage('Error fetching movies. Please try again later.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Function to fetch trending movies (from Appwrite DB)
//   const loadtrendingMovies = async () => {
//     try {
//       const movies = await getTrendingMovies();
//       setTrendingMovies(movies);
//     } catch (error) {
//       console.error(`Error fetching trending movies: ${error}`);
//     }
//   };

//   // Fetch movies when search term changes
//   useEffect(() => {
//     setPage(1);
//     fetchMovies(debouncedSearchTerm, 1, false);
//   }, [debouncedSearchTerm]);

//   // Fetch trending + random movies on first load
//   useEffect(() => {
//     loadtrendingMovies();
//     fetchMovies('', 1, false); // "" means random discover movies
//   }, []);

//   // Load more movies when button clicked
//   const handleLoadMore = () => {
//     if (page < totalPages) {
//       const nextPage = page + 1;
//       setPage(nextPage);
//       fetchMovies(debouncedSearchTerm, nextPage, true);
//     }
//   };

//   return (
//     <main>
//       <div className="pattern" />
//       <div className="wrapper">
//         {/* Header Section */}
//         <header>
//           <img src="./hero.png" alt="hero Banner" />
//           <h1>
//             Find <span className="text-gradient">Movies</span> You'll Enjoy Without the Hassle
//           </h1>
//           <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
//         </header>

//         {/* Trending Movies Section */}
//         {TrendingMovies.length > 0 && (
//           <section className="trending">
//             <h2>Trending Movies</h2>
//             <ul>
//               {TrendingMovies.map((movie, index) => (
//                 <li key={movie.$id}>
//                   <p>{index + 1}</p>
//                   <img src={movie.poster_url} alt={movie.title} />
//                 </li>
//               ))}
//             </ul>
//           </section>
//         )}

//         {/* All Movies Section */}
//         <section className="all-movie">
//           <h2>All Movies</h2>

//           {isLoading ? (
//             <Spinner />
//           ) : errorMessage ? (
//             <p className="text-red-500">{errorMessage}</p>
//           ) : (
//             <>
//               <ul className="grid grid-cols-4 gap-6 list-none p-0">
//                 {movieList.map((movie) => (
//                   <MovieCard key={movie.id} movie={movie} />
//                 ))}
//               </ul>

//               {page < totalPages && (
//                 <div className="flex justify-center mt-6">
//                   <button
//                     onClick={handleLoadMore}
//                     className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//                   >
//                     Load More
//                   </button>
//                 </div>
//               )}
//             </>
//           )}
//         </section>
//       </div>
//     </main>
//   );
// };

// export default App;


// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import MovieDetail from "./MovieDetail";

function App() {
  return (
    <Router>
      <Routes>
        {/* Home route */}
        <Route path="/" element={<Home />} />

        {/* Movie details route */}
        <Route path="/movie/:id" element={<MovieDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
