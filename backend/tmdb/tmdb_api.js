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
  async discoverMovies(sort_by, page = 1, year = '', genreQuery = '') {
    //console.log(genreQuery)
    //console.log("tmdb api discoveM")
    const targetYear = parseInt(year, 10) || undefined;
    const endpoint = tmdbEndpoints.discoverMovies(sort_by, page, targetYear, genreQuery);
    console.log(endpoint)
    try {
      //console.log("api.themoviedb.org/3/discover/movies + endpoint)
      const { data } = await axiosClient.get(endpoint);
      if (!data || !data.results) {
        throw new Error("No results found or invalid API response");
      }
  
      return data.results.map(movie => new movieModel(
        movie.id, 
        movie.title, 
        movie.poster_path, 
        movie.overview
      ));
    } catch (error) {
      console.error("Error fetching movies from TMDB API:", error.message);
      throw error;
    }
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
  async searchTv(query, page = 1, year = '',) {
    const endpoint = tmdbEndpoints.searchTv(query, page, year);
    const { data } = await axiosClient.get(endpoint);
    return data.results.map(movie => new movieModel(
        movie.id, 
        movie.name, 
        movie.poster_path, 
        movie.overview
    ));
  },
  async discoverTv(sort_by, page = 1, year = '', genreQuery = '') {
    console.log(genreQuery)
    console.log("tmdb api discoveM")
    const targetYear = parseInt(year, 10) || undefined;
    const endpoint = tmdbEndpoints.discoverTv(sort_by, page, targetYear, genreQuery);
    console.log(endpoint)
    try {
      //console.log("api.themoviedb.org/3/discover/movies + endpoint)
      const { data } = await axiosClient.get(endpoint);
      if (!data || !data.results) {
        throw new Error("No results found or invalid API response");
      }
  
      return data.results.map(movie => new movieModel(
        movie.id, 
        movie.name, 
        movie.poster_path, 
        movie.overview
      ));
    } catch (error) {
      console.error("Error fetching movies from TMDB API:", error.message);
      throw error;
    }
  },
  async getTvById(id) {
    const endpoint = tmdbEndpoints.getTvById(id);
    const { data } = await axiosClient.get(endpoint);
    return data;
  },
  async trendingSeries(tWindow) {
    const endpoint = tmdbEndpoints.trendingSeries(tWindow)
    const {data} = await axiosClient.get(endpoint)
    return data
  },
};

module.exports = tmdbApi;

