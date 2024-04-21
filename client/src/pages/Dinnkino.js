import './Dinnkino.css'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { jwtToken } from '../components/AuSignal';


export default function Dinnkino() {
  const [selectedKino, setSelectedKino] = useState('')
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedMovie, setSelectedMovie] = useState('')
  const [showShowtimeContainer, setShowtimeContainer] = useState(false)
  const [theatreAreas, setTheatreAreas] = useState([])
  const [showdates, setshowDates] = useState([])
  const [moviesFinni, setMovies] = useState([])
  const [showtimeData, setShowtimeData] = useState([])
  const [showShowtimeSelectContainer, setShowtimeSelectContainer] = useState(false)
  const [KKuserGroups, KKsetUserGroups] = useState('')
  const [createdGroups, setCreatedGroups] = useState([]);
  const [joinedGroups, setJoinedGroups] = useState([]);

useEffect(() => {
  const GetGroups = async (url, setUserGroups, groupType) => {
    console.log(`Get ${groupType} groups`)
    try {
      const response = await axios.get(url, {
        headers: {
          'Authorization': `Bearer ${jwtToken.value}`
        }
      })
      console.log(`${groupType} groups`, response.data)
      const groupData = groupType === 'created' ? response.data.groups : response.data.groupsJoined
      if (groupData && groupData.length > 0) {
        setUserGroups(groupData)
        setShowtimeContainer(true)
      } else {
        console.log(`No ${groupType} groups found`)
      }    
    } catch (error) {
      console.error(`Error fetching ${groupType} groups:`, error)
    }
  }
 
  if(jwtToken.value) {
    GetGroups('http://localhost:3001/user_group/getUserCreatedGroups', setCreatedGroups, 'created');
    GetGroups('http://localhost:3001/group_member/groups_joined', setJoinedGroups, 'joined');
    setShowtimeSelectContainer(true)
  } else {
    console.log("no token")
    setShowtimeSelectContainer(false)
  }
}, [])

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
 

const fetchSelectedMovie = () => {
  const selectMovieDets = moviesFinni.find(movie => movie.eventId === selectedMovie)
  if(selectMovieDets) {
    const movie_title = selectMovieDets.title
    axios.get(`https://www.finnkino.fi/xml/Schedule/?area=${selectedKino}&dt=${selectedDate}&eventID=${selectedMovie}`)
      .then(response => {
        const parser = new DOMParser()
        const xmlDoc = parser.parseFromString(response.data, 'text/xml')
        const showElements = xmlDoc.getElementsByTagName('Show')
      
        const showtimeData = parseShowElements(showElements, movie_title)
        setShowtimeData(showtimeData)
        setShowtimeContainer(true)
      })
      .catch(error => {
        console.error('Error fetching selected movie:', error)
      })
  } else {
    setShowtimeContainer(false)
  }
}

const fetchAllMovies = () => {
  axios.get(`https://www.finnkino.fi/xml/Schedule/?area=${selectedKino}&dt=${selectedDate}&eventID=ALL`)
    .then(response => {
      const parser = new DOMParser()
      const xmlDoc = parser.parseFromString(response.data, 'text/xml')
      const showElements = xmlDoc.getElementsByTagName('Show')
      
      // Parse and set showtime data for all movies
      const allMoviesShowtimeData = parseShowElements(showElements, "All movies")
      setShowtimeData(allMoviesShowtimeData)
      setShowtimeContainer(true)
    })
    .catch(error => {
      console.error('Error fetching all movies:', error)
    })
}

const parseShowElements = (showElements) => {
  const showtimeData = []

  for (let i = 0; i < showElements.length; i++) {
    const show = showElements[i]
    const rawShowtime = show.querySelector('dttmShowStart').textContent;
    const showtime = new Date(rawShowtime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'})
    const theater_name = show.querySelector('Theatre').textContent
    const movie_title = show.querySelector('Title').textContent
    const imageURL = show.querySelector('EventSmallImagePortrait').textContent
    const auditrium = show.querySelector('TheatreAndAuditorium').textContent
    const MovieLenght = show.querySelector('LengthInMinutes').textContent
    const movieLenghtH = Math.floor(MovieLenght / 60)
    const movieLenghtM = MovieLenght % 60
    const MovieL = `${movieLenghtH}h ${movieLenghtM}min`

    const areaName = theatreAreas.find(area=>area.areaId === selectedKino)?.name || []

    const showtimeItem = { 
      showtime: showtime,
      movie_title: movie_title,
      theater_name: theater_name,
      areaName: areaName,
      imageURL: imageURL,
      auditrium: auditrium,
      MovieL: MovieL
    }

    showtimeData.push(showtimeItem)
  }

  return showtimeData;
}


const handleSearch = () => {
  if (selectedKino && selectedDate && selectedMovie) {
    if (selectedMovie === "All movies") {
      fetchAllMovies()

    } else {
      fetchSelectedMovie()
    }
  }
}


//Hakunappi, hakee valittujen asioiden avulla haussa näkyvät tiedot
/*const handleSearch = () => {
    if (selectedKino && selectedDate && selectedMovie) {
          setShowtimeContainer(true)
    const selectMovieDets = moviesFinni.find(movie => movie.eventId === selectedMovie)
        if(selectMovieDets) {
          const movie_title = selectMovieDets.title
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
                  const theater_name = show.querySelector('Theatre').textContent
                  const imageURL = show.querySelector('EventSmallImagePortrait').textContent
                  const auditrium = show.querySelector('TheatreAndAuditorium').textContent
                  const MovieLenght = show.querySelector('LengthInMinutes').textContent
                  const movieLenghtH = Math.floor(MovieLenght / 60)
                  const movieLenghtM = MovieLenght % 60
                  const MovieL = `${movieLenghtH}h ${movieLenghtM}min`

                  const areaName = theatreAreas.find(area=>area.areaId === selectedKino)?.name || []
            
                    const showtimeItem = { 
                    showtime: showtime,
                    movie_title: movie_title,
                    theater_name: theater_name,
                    areaName: areaName,
                    imageURL: imageURL,
                    auditrium: auditrium,
                    MovieL: MovieL
                    }
               showtimeData.push(showtimeItem)
              }
            setShowtimeData(showtimeData)
            //console.log("Showdata", showtimeData)
            })
        } else {
          setShowtimeContainer(false)
          }
        
  }
}*/

const handleSelectedShowtime = (showtimeItem, selectedGroupId) => {
  const { showtime, theater_name, movie_title } = showtimeItem
  console.log("ShowD", showtimeItem)

  const showtimeData = {
    showtime: showtime,
    theater_name: theater_name,
    group_id: selectedGroupId,
    movie_title: movie_title
  }
  console.log("SHowPush", showtimeData)
  axios.post('http://localhost:3001/showtime/addShowtime', showtimeData, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwtToken}`
    }
  } )
    .then(response => {
      console.log('Showtime added successfully:', response.data.message);
    })
    .catch(error => {
      console.error('Error adding showtime:', error);
    });
};

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
      <option value="Pick a date">Valitse päivä</option>
        {showdates.map(date => (
        <option key={date} value={date}>{date}</option>
        ))}
      </select>

      {/* Movie dropdown */}
      <select value={selectedMovie} onChange={(e) => setSelectedMovie(e.target.value)}>
      <option value="Pick a movie">Valitse elokuva</option>
      <option value="All movies">Kaikki elokuvat</option>
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
      <button onClick={handleSearch}>Etsi</button>
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
          <h2>{show.movie_title}</h2>
          <h3>{show.auditrium}</h3>

          <div className="ShowtimeSELECT-content">
          {/* Select button - only visible if user is logged in and in a specific group */}
          {showShowtimeSelectContainer && (
            <div>
              <select value={KKuserGroups} onChange={(e) => KKsetUserGroups(e.target.value)}>
              <option value="">Valitse ryhmä</option>
              {createdGroups.map(group => (
              <option key={group.group_id} value={group.group_id}>{group.group_name}</option>
              ))}
              {joinedGroups.map(group => (
              <option key={group.group_id} value={group.group_id}>{group.group_name}</option>
              ))}
              </select>
              <button onClick={() => handleSelectedShowtime(show, KKuserGroups)}>Valitse</button>
            </div>
          )}
          </div>
        </div>
        <img src={show.imageURL} alt="movie poster"/>
      </div>
      ))}
    </>
    )}
  </div>
)}