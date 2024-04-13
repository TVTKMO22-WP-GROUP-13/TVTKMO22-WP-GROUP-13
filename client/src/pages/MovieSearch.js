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
  const [selectedGenre, setSelectedGenre] = useState('');
  const [year, setYear] = useState('');
  const [movies, setMovies] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get('http://localhost:3001/tmdb/movie/search', {
        params: {
          query: query,
          genre: selectedGenre,
          year: year
        }
      });
      setMovies(response.data);
    } catch (error) {
      console.error('Hakuvirhe:', error);
    }
  };

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleGenreChange = (genre) => {
    setSelectedGenre(genre);
  };

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  return (
    <div className="main-container">
      <div className="search-wrapper">
        {/* Hakupalkki */}
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search for movies..."
            value={query}
            onChange={handleInputChange}
          />
        </div>

        {/* Genre nappulat */}
        <div className="genre-container">
          {genresList.map((genre) => (
            <button
              key={genre}
              className={`genre-button ${selectedGenre === genre ? 'selected' : ''}`}
              onClick={() => handleGenreChange(genre)}
            >
              {genre}
            </button>
          ))}
        </div>

        {/* Vuoden valinta */}
        <div className="year-container">
          <h2>Year</h2>
          <input
            type="number"
            value={year}
            onChange={handleYearChange}
            placeholder="Year"
          />
        </div>

        {/* Hakunappi */}
        <button className="search-button" onClick={handleSearch}>Search</button>
      </div>

      <MovieResults movies={movies} />
    </div>
  );
};

export default Movies;