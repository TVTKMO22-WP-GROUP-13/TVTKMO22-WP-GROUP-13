//tmdb_api.js
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
  async discoverMovies(sort_by = 'popularity.desc', page = 1, year = '', language = 'en-US', genreId = '') {
    const endpoint = tmdbEndpoints.discoverMovies(sort_by, language, page, year, genreId);
    const { data } = await axiosClient.get(endpoint);
    return data.results.map(movie => new movieModel(
      movie.id, 
      movie.title, 
      movie.poster_path, 
      movie.overview
    ));
  },
  async getMovieById(id) {
    const endpoint = tmdbEndpoints.getMovieById(id);
    const { data } = await axiosClient.get(endpoint);
    return data;
},
async topRatedMovies(top) {
  const endpoint = tmdbEndpoints.topRatedMovies(top)
  const {data} = await axiosClient.get(endpoint)
  return data
},
async topRatedSeries(top) {
  const endpoint = tmdbEndpoints.topRatedSeries(top)
  const {data} = await axiosClient.get(endpoint)
  return data

},
  async searchTv(query, page = 1, year = '', language = 'en-US') {
    const endpoint = tmdbEndpoints.searchTv(query, page, year, language);
    const { data } = await axiosClient.get(endpoint);
    return data.results.map(movie => new movieModel(
        movie.id, 
        movie.name, 
        movie.poster_path, 
        movie.overview
    ));
  },
  async discoverTv(sort_by = 'popularity.desc', page = 1, year = '', language = 'en', genreId = '') {
    const endpoint = tmdbEndpoints.discoverTv(sort_by, page, year, language, genreId);
    const { data } = await axiosClient.get(endpoint);
    return data.results.map(movie => new movieModel(
      movie.id, 
      movie.name, 
      movie.poster_path, 
      movie.overview
  ));
  },
  async getTvById(id) {
    const endpoint = tmdbEndpoints.getTvById(id);
    const { data } = await axiosClient.get(endpoint);
    return data;
  },
};

module.exports = tmdbApi;