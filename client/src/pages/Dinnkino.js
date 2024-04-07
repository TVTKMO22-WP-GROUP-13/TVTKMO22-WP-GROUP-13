import './Dinnkino.css'

import React, { useState} from 'react'


export default function Dinnkino() {
  const [selectedKino, setSelectedKino] = useState('')
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedMovie, setSelectedMovie] = useState('')

 
  const handleSearch = () => {
   
}

  return (
    <div className="everything-wrapper">
      <div className='dropdown'>
      {/* Kino dropdown */}
      <select value={selectedKino} onChange={(e) => setSelectedKino(e.target.value)}>
          
      </select>

      {/* Date dropdown */}
      <select value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)}>
      
      </select>

      {/* Movie dropdown */}
      <select value={selectedMovie} onChange={(e) => setSelectedMovie(e.target.value)}>
    <option value="Pick a movie">Pick a movie</option>
   
    </select>

      {/* Search button */}
      <button onClick={handleSearch}>Search</button>
      </div>  
      <div className="showtime-container">
        <div className='block'>
          <p>.</p>
        </div>
        <div className='block'>
          <p>.</p>
        </div>
        <div className='block'>
          <p>{selectedKino}</p>
        </div>
        <div className='block'>
        <p>.</p>
        </div>
      </div>

  </div>
)}