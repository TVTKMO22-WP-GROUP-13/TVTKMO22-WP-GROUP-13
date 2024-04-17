import React, { useState } from 'react';
import axios from 'axios';
import './MovieSearch.css';

const genresList = [
  'Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 'Documentary',
  'Drama', 'Family', 'Fantasy', 'History', 'Horror', 'Music', 'Mystery',
  'Romance', 'Science Fiction', 'TV Movie', 'Thriller', 'War', 'Western'
];

const MovieResults = ({ movies }) => {
  return (
    <div className="movie-results-wrapper">
      {movies.map((movie) => (
        <div key={movie.id} className="movie-result">
          <img src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`} alt={movie.title} />
          <div className="movie-info">
            <h3>{movie.title}</h3>
            <p>{movie.overview}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

const Movies = () => {
  const [query, setQuery] = useState('');
  const [selectedGenres, setSelectedGenres] = useState(new Set());
  const [year, setYear] = useState('');
  const [page, setPage] = useState(1); 
  const [movies, setMovies] = useState([]);

  const handleSearch = async () => {
    try {
      let response;
      if (query !== '') {
        response = await axios.get('http://localhost:3001/tmdb/movie/search', {
          params: {
            query: query,
            page: page,
            year: year
          }
        });
      } else {
        const genreId = Array.from(selectedGenres).join(',');
        response = await axios.get('http://localhost:3001/tmdb/movie/discover', {
          params: {
            with_genres: genreId, // Changed from 'genre' to 'with_genres' for correct parameter
            sort_by: 'popularity.desc',
            page: page,
            year: year
          }
        });
      }
      console.log(response.data); 
      setMovies(response.data); 
    } catch (error) {
      console.error('Hakuvirhe:', error);
    }
  };

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const toggleGenre = (genre) => {
    setSelectedGenres(prevSelectedGenres => {
      const newSelectedGenres = new Set(prevSelectedGenres);
      if (newSelectedGenres.has(genre)) {
        newSelectedGenres.delete(genre);
      } else {
        newSelectedGenres.add(genre);
      }
      return newSelectedGenres;
    });
  };

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  return (
    <div className="main-container">
      <div className="search-wrapper">
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search for movies..."
            value={query}
            onChange={handleInputChange}
          />
        </div>

        <div className="genre-container">
          <h2>Genres</h2>
          <div></div> {genresList.map(genre => (
            <button
              key={genre}
              className={`genre-button ${selectedGenres.has(genre) ? 'selected' : ''}`}
              onClick={() => toggleGenre(genre)}
            >
              {genre}
            </button>
          ))}
        </div>

        <div className="year-container">
          <h2>Year</h2>
          <input
            type="number"
            value={year}
            onChange={handleYearChange}
            placeholder="Year"
          />
        </div>

        <button className="search-button" onClick={handleSearch}>Search</button>
      </div>

      <MovieResults movies={movies} />
    </div>
  );
};

export default Movies;