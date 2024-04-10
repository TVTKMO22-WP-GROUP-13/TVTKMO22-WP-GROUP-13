const tmdbEndpoints = {
  searchMovies: (query, page, year, language) => 
    `/search/movie?query=${query}&page=${page}&year=${year}&language=${language}`,
  discoverMovies: (sort_by, page, year, language, genreId) => 
    `/discover/movie?with_genres=${genreId}&sort_by=${sort_by}&page=${page}&primary_release_year=${year}&language=${language}`,
  getMovieById: (id) => `/movie/${id}`
  //getMovieProvidersById: (id) => `/movie/${id}/watch/providers`,
};

module.exports = tmdbEndpoints;