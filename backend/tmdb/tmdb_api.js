require('dotenv').config();
const axios = require('axios');

//here we create an axios instance with the base URL for the TMDB API
const tmdb = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    params: {
        api_key: process.env.TMDB_API_KEY
    }
});

//function to get a movie by its ID
async function getMovie(id) {
    const response = await tmdb.get(`/movie/${id}`);
    return response.data;
}

//function to search for movies with a query
async function searchMovie(query) {
    const response = await tmdb.get('/search/movie', {
        params: {
            query: query,
            include_adult: false,
            language: 'en-US',
            page: 1
        }
    });
    return response.data;
}

module.exports = { getMovie, searchMovie };