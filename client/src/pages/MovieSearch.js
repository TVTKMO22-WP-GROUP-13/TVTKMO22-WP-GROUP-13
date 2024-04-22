import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MovieSearch.css';

const genresList = [
  'action', 'adventure', 'animation', 'comedy', 'crime', 'documentary',
  'drama', 'family', 'fantasy', 'history', 'horror', 'music', 'mystery',
  'romance', 'science fiction', 'thriller', 'war', 'western'
];
const genreIdsMap = {
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
  const [genreQuery, setGenreQuery] = useState('');
  const [year, setYear] = useState('');
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const genreIds = Array.from(selectedGenres).map(genre => genreIdsMap[genre]).join(',');
    setGenreQuery(genreIds);
  }, [selectedGenres]);

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
        response = await axios.get('http://localhost:3001/tmdb/discover/movie', {
          params: {
            with_genres: genreQuery,
            sort_by: 'popularity.desc',
            page: page,
            year: year
          }
        });
      }
      console.log(response.data);
      console.log('haku:',query);
      console.log('haku:',genreQuery); 
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
      const updatedGenres = new Set(prevSelectedGenres);
      if (updatedGenres.has(genre)) {
        updatedGenres.delete(genre);
      } else {
        updatedGenres.add(genre);
      }
      return updatedGenres;
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