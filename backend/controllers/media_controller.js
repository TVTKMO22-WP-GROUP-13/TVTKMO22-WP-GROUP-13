
const responseHandler = require('../handlers/response_handler');
const tmdbApi = require('../tmdb/tmdb_api');
const movieModel = require('../tmdb/movieModel');

const with_genres = {     
  "action": 28,
  "adventure": 12,
  "animation": 16,
  "comedy": 35,
  "crime": 80,
  "documentary": 99,
  "drama": 18,
  "family": 10751,
  "fantasy": 14,
  "history": 36,
  "horror": 27,
  "music": 10402,
  "mystery": 9648,
  "romance": 10749,
  "science fiction": 878,
  "tv": 10770,
  "thriller": 53,
  "war": 10752,
  "western": 37,
  "action & adventure": 10759,
  "kids": 10762,
  "news": 10763,
  "reality": 10764,
  "sci-fi & fantasy": 10765,
  "soap": 10766,
  "talk": 10767,
  "war & politics": 10786
};

const searchMovies = async (req, res) => {
  console.log("searchMovies")
  try {
      const { query, page, year, language } = req.query;
      const movies = await tmdbApi.searchMovies(query, page, year, language);
      const formattedMovies = movies.map(movie => ({
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        overview: movie.overview
    }));
      responseHandler.ok(res, formattedMovies);
  } catch (error) {
      responseHandler.error(res, error.message);
  }
};
const discoverMovies = async (req, res) => {
  //console.log("discoverMovie")
  //console.log(req.query)
  try {
    const { sort_by = 'popularity.desc', page = 1, year = '', with_genres = '' } = req.query;
    //console.log('TMDB discoverMovies request parameters:', sort_by, page, year, with_genres);
    
    if (!with_genres) {
      //console.log("if genreQueryn sisällä")
      return responseHandler.error(res, 'Genre query is required', 400);
    }
   // console.log("rivi 61 media_discoverM")
    const formattedMovies = await tmdbApi.discoverMovies(sort_by, page, year, with_genres);
    //console.log('Formatted Movies:', formattedMovies);  
    responseHandler.ok(res, formattedMovies);
  } catch (error) {
    console.error('TMDB discoverMovies error:', error);
    responseHandler.error(res, error.message, 500);
  }
};

const getMovieById = async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await tmdbApi.getMovieById(id);
    responseHandler.ok(res, movie);
  } catch (error) {
    responseHandler.error(res, error.message);
  }
};

const searchTv = async (req, res) => {
  try {
    const { query, page, year } = req.query;
    const movies = await tmdbApi.searchTv(query, page, year);
    const formattedSeries = movies.map(movie => ({
      id: movie.id,
      title: movie.name,
      poster_path: movie.poster_path,
      overview: movie.overview
  }));
    responseHandler.ok(res, formattedSeries);
} catch (error) {
    responseHandler.error(res, error.message);
}
};
const discoverTv = async (req, res) => {
  try {
    const { sort_by = 'popularity.desc', page = 1, year = '', with_genres = '' } = req.query;
    console.log('TMDB discoverMovies request parameters:', sort_by, page, year, with_genres);
    
    if (!with_genres) {
      console.log("if genreQueryn sisällä")
      return responseHandler.error(res, 'Genre query is required', 400);
    }
   console.log("rivi 61 media_discoverM")
    const formattedMovies = await tmdbApi.discoverTv(sort_by, page, year, with_genres);
    console.log('Formatted Movies:', formattedMovies);  
    responseHandler.ok(res, formattedMovies);
  } catch (error) {
    console.error('TMDB discoverMovies error:', error);
    responseHandler.error(res, error.message, 500);
  }
};

const getTvById = async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await tmdbApi.getTvById(id);
  } catch (error) {
    responseHandler.error(res, error.message);
  }
};
const topRatedMovies = async (req, res) =>{
  try {
    const { top } = req.params;
    const movie = await tmdbApi.topRatedMovies(top);
    responseHandler.ok(res, movie);
  } catch (error) {
    responseHandler.error(res, error.message);
  }
};
const topRatedSeries = async (req, res) =>{
  try {
    const { top } = req.params;
    const movie = await tmdbApi.topRatedSeries(top);
    responseHandler.ok(res, movie);
  } catch (error) {
    responseHandler.error(res, error.message);
  }
};
const trendingSeries = async (req, res) =>{
  try {
    const { tWindow } = req.params;
    const series = await tmdbApi.trendingSeries(tWindow);
    responseHandler.ok(res, series);
  } catch (error) {
    responseHandler.error(res, error.message);
  }
};


module.exports = { searchMovies, discoverMovies, getMovieById,
   searchTv, discoverTv, getTvById, topRatedMovies, topRatedSeries, trendingSeries }
