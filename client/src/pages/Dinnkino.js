import './Dinnkino.css'
import React, { useState } from 'react'


export default function Dinnkino() {
  const [selectedKino, setSelectedKino] = useState('')
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedMovie, setSelectedMovie] = useState('')
  const [showShowtimeContainer, setShowtimeContainer] = useState(false)

  const handleSearch = () => {
    // Hakutoiminnallisuus tähä
    console.log('Searching...')

    if (selectedKino && selectedDate && selectedMovie) {
      setShowtimeContainer(true)
      
    } else {
    setShowtimeContainer(false)
    }
  }

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
        <option value="Date 1">Date 1 </option>
        <option value="Date 2">Date 2 </option>
        <option value="Date 3">Date 3 </option>
      </select>

      {/* Movie dropdown */}
      <select value={selectedMovie} onChange={(e) => setSelectedMovie(e.target.value)}>
        <option value="Pick a movie">Pick a movie</option>
        <option value="All movies ">All movies</option>
      </select>

      {/* Search button */}
      <button onClick={handleSearch}>Search</button>
      </div>
      
      {showShowtimeContainer && ( 
         <>
         <div className="showtime-container">
           <div className='block'>
             <p>Date/time</p>
           </div>
           <div className='block'>
             <p>Movie name</p>
           </div>
           <div className='block'>
             <p>Location: {selectedKino}</p>
           </div>
           <div className='block'>
             <p>Places left</p>
           </div>
         </div>
         <div className="showtime-container">
         <div className='block'>
             <p>Date/time</p>
           </div>
           <div className='block'>
             <p>Movie name</p>
           </div>
           <div className='block'>
             <p>Location: {selectedKino}</p>
           </div>
           <div className='block'>
             <p>Places left</p>
           </div>
         </div>
         <div className="showtime-container">
         <div className='block'>
             <p>Date/time</p>
           </div>
           <div className='block'>
             <p>Movie name</p>
           </div>
           <div className='block'>
             <p>Location: {selectedKino}</p>
           </div>
           <div className='block'>
             <p>Places left</p>
           </div>
         </div>
       </>   
    )}
    </div>
  )
}