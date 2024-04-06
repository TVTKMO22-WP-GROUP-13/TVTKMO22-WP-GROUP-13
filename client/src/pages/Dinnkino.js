import './Dinnkino.css'
import axios from 'axios'
import React, { useState, useEffect } from 'react'


export default function Dinnkino() {
  const [selectedKino, setSelectedKino] = useState('')
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedMovie, setSelectedMovie] = useState('')
  const [showShowtimeContainer, setShowtimeContainer] = useState(false)
  const [theatreAreas, setTheatreAreas] = useState([])
  const [showdates, setshowDates] = useState([])
  const [moviesFinni, setMovies] = useState([]);


  useEffect(() => {
    axios.get('https://www.finnkino.fi/xml/TheatreAreas/')
      .then(response => {
        const parser = new DOMParser()
        const xmlDoc = parser.parseFromString(response.data, 'text/xml')
        const areas = xmlDoc.getElementsByTagName('TheatreArea')
        const areasArray = Array.from(areas).map(area => ({
          tiituid: area.querySelector('ID').textContent,
          name: area.querySelector('Name').textContent

         
        }))
        console.log("Teatteri id: ", areasArray.map(area => area.tiituid))
        setTheatreAreas(areasArray);
      })
      .catch(error => console.error('Error fetching theatre areas:', error))
  }, [])

  useEffect(() => {
    axios.get(`https://www.finnkino.fi/xml/ScheduleDates/`)
    .then(response => {
      const parser = new DOMParser()
      const xmlDoc = parser.parseFromString(response.data, 'text/xml')
      const dateElements = xmlDoc.getElementsByTagName('dateTime')
      const today = new Date()
      const twoWeeksFromNow = new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000)
      const formattedDatesArray = Array.from(dateElements)
        .map(dateElement => new Date(dateElement.textContent))
        .filter(date => date >= today && date <= twoWeeksFromNow)
        .map(date => {
          const day = String(date.getDate()).padStart(2, '0')
          const month = String(date.getMonth() + 1).padStart(2, '0')
          const year = date.getFullYear()
          return `${day}.${month}.${year}`
        })
      setshowDates(formattedDatesArray)
    })
    .catch(error => console.error('Error fetching dates:', error))
}, [])


useEffect(() => {
  if (selectedKino && selectedDate) {
    axios.get(`https://www.finnkino.fi/xml/Schedule/?area=${selectedKino}&dt=${selectedDate}&eventID=ALL`)
      .then(response => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(response.data, 'text/xml')
        const showElements = xmlDoc.getElementsByTagName('Show')
        const moviesArray = Array.from(showElements).map(show => ({
          tiitteliidid: show.querySelector('EventID').textContent,
          title: show.querySelector('Title').textContent
        })).filter(movie => movie.title !== "Leffasynttärit")
        setMovies(moviesArray)
      })
      .catch(error => console.error('Error fetching movies:', error))
  }
}, [selectedKino, selectedDate])
  /*const handleDateChange = (event) => {
    setSelectedDate(event.target.value)
  }*/


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
          {theatreAreas.map(area => (
            <option key={area.tiituid} value={area.name}>{area.name}</option>
          ))}
      </select>

      {/* Date dropdown */}
      <select value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)}>
      {showdates.map(date => (
            <option key={date} value={date}>{date}</option>
          ))}
      </select>

      {/* Movie dropdown */}
      <select value={selectedMovie} onChange={(e) => setSelectedMovie(e.target.value)}>
    <option value="Pick a movie">Pick a movie</option>
    {moviesFinni.reduce((uniqueMovies, movie) => {
        if (!uniqueMovies.find(item => item.tiitteliidid === movie.tiitteliidid)) {
            uniqueMovies.push(movie);
        }
        console.log("uniw", uniqueMovies)
        return uniqueMovies
    }, []).map(movie => (
        <option key={movie.tiitteliidid} value={movie.tiitteliidid}>{movie.title}</option>
    ))}
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