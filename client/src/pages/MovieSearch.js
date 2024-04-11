import React, { useState, useEffect } from 'react';
import axios from 'axios'
import './MovieSearch.css';

const genresList = [
  'Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 'Documentary',
  'Drama', 'Family', 'Fantasy', 'History', 'Horror', 'Music', 'Mystery',
  'Romance', 'Science Fiction', 'TV Movie', 'Thriller', 'War', 'Western'
];

const Movies = () => {
    const [query, setQuery] = useState('');
    const [genre, setGenre] = useState('');
    const [page, setPage] = useState(1);
    const [year, setYear] = useState('');
    const [movies, setMovies] = useState([]);
    useEffect(() => {
      search();
    }, [page]); 
  
    const search = async () => {
      try {
        let response;
        if (query !== '') {
          response = await axios.get('http://localhost:3001/movie/search', {
            params: {
              query: query,
              page: page,
              year: year
            }
          });
        } else {
          response = await axios.get('http://localhost:3001/movie/discover', {
            params: {
              genre: genre,
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
      setGenre('');
      setQuery(event.target.value);
    };
  
    const handleGenreChange = (event) => {
      setQuery(''); 
      setGenre(event.target.value);
    };
  
    const handlePageChange = (event) => {
      setPage(event.target.value);
    };
  
    const handleYearChange = (event) => {
      setYear(event.target.value);
    };
  
    const handleSearch = () => {
      setMovies([]);
      search();
    };


  return (
    <div className="wrapper">
      {/* Hakupalkki */}
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search for movies..."
          value={searchTerm}
          onChange={handleSearchInput}
        />
      </div>

      {/* Genre nappulat */}
      <div>
        <h2>Genres</h2>
        <div className="genre-container">
          {genresList.map((genre) => (
            <button
              key={genre}
              className={`genre-button ${selectedGenres.has(genre) ? 'selected' : ''}`}
              onClick={() => toggleGenre(genre)}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>


      {/* Arvostelu ja vuodet liukusäätimillä */}
      <div>
        <h2>Rating: {rating}</h2>
        <input
          type="range"
          min="0"
          max="10"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />
      </div>

      <div>
        <h2>Year: {year}</h2>
        <input
          type="range"
          min="1895"
          max="2026"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
        />
      </div>

      {/* Hakunappi */}
      <div>
        <button className="search-button" onClick={handleSearch}>Search</button>
      </div>
      
      {/* Näytetään hakutulokset */}
      <div className="search-results">
        {movies.map((movie) => (
          <div key={movie.id}>{movie.title}</div>
        ))}
      </div>
    </div>
  );
};


export default Movies;