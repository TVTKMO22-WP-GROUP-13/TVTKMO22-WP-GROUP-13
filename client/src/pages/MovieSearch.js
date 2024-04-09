import React, { useState } from 'react';
import './MovieSearch.css';
import { searchMovies } from './MovieService';

const genresList = [
  'Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 'Documentary',
  'Drama', 'Family', 'Fantasy', 'History', 'Horror', 'Music', 'Mystery',
  'Romance', 'Science Fiction', 'TV Movie', 'Thriller', 'War', 'Western'
];

const certificationsList = ['U', 'PG', '12A', '12', '15', '18', 'R18'];

const App = () => {
  const [selectedGenres, setSelectedGenres] = useState(new Set());
  const [certification, setCertification] = useState('');
  const [rating, setRating] = useState(50);
  const [startYear, setStartYear] = useState(1895);
  const [endYear, setEndYear] = useState(2026);
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);

  const toggleGenre = (genre) => {
    setSelectedGenres((prevSelectedGenres) => {
      const newSelectedGenres = new Set(prevSelectedGenres);
      if (newSelectedGenres.has(genre)) {
        newSelectedGenres.delete(genre);
      } else {
        newSelectedGenres.add(genre);
      }
      return newSelectedGenres;
    });
  };

  const handleSearchInput = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = async () => {
    try {
      const results = await searchMovies(searchTerm); 
      setMovies(results);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
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

      {/* Ikäsuositus nappulat */}
      <div>
        <h2>Certification</h2>
        <div className="certification-container">
          {certificationsList.map((cert) => (
            <button
              key={cert}
              className={`certification-button ${certification === cert ? 'selected' : ''}`}
              onClick={() => setCertification(cert)}
            >
              {cert}
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
        <h2>Start Year: {startYear}</h2>
        <input
          type="range"
          min="1895"
          max={endYear}
          value={startYear}
          onChange={(e) => setStartYear(Number(e.target.value))}
        />
      </div>

      <div>
        <h2>End Year: {endYear}</h2>
        <input
          type="range"
          min={startYear}
          max="2024"
          value={endYear}
          onChange={(e) => setEndYear(Number(e.target.value))}
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


export default App;