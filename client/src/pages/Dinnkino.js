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
  const [moviesFinni, setMovies] = useState([])
  const [showtimeData, setShowtimeData] = useState([])


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
        })).filter(movie => movie.title !== "Leffasynttärit" && movie.title !== "Oma näytös")
        setMovies(moviesArray)
      })
      .catch(error => console.error('Error fetching movies:', error))
  }
}, [selectedKino, selectedDate])
 
  const handleSearch = () => {
   
    if (selectedKino && selectedDate && selectedMovie) {
      setShowtimeContainer(true)
      const selectMovieDets = moviesFinni.find(movie => movie.tiitteliidid == selectedMovie)
      
        if(selectMovieDets) {
          const movieTitteli = selectMovieDets.title
          const MovieImgaage = selectMovieDets.imageURL
          const scheduleURL = `https://www.finnkino.fi/xml/Schedule/?area=${selectedKino}&dt=${selectedDate}&eventID=${selectedMovie}`
          
          axios.get(scheduleURL)
          .then(response => {
            const parser = new DOMParser()
            const xmlDoc = parser.parseFromString(response.data, 'text/xml')
            const showElements = xmlDoc.getElementsByTagName('Show')
            const showtimeData = []

            for (let i = 0; i < showElements.length; i++) {
              const show = showElements[i]
              const showtime = show.querySelector('dttmShowStart').textContent
              const theaterName = show.querySelector('Theatre').textContent
              const imageURL = show.querySelector('EventSmallImagePortrait').textContent
            
              showtimeData.push({
                showtime: showtime,
                movieTitle: movieTitteli,
                theaterName: theaterName,
                imageURL: imageURL
              })
            }
            setShowtimeData(showtimeData)
          })
     } else {
    setShowtimeContainer(false)
    }
  }}

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
    {showtimeData.map((show, index) => (
      <div className="showtime-container" key={index}>
        <div className='block'>
          <p>{show.showtime}</p>
        </div>
        <div className='block'>
          <p>{show.movieTitle}</p>
        </div>
        <div className='block'>
          <p>{selectedKino}</p>
        </div>
        <div className='block'>
          <img src = {show.imageURL} alt = "movie posteri"></img>
        </div>
      </div>
      ))}
      </>
    )}
  </div>
)}