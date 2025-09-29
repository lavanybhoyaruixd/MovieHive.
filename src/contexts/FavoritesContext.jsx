import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from '../AuthContext';
import favoritesService from '../services/hybridFavoritesService';

const FavoritesContext = createContext();

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

export const FavoritesProvider = ({ children }) => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [favoriteIds, setFavoriteIds] = useState(new Set());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load user's favorites when user changes
  useEffect(() => {
    if (user) {
      loadFavorites();
    } else {
      setFavorites([]);
      setFavoriteIds(new Set());
    }
  }, [user]);

  const loadFavorites = async () => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);
      const userFavorites = await favoritesService.getUserFavorites(user.$id);
      setFavorites(userFavorites);
      setFavoriteIds(new Set(userFavorites.map(fav => fav.id)));
    } catch (err) {
      console.error('Error loading favorites:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addToFavorites = async (movie) => {
    if (!user) {
      throw new Error('User must be logged in to add favorites');
    }

    try {
      setError(null);
      await favoritesService.addToFavorites(user.$id, movie);
      
      // Update local state
      const newFavorite = {
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        release_date: movie.release_date,
        vote_average: movie.vote_average,
        original_language: movie.original_language,
        overview: movie.overview,
        genre_ids: movie.genre_ids,
        addedAt: new Date().toISOString()
      };
      
      setFavorites(prev => [newFavorite, ...prev]);
      setFavoriteIds(prev => new Set([...prev, movie.id]));
      
      return true;
    } catch (err) {
      console.error('Error adding to favorites:', err);
      setError(err.message);
      throw err;
    }
  };

  const removeFromFavorites = async (movieId) => {
    if (!user) {
      throw new Error('User must be logged in to remove favorites');
    }

    try {
      setError(null);
      await favoritesService.removeFromFavorites(user.$id, movieId);
      
      // Update local state
      setFavorites(prev => prev.filter(fav => fav.id !== movieId));
      setFavoriteIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(movieId);
        return newSet;
      });
      
      return true;
    } catch (err) {
      console.error('Error removing from favorites:', err);
      setError(err.message);
      throw err;
    }
  };

  const toggleFavorite = async (movie) => {
    if (!user) {
      throw new Error('User must be logged in to manage favorites');
    }

    const isFavorite = favoriteIds.has(movie.id);
    
    if (isFavorite) {
      await removeFromFavorites(movie.id);
    } else {
      await addToFavorites(movie);
    }
  };

  const isFavorite = (movieId) => {
    return favoriteIds.has(movieId);
  };

  const getFavoriteCount = () => {
    return favorites.length;
  };

  const value = {
    favorites,
    favoriteIds,
    loading,
    error,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    isFavorite,
    getFavoriteCount,
    loadFavorites
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};
