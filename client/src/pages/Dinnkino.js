import './Dinnkino.css'
import React, { useState } from 'react'


export default function Dinnkino() {
  const [selectedKino, setSelectedKino] = useState('Pick a kino');
  const [selectedDate, setSelectedDate] = useState('Pick a date');
  const [selectedMovie, setSelectedMovie] = useState('Pick a movie');


  const handleSearch = () => {
    // Hakutoiminnallisuus tähä
    console.log('Searching...')
  };

  return (
    <div className="everything-wrapper">
      <div className='dropdown'>
      {/* Kino dropdown */}
      <select value={selectedKino} onChange={(e) => setSelectedKino(e.target.value)}>
        <option value="Pick a kino">Pick a kino</option>
        <option value="Kino 1">Kino 1</option>
        <option value="Kino 2">Kino 2</option>
        <option value="Kino 3">Kino 3</option>
      </select>

      {/* Date dropdown */}
      <select value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)}>
        <option value="Pick a date">Pick a date</option>
        <option value="Kalenteri">Kalenteri </option>
      </select>

      {/* Movie dropdown */}
      <select value={selectedMovie} onChange={(e) => setSelectedMovie(e.target.value)}>
        <option value="Pick a movie">Pick a movie</option>
        <option value="Movie 1">Movie 1</option>
        <option value="Movie 2">Movie 2</option>
        <option value="Movie 3">Movie 3</option>
      </select>

      {/* Search button */}
      <button onClick={handleSearch}>Search</button>
      </div>
      
      <div className="showtime">
      <button>Yee</button>
    </div>
    </div>

    
  )
}