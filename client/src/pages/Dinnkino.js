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


  //Haetaan teatteri Id:t ensimmäiseen dropdowniin
useEffect(() => {
  axios.get('https://www.finnkino.fi/xml/TheatreAreas/')
    .then(response => {
        const parser = new DOMParser()
        const xmlDoc = parser.parseFromString(response.data, 'text/xml')
        const areas = xmlDoc.getElementsByTagName('TheatreArea')
        const areasArray = Array.from(areas).map(area => ({
          areaId: area.querySelector('ID').textContent,
          name: area.querySelector('Name').textContent
        }))
      //console.log("Teatteri id: ", areasArray)
       setTheatreAreas(areasArray);
    })
    .catch(error => console.error('Error fetching theatre areas:', error))
}, [])

  //Päivämäärät toiseen dropdowniin, näyttää 14 seuraavaa päivää milloin on näytöksiä valitussa teatterissa toiseen dropdowniin
useEffect(() => {
  if (selectedKino) {
    //console.log("Kino", selectedKino)
    axios.get(`https://www.finnkino.fi/xml/ScheduleDates/?area=${selectedKino}`)
      .then(response => {
        const parser = new DOMParser()
        const xmlDoc = parser.parseFromString(response.data, 'text/xml')
        const dateElements = xmlDoc.getElementsByTagName('dateTime')
        const today = new Date()
        const formattedDatesArray = Array.from(dateElements)
          .map(dateElement => new Date(dateElement.textContent))
          .filter(date => date >= today)
          .slice(0, 14)
          .map(date => {
            const day = String(date.getDate()).padStart(2, '0')
            const month = String(date.getMonth() + 1).padStart(2, '0')
            const year = date.getFullYear()
            return `${day}.${month}.${year}`
          })
        setshowDates(formattedDatesArray)
        //console.log(formattedDatesArray)
      })
    .catch(error => console.error('Error fetching dates:', error))
  }
}, [selectedKino])

//Haetaan näytettävät elokuvat, jotka on valitussa teatterissa valittuna päivänä kolmanteen dropdowniin
useEffect(() => {
  if (selectedKino && selectedDate) {
    //console.log("päivä", selectedDate)
    //console.log("Kino", selectedKino)
    axios.get(`https://www.finnkino.fi/xml/Schedule/?area=${selectedKino}&dt=${selectedDate}&eventID=ALL`)
      .then(response => {
        const parser = new DOMParser()
        const xmlDoc = parser.parseFromString(response.data, 'text/xml')
        const showElements = xmlDoc.getElementsByTagName('Show')
        const moviesArray = Array.from(showElements).map(show => ({
          eventId: show.querySelector('EventID').textContent,
          title: show.querySelector('Title').textContent
        })).filter(movie => movie.title !== "Leffasynttärit" && movie.title !== "Oma näytös")
        setMovies(moviesArray)
        //console.log("Movies", moviesArray)
      })
    .catch(error => console.error('Error fetching movies:', error))
  }
}, [selectedKino, selectedDate])
 
//Hakunappi, hakee valittujen asioiden avulla haussa näkyvät tiedot
const handleSearch = () => {
  if (selectedKino && selectedDate && selectedMovie) {
    setShowtimeContainer(true)
    const selectMovieDets = moviesFinni.find(movie => movie.eventId === selectedMovie)
        if(selectMovieDets) {
          const movieTitteli = selectMovieDets.title
          //const MovieImgaage = selectMovieDets.imageURL
          //const scheduleURL = `https://www.finnkino.fi/xml/Schedule/?area=${selectedKino}&dt=${selectedDate}&eventID=${selectedMovie}`
          //axios.get(scheduleURL)
          //const eventURL = `https://www.finnkino.fi/xml/Events/`
          axios.get(`https://www.finnkino.fi/xml/Schedule/?area=${selectedKino}&dt=${selectedDate}&eventID=${selectedMovie}`)
            .then(response => {
              const parser = new DOMParser()
              const xmlDoc = parser.parseFromString(response.data, 'text/xml')
              const showElements = xmlDoc.getElementsByTagName('Show')
              const showtimeData = []

                for (let i = 0; i < showElements.length; i++) {
                  const show = showElements[i]
                  const rawShowtime = show.querySelector('dttmShowStart').textContent
                  //const rawShowEnd = show.querySelector('dtmmShowEnd').textContent
                  const showtime = new Date(rawShowtime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'})
                  //const showend = new Date(rawShowEnd).toLocaleTimeString([],{hour: '2-digit', minute: '2-digit'})
                  const theaterName = show.querySelector('Theatre').textContent
                  const imageURL = show.querySelector('EventSmallImagePortrait').textContent
                  const auditrium = show.querySelector('TheatreAndAuditorium').textContent
                  const MovieLenght = show.querySelector('LengthInMinutes').textContent
                  const movieLenghtH = Math.floor(MovieLenght / 60)
                  const movieLenghtM = MovieLenght % 60
                  const MovieL = `${movieLenghtH}h ${movieLenghtM}min`;

                  const areaName = theatreAreas.find(area=>area.areaId === selectedKino)?.name || []
            
                    showtimeData.push({
                    showtime: showtime,
                    //showend: showend,
                    movieTitle: movieTitteli,
                    theaterName: theaterName,
                    areaName: areaName,
                    imageURL: imageURL,
                    auditrium: auditrium,
                    MovieL: MovieL
                    })
                }
            setShowtimeData(showtimeData)
            //console.log("Showdata", showtimeData)
            })
        } else {
          setShowtimeContainer(false)
          }
  }
}

return (
  <div className="everything-wrapper">
    <div className='dropdown'>
    {/* Kino dropdown */}
      <select value={selectedKino} onChange={(e) => setSelectedKino(e.target.value)}>
          {theatreAreas.map(area => (
            <option key={area.areaId} value={area.areaId}>{area.name}</option>
          ))}
      </select>

    {/* Date dropdown */}
      <select value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)}>
        <option value="Pick a date">Pick a date</option>
        {showdates.map(date => (
          <option key={date} value={date}>{date}</option>
          ))}
      </select>

    {/* Movie dropdown */}
      <select value={selectedMovie} onChange={(e) => setSelectedMovie(e.target.value)}>
        <option value="Pick a movie">Pick a movie</option>
        {moviesFinni.reduce((uniqueMovies, movie) => {
          if (!uniqueMovies.find(item => item.eventId === movie.eventId)) {
            uniqueMovies.push(movie)
          }
          // console.log("uniw", uniqueMovies)
        return uniqueMovies
        }, []).map(movie => (
        <option key={movie.eventId} value={movie.eventId}>{movie.title}</option>
        ))}
    </select>

    {/* Search button */}
      <button onClick={handleSearch}>Search</button>
        </div>  
          {showShowtimeContainer && (
          <>
          {showtimeData.map((show, index) => (
            <div className="card" key={index}>
              <div className="card-header">
                <h1>{show.showtime}</h1>
                <p>Kesto: {show.MovieL}</p>
              </div>
              <div className="card-content">
                <h2>{show.movieTitle}</h2>
                <h3>{show.auditrium}</h3>
              </div>
          <img src={show.imageURL} alt="movie poster" />
        </div>
          ))}
          </>
          )}
  </div>
)}