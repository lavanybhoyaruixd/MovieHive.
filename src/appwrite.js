import { Client, Databases, Query, ID } from 'appwrite';

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

const APPWRITE_ENDPOINT = import.meta.env.VITE_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1';

const client = new Client()
    .setEndpoint(APPWRITE_ENDPOINT)
    .setProject(PROJECT_ID);

const Database = new Databases(client);

export const updateSearchCount = async (searchTerm, movie) => {
    try {
        const result = await Database.listDocuments(
            DATABASE_ID,
            COLLECTION_ID,
            [Query.equal('searchTerm', searchTerm)]
        );

        if (result && result.documents && result.documents.length > 0) {
            const doc = result.documents[0];
            await Database.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id, {
                count: (doc.count || 0) + 1,
            });
        } else {
            await Database.createDocument(
                DATABASE_ID,
                COLLECTION_ID,
                ID.unique(),
                {
                    searchTerm,
                    count: 1,
                    movie_id: movie.id,
                    poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                }
            );
        }
    } catch (err) {
        console.error('Error updating search count in Appwrite:', err);
    }
};

export const getTrendingMovies = async () => {
try {
    const result = await Database.listDocuments(
        DATABASE_ID, 
        COLLECTION_ID,
        [
        Query.limit(5),
        Query.orderDesc("count")
    ]) 
    return result.documents;
} catch (error) {
    console.error(error);   
}




}
