import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001'; 

export const searchMovies = async (searchTerm) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/search/movies`, {
      params: { query: searchTerm },
    });
    return response.data;
  } catch (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
};