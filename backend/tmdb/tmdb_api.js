const axiosClient = require('../axios/axios_client');
const movieModel = require('./movieModel');
const tmdbEndpoints = require("./tmdb_endpoints");

const tmdbApi = {
  async searchMovies(query, page = 1, year = '', language = 'en-US') {
    const endpoint = tmdbEndpoints.searchMovies(query, page, year, language);
    const { data } = await axiosClient.get(endpoint);
    return data.results.map(movie => new movieModel(
        movie.id, 
        movie.title, 
        movie.poster_path, 
        movie.overview
    ));
  },
  async discoverMovies(sort_by = 'popularity.desc', page = 1, year = '', language = 'en', genreId = '') {
    const endpoint = tmdbEndpoints.discoverMovies(sort_by, page, year, language, genreId);
    const { data } = await axiosClient.get(endpoint);
    return data.results;
  },
  async getMovieById(id) {
    const endpoint = tmdbEndpoints.getMovieById(id);
    const { data } = await axiosClient.get(endpoint);
    return data;
  },
};

module.exports = tmdbApi;