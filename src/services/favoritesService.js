import { databases } from '../appwrite.js';
import { ID, Query, Permission, Role } from 'appwrite';

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID || 'moviehub';
const FAVORITES_COLLECTION_ID = import.meta.env.VITE_APPWRITE_FAVORITES_COLLECTION_ID || 'favorites';

class FavoritesService {
  // Add a movie to favorites
  async addToFavorites(userId, movie) {
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
        poster_path: movie.poster_path,
        release_date: movie.release_date,
        vote_average: movie.vote_average,
        original_language: movie.original_language,
        overview: movie.overview,
        genre_ids: movie.genre_ids,
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
      console.error('Error adding to favorites:', error);
      throw error;
    }
  }

  // Remove a movie from favorites
  async removeFromFavorites(userId, movieId) {
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
      console.error('Error removing from favorites:', error);
      throw error;
    }
  }

  // Get all favorite movies for a user
  async getUserFavorites(userId) {
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
      console.error('Error fetching user favorites:', error);
      throw error;
    }
  }

  // Check if a movie is in user's favorites
  async isFavorite(userId, movieId) {
    try {
      const favorite = await this.getFavoriteByMovieId(userId, movieId);
      return !!favorite;
    } catch (error) {
      console.error('Error checking favorite status:', error);
      return false;
    }
  }

  // Get favorite by movie ID and user ID
  async getFavoriteByMovieId(userId, movieId) {
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
      const response = await databases.listDocuments(
        DATABASE_ID,
        FAVORITES_COLLECTION_ID,
        [Query.equal('userId', userId)]
      );

      return response.total;
    } catch (error) {
      console.error('Error getting favorite count:', error);
      return 0;
    }
  }
}

export default new FavoritesService();
