import { databases } from '../Appwrite.js';
import { ID, Query, Permission, Role } from 'appwrite';

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const FAVORITES_COLLECTION_ID = import.meta.env.VITE_APPWRITE_FAVORITES_COLLECTION_ID;

class HybridFavoritesService {
  constructor() {
    this.useAppwrite = true;
    this.localStorageKey = 'movieFavorites';
  }

  // Test Appwrite connection and fallback to localStorage if needed
  async checkAppwriteConnection() {
    try {
      await databases.listDocuments(
        DATABASE_ID,
        FAVORITES_COLLECTION_ID,
        [Query.limit(1)]
      );
      this.useAppwrite = true;
      console.log('✅ Using Appwrite for favorites');
      return true;
    } catch (error) {
      console.warn('⚠️ Appwrite connection failed, using localStorage fallback:', error.message);
      this.useAppwrite = false;
      return false;
    }
  }

  // Get localStorage favorites
  getLocalFavorites(userId) {
    try {
      const allFavorites = JSON.parse(localStorage.getItem(this.localStorageKey) || '{}');
      return allFavorites[userId] || [];
    } catch (error) {
      console.error('Error reading localStorage favorites:', error);
      return [];
    }
  }

  // Save to localStorage
  saveLocalFavorites(userId, favorites) {
    try {
      const allFavorites = JSON.parse(localStorage.getItem(this.localStorageKey) || '{}');
      allFavorites[userId] = favorites;
      localStorage.setItem(this.localStorageKey, JSON.stringify(allFavorites));
      return true;
    } catch (error) {
      console.error('Error saving to localStorage:', error);
      return false;
    }
  }

  // Add a movie to favorites
  async addToFavorites(userId, movie) {
    // Always test connection first
    await this.checkAppwriteConnection();

    if (this.useAppwrite) {
      return this.addToAppwriteFavorites(userId, movie);
    } else {
      return this.addToLocalFavorites(userId, movie);
    }
  }

  // Add to Appwrite
  async addToAppwriteFavorites(userId, movie) {
    try {
      // Check if movie is already in favorites
      const existingFavorite = await this.getFavoriteByMovieId(userId, movie.id);
      if (existingFavorite) {
        throw new Error('Movie is already in favorites');
      }

      const favoriteData = {
        userId: userId,
        movieId: String(movie.id),
        title: movie.title,
        poster_path: movie.poster_path || '',
        release_date: movie.release_date || '',
        vote_average: movie.vote_average || 0,
        original_language: movie.original_language || '',
        overview: movie.overview || '',
        genre_ids: Array.isArray(movie.genre_ids) ? movie.genre_ids : [],
        addedAt: new Date().toISOString()
      };

      const response = await databases.createDocument(
        DATABASE_ID,
        FAVORITES_COLLECTION_ID,
        ID.unique(),
        favoriteData,
        [
          Permission.read(Role.user(userId)),
          Permission.update(Role.user(userId)),
          Permission.delete(Role.user(userId)),
          Permission.write(Role.user(userId)),
        ]
      );

      return response;
    } catch (error) {
      console.error('Error adding to Appwrite favorites:', error);
      console.log('🔄 Falling back to localStorage...');
      this.useAppwrite = false;
      return this.addToLocalFavorites(userId, movie);
    }
  }

  // Add to localStorage
  addToLocalFavorites(userId, movie) {
    try {
      const favorites = this.getLocalFavorites(userId);
      
      // Check if already exists
      if (favorites.some(fav => fav.id === movie.id)) {
        throw new Error('Movie is already in favorites');
      }

      const favoriteMovie = {
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

      favorites.unshift(favoriteMovie);
      this.saveLocalFavorites(userId, favorites);
      
      return favoriteMovie;
    } catch (error) {
      console.error('Error adding to localStorage favorites:', error);
      throw error;
    }
  }

  // Remove a movie from favorites
  async removeFromFavorites(userId, movieId) {
    if (this.useAppwrite) {
      return this.removeFromAppwriteFavorites(userId, movieId);
    } else {
      return this.removeFromLocalFavorites(userId, movieId);
    }
  }

  // Remove from Appwrite
  async removeFromAppwriteFavorites(userId, movieId) {
    try {
      const favorite = await this.getFavoriteByMovieId(userId, movieId);
      if (!favorite) {
        throw new Error('Movie not found in favorites');
      }

      await databases.deleteDocument(
        DATABASE_ID,
        FAVORITES_COLLECTION_ID,
        favorite.$id
      );

      return true;
    } catch (error) {
      console.error('Error removing from Appwrite favorites:', error);
      // Try localStorage fallback
      this.useAppwrite = false;
      return this.removeFromLocalFavorites(userId, movieId);
    }
  }

  // Remove from localStorage
  removeFromLocalFavorites(userId, movieId) {
    try {
      const favorites = this.getLocalFavorites(userId);
      const updatedFavorites = favorites.filter(fav => fav.id !== movieId);
      
      if (favorites.length === updatedFavorites.length) {
        throw new Error('Movie not found in favorites');
      }

      this.saveLocalFavorites(userId, updatedFavorites);
      return true;
    } catch (error) {
      console.error('Error removing from localStorage favorites:', error);
      throw error;
    }
  }

  // Get all favorite movies for a user
  async getUserFavorites(userId) {
    if (this.useAppwrite) {
      try {
        const response = await databases.listDocuments(
          DATABASE_ID,
          FAVORITES_COLLECTION_ID,
          [
            Query.equal('userId', userId),
            Query.orderDesc('addedAt')
          ]
        );

        return response.documents.map(doc => ({
          id: typeof doc.movieId === 'string' ? parseInt(doc.movieId, 10) : doc.movieId,
          title: doc.title,
          poster_path: doc.poster_path,
          release_date: doc.release_date,
          vote_average: doc.vote_average,
          original_language: doc.original_language,
          overview: doc.overview,
          genre_ids: doc.genre_ids,
          addedAt: doc.addedAt,
          favoriteId: doc.$id
        }));
      } catch (error) {
        console.error('Error fetching Appwrite favorites, using localStorage:', error);
        this.useAppwrite = false;
        return this.getLocalFavorites(userId);
      }
    } else {
      return this.getLocalFavorites(userId);
    }
  }

  // Check if a movie is in user's favorites
  async isFavorite(userId, movieId) {
    try {
      if (this.useAppwrite) {
        const favorite = await this.getFavoriteByMovieId(userId, movieId);
        return !!favorite;
      } else {
        const favorites = this.getLocalFavorites(userId);
        return favorites.some(fav => fav.id === movieId);
      }
    } catch (error) {
      console.error('Error checking favorite status:', error);
      return false;
    }
  }

  // Get favorite by movie ID and user ID (Appwrite only)
  async getFavoriteByMovieId(userId, movieId) {
    if (!this.useAppwrite) return null;

    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        FAVORITES_COLLECTION_ID,
        [
          Query.equal('userId', userId),
          Query.equal('movieId', String(movieId))
        ]
      );

      return response.documents.length > 0 ? response.documents[0] : null;
    } catch (error) {
      console.error('Error getting favorite by movie ID:', error);
      return null;
    }
  }

  // Get favorite count for a user
  async getFavoriteCount(userId) {
    try {
      if (this.useAppwrite) {
        const response = await databases.listDocuments(
          DATABASE_ID,
          FAVORITES_COLLECTION_ID,
          [Query.equal('userId', userId)]
        );
        return response.total;
      } else {
        const favorites = this.getLocalFavorites(userId);
        return favorites.length;
      }
    } catch (error) {
      console.error('Error getting favorite count:', error);
      return 0;
    }
  }

  // Toggle favorite
  async toggleFavorite(userId, movie) {
    const isCurrentlyFavorite = await this.isFavorite(userId, movie.id);
    
    if (isCurrentlyFavorite) {
      await this.removeFromFavorites(userId, movie.id);
    } else {
      await this.addToFavorites(userId, movie);
    }
  }
}

export default new HybridFavoritesService();