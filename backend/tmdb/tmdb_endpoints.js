//tmdb_endpoints.js


const tmdbEndpoints = {
  searchMovies: (query, page, year, language) => 
    `/search/movie?query=${query}&page=${page}&year=${year}&language=${language}`,
  discoverMovies: (sort_by, page, year, genreQuery) => 
    `/discover/movie?with_genres=${genreQuery}&sort_by=${sort_by}&page=${page}&year=${year}`,
  getMovieById: (id) => `/movie/${id}`,
  //getMovieProvidersById: (id) => `/movie/${id}/watch/providers`,
  topRatedMovies: (top) => `/movie/${top}`,
  topRatedSeries: (top) => `/tv/${top}`,
  trendingSeries: (tWindow) => `/trending/tv/${tWindow}`,
  searchTv: (query, page, year) => 
  `/search/tv?query=${query}&page=${page}&year=${year}`,

  discoverTv: (sort_by, page, year, genreQuery) => 
  `/discover/tv?with_genres=${genreQuery}&sort_by=${sort_by}&page=${page}&year=${year}`,

  getTvById: (id) => `/tv/${id}`
};

module.exports = tmdbEndpoints;