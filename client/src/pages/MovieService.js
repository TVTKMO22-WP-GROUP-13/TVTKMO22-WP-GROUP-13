import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001';

export const fetchMovies = async (searchTerm) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/movie/search`, {
            params: {
                query: searchTerm,
                // Voit lisätä muita parametreja, jos tarpeen
            },
        });
        return response.data;
    } catch (error) {
        console.error('Fetching movies failed:', error);
    }
};