import responseHandler from "./handlers/response_handler";
import tmdbApi from "./tmdb/tmdb_api";

const with_genres = { /* Genre-id:t, kuten aiemmin */ };

const searchMovies = async (req, res) => {
  try {
    const { query, page, year, language } = req.query;
    const movies = await tmdbApi.searchMovies(query, page, year, language);
    responseHandler.ok(res, movies);
  } catch (error) {
    responseHandler.error(res, error.message);
  }
};

const discoverMovies = async (req, res) => {
  try {
    const { sort_by, page, year, language, genre } = req.query;
    const genreId = with_genres[genre] || '';
    const movies = await tmdbApi.discoverMovies(sort_by, page, year, language, genreId);
    responseHandler.ok(res, movies);
  } catch (error) {
    responseHandler.error(res, error.message);
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

export { searchMovies, discoverMovies, getMovieById };