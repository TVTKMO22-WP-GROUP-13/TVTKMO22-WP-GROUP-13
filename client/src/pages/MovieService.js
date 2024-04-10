import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001';

export const fetchMovies = async ({ searchTerm}) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/movies/search`, {
            params: {
                query: searchTerm,
               // genres: Array.from(selectedGenres).join(','),
              // certification,
               // rating,
              //  startYear,
              //  endYear
            },
        });
        return response.data;
    } catch (error) {
        throw new Error('Fetching movies failed:', error);
    }
};