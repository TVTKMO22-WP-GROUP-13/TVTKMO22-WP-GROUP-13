//tmdb_endpoints.js


const tmdbEndpoints = {
  searchMovies: (query, page, year, language) => 
    `/search/movie?query=${query}&page=${page}&year=${year}&language=${language}`,

    discoverMovies: (sort_by, language, page, year, genreId) =>
    `/discover/movie?sort_by=${sort_by}&language=${language}&page=${page}&year=${year}&with_genres=${genreId}`,
   // 'https://api.themoviedb.org/3/discover/movie?language=en-US&page=1&sort_by=popularity.desc&with_genres=16',

    getMovieById: (id) => `/movie/${id}`,

    topRatedMovies: (top) => `/movie/${top}`,

    topRatedSeries: (top) => `/tv/${top}`,
  
    searchTv: (query, page, year, language) => 
  `/search/tv?query=${query}&page=${page}&year=${year}&language=${language}`,

  discoverTv: (sort_by, page, year, language, genreId) => 
  `/discover/tv?with_genres=${genreId}&sort_by=${sort_by}&page=${page}&primary_release_year=${year}&language=${language}`,

  getTvById: (id) => `/tv/${id}`
};

module.exports = tmdbEndpoints;