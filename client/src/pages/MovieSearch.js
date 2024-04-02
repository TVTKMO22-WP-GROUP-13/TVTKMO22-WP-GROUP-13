import './MovieSearch.css'
import React, { useState } from 'react';

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

  const handleSearch = () => {
    console.log('Hakuehdot:', {
      selectedGenres: Array.from(selectedGenres),
      certification,
      rating,
      startYear,
      endYear,
    });
  };

  return (
    <div className="wrapper">
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

    {/* ikäsuositus nappulat */}
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


      <div>
        <label>
         <h2>Rating: {rating}</h2>
          <input
            type="range"
            min="0"
            max="100"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
        </label>
      </div>

      <div>
        <label>
        <h2>Start Year: {startYear}</h2>
          <input
            type="range"
            min="1895"
            max={endYear} 
            value={startYear}
            onChange={(e) => setStartYear(Number(e.target.value))}
          />
        </label>
        <label>
          <h2>End Year: {endYear}</h2>
          <input
            type="range"
            min={startYear} 
            max="2024"
            value={endYear}
            onChange={(e) => setEndYear(Number(e.target.value))}
          />
        </label>
      </div>

      <button className="search-button" onClick={handleSearch}>Search</button>
    </div>
  );
};

export default App;