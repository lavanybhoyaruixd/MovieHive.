// Setup verification utility
import { databases } from '../Appwrite.js';
import { Query, ID } from 'appwrite';

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const FAVORITES_COLLECTION_ID = import.meta.env.VITE_APPWRITE_FAVORITES_COLLECTION_ID;

export const verifySetup = {
  // Check all environment variables
  checkEnvVars() {
    console.log('🔍 Checking environment variables...');
    const vars = {
      'VITE_APPWRITE_ENDPOINT': import.meta.env.VITE_APPWRITE_ENDPOINT,
      'VITE_APPWRITE_PROJECT_ID': import.meta.env.VITE_APPWRITE_PROJECT_ID,
      'VITE_APPWRITE_DATABASE_ID': import.meta.env.VITE_APPWRITE_DATABASE_ID,
      'VITE_APPWRITE_FAVORITES_COLLECTION_ID': import.meta.env.VITE_APPWRITE_FAVORITES_COLLECTION_ID,
    };

    let allGood = true;
    Object.entries(vars).forEach(([key, value]) => {
      if (value) {
        console.log(`✅ ${key}: ${value}`);
      } else {
        console.error(`❌ ${key}: NOT SET`);
        allGood = false;
      }
    });

    return allGood;
  },

  // Test Appwrite database connection
  async testDatabaseConnection() {
    try {
      console.log('🔍 Testing database connection...');
      console.log('Database ID:', DATABASE_ID);
      console.log('Favorites Collection ID:', FAVORITES_COLLECTION_ID);
      
      const result = await databases.listDocuments(
        DATABASE_ID,
        FAVORITES_COLLECTION_ID,
        [Query.limit(1)]
      );
      
      console.log('✅ Database connection successful!');
      console.log('Collection accessible, found', result.documents.length, 'documents');
      return true;
    } catch (error) {
      console.error('❌ Database connection failed:', error);
      console.error('Error details:', {
        message: error.message,
        code: error.code,
        type: error.type
      });
      return false;
    }
  },

  // Test creating a sample document (will be deleted immediately)
  async testCreateDocument() {
    try {
      console.log('🔍 Testing document creation...');
      
      const testData = {
        userId: 'test-user-id',
        movieId: '12345',
        title: 'Test Movie',
        poster_path: '/test.jpg',
        release_date: '2023-01-01',
        vote_average: 7.5,
        original_language: 'en',
        overview: 'This is a test movie',
        genre_ids: [28, 12],
        addedAt: new Date().toISOString()
      };

      const response = await databases.createDocument(
        DATABASE_ID,
        FAVORITES_COLLECTION_ID,
        ID.unique(),
        testData
      );

      console.log('✅ Document creation successful!');
      console.log('Document ID:', response.$id);

      // Clean up - delete the test document
      await databases.deleteDocument(
        DATABASE_ID,
        FAVORITES_COLLECTION_ID,
        response.$id
      );

      console.log('✅ Test document cleaned up');
      return true;
    } catch (error) {
      console.error('❌ Document creation failed:', error);
      console.error('Error details:', {
        message: error.message,
        code: error.code,
        type: error.type
      });
      return false;
    }
  },

  // Run all verification tests
  async runAllTests() {
    console.log('🚀 Running complete setup verification...\n');
    
    const envCheck = this.checkEnvVars();
    console.log('\n');
    
    if (!envCheck) {
      console.error('❌ Environment variables check failed. Please check your .env file.');
      return false;
    }

    const dbCheck = await this.testDatabaseConnection();
    console.log('\n');
    
    if (!dbCheck) {
      console.error('❌ Database connection failed. Please check your Appwrite configuration.');
      return false;
    }

    const docCheck = await this.testCreateDocument();
    console.log('\n');
    
    if (!docCheck) {
      console.error('❌ Document operations failed. Please check your collection permissions.');
      return false;
    }

    console.log('🎉 All tests passed! Your favorites system is ready to use!');
    return true;
  }
};

// Make it globally available for testing
window.verifySetup = verifySetup;