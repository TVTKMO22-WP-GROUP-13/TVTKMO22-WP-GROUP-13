const axiosClient = require("./axios_client");
const tmdbEndpoints = require("./tmdb_endpoints");

const tmdbApi = {
  async searchMovies(query, page = 1, year = '', language = 'en') {
    const endpoint = tmdbEndpoints.searchMovies(query, page, year, language);
    const { data } = await axiosClient.get(endpoint);
    return data.results;
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