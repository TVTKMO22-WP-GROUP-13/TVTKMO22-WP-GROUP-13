import './Home.css'
import React, {useEffect, useState, useRef} from 'react'
import axios from 'axios'

export default function Home() {
  const itemsRef = useRef(null)
  const[isMouseDown, setIsMousedown] = useState(false)
  const[startX, setStartX] = useState(0)
  const[scrollLeft, setScrollLeft] = useState(0)
  const [nowInTheat, setNowInTheat] = useState([])
  const [trenDing, setTrenDing] = useState([])
  const [weekly, setSweekly] = useState('day')


    useEffect(() =>{
      axios.get('https://www.finnkino.fi/xml/Events/?listType=ComingSoon')
      .then(response =>{
        const parseri = new DOMParser()
        const eloXmlDoc = parseri.parseFromString(response.data, 'text/xml')
        const eventit = eloXmlDoc.getElementsByTagName('Event')
        const eventtiArray = Array.from(eventit).map(eventti =>({
          id: eventti.querySelector('ID').textContent,
          title: eventti.querySelector('Title').textContent,
          image: eventti.querySelector('EventLargeImagePortrait').textContent,
          eventtiUrl: eventti.querySelector('EventURL').textContent,
          orgTitle: eventti.querySelector('OriginalTitle').textContent,
          prodYear: eventti.querySelector('ProductionYear').textContent,
          synop: eventti.querySelector('ShortSynopsis').textContent
        }))
       // console.log("toimiiko array", eventtiArray)
          setNowInTheat(eventtiArray)
          trendingSer();
      })
      .catch(error => console.error('joku men vituiks taas'))
    }, [])

    const trendingSer = () => {
    
     // https://api.themoviedb.org/3/trending/tv/day?api_key=ff47a1b37c1fd896de8d2445a40d77a1
      axios.get(`http://localhost:3001/tmdb/trending/tv/${weekly}`)
        .then(response => {
          console.log("mitä täällä on", response.data)
          const testi = response.data
          const eventtiArray = testi.results.map(eventti => ({
            id: eventti.id,
            backdrop_path: eventti.backdrop_path,
            name: eventti.title,
            image: eventti.poster_path,
            orgname: eventti.original_name,
          }))
          console.log("toimiiko array12", eventtiArray)
          setTrenDing(eventtiArray)
        })
        .catch(error => console.error('joku men vituiks 2'))
    };

    const buttoni = () =>{
      const newTimeWindow = weekly === 'week' ? 'day' : 'week';
      setSweekly(newTimeWindow);
      trendingSer();
    }

    const handleMouseDown =(e) => {
        setIsMousedown(true)
        setStartX(e.pageX - - itemsRef.current.offsetLeft)
        setScrollLeft(itemsRef.current.scrollLeft)
    }
    const handleMouseLeave =() => {
     
      setIsMousedown(false)
      
    }
    const handleMouseUp =() => {
      setIsMousedown(false)
    }
    const handleMouseMove =(e) => {
     
     if(!isMouseDown) return;
     e.preventDefault()
     const x=e.pageX - itemsRef.current.offsetLeft
     const speed = (x-startX)*1 //vauhti
     itemsRef.current.scrollLeft=scrollLeft - speed
    }
    const handleWheelScroll =(event) =>{
      const delta = Math.sign(event.deltaY)
      itemsRef.current.scrollLeft += delta *100; //vauhtijälleen
    }

    return (
      <> 
      <div className='container2'>         
        <h2 className='FincomSon'>Finnkino coming soon</h2>
      
      <div className="konkkaa" ref={itemsRef}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onWheel={handleWheelScroll}
      >
        {
            nowInTheat.map(eventti => (
          <div key={eventti.id} className="movie2">
            <a className='EventtiUrl' href={eventti.eventtiUrl} target="_blank" rel="noopener noreferrer">
            <h2 className='movieTitle'>{eventti.title} </h2>
            <img className='movieImage' src={eventti.image} alt={eventti.title} />
              
              </a>
          </div>
        ))}
      </div>
      </div>
      <h2 className='FincomSon'> TMDB Trending series 
        <button className='weeklyButton' onClick={buttoni}>Daily / Weekly</button> </h2>

      <div className='toinenDiv'>
      {
            trenDing.map(movie => (
          <div key={movie.id} className="movie2">
            <a href={`https://www.themoviedb.org/tv/${movie.id}`} target="_blank" rel="noopener noreferrer">
            
            <img className='movieImage' src={`https://image.tmdb.org/t/p/w500/${movie.image}`} alt={movie.title} />
              
              </a>
          </div>
        ))}
        
         </div>   
      </>  
    );
  }
