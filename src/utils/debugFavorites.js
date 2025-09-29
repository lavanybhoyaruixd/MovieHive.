// Debug utility for favorites functionality
import { databases } from '../Appwrite';
import { Query } from 'appwrite';

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const FAVORITES_COLLECTION_ID = import.meta.env.VITE_APPWRITE_FAVORITES_COLLECTION_ID;

export const debugFavorites = {
  // Test Appwrite connection
  async testConnection() {
    try {
      console.log('🔍 Testing Appwrite connection...');
      console.log('Database ID:', DATABASE_ID);
      console.log('Collection ID:', FAVORITES_COLLECTION_ID);
      
      // Try to list documents
      const result = await databases.listDocuments(
        DATABASE_ID,
        FAVORITES_COLLECTION_ID,
        [Query.limit(1)]
      );
      
      console.log('✅ Appwrite connection successful');
      console.log('Collection exists and accessible');
      return true;
    } catch (error) {
      console.error('❌ Appwrite connection failed:', error);
      console.error('Error details:', {
        message: error.message,
        code: error.code,
        type: error.type
      });
      return false;
    }
  },

  // List all favorites for debugging
  async listAllFavorites(userId) {
    try {
      console.log('🔍 Listing all favorites for user:', userId);
      const result = await databases.listDocuments(
        DATABASE_ID,
        FAVORITES_COLLECTION_ID,
        [Query.equal('userId', userId)]
      );
      
      console.log('📚 Found favorites:', result.documents.length);
      result.documents.forEach((doc, index) => {
        console.log(`${index + 1}.`, {
          id: doc.$id,
          movieId: doc.movieId,
          title: doc.title,
          addedAt: doc.addedAt
        });
      });
      
      return result.documents;
    } catch (error) {
      console.error('❌ Error listing favorites:', error);
      return [];
    }
  },

  // Check environment variables
  checkEnvVars() {
    console.log('🔍 Checking environment variables...');
    console.log('VITE_APPWRITE_ENDPOINT:', import.meta.env.VITE_APPWRITE_ENDPOINT);
    console.log('VITE_APPWRITE_PROJECT_ID:', import.meta.env.VITE_APPWRITE_PROJECT_ID);
    console.log('VITE_APPWRITE_DATABASE_ID:', import.meta.env.VITE_APPWRITE_DATABASE_ID);
    console.log('VITE_APPWRITE_FAVORITES_COLLECTION_ID:', import.meta.env.VITE_APPWRITE_FAVORITES_COLLECTION_ID);
  }
};

// Make it globally available for testing
window.debugFavorites = debugFavorites;