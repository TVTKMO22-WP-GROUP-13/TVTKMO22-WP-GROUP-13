import './Home.css'
import React, {useEffect, useState, useRef} from 'react'
import axios from 'axios'

export default function Home() {
  const itemsRef = useRef(null)
  const[isMouseDown, setIsMousedown] = useState(false)
  const[startX, setStartX] = useState(0)
  const[scrollLeft, setScrollLeft] = useState(0)
  const [nowInTheat, setNowInTheat] = useState([])

  
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
      })
      .catch(error => console.error('joku men vituiks taas'))
    }, [])

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
            nowInTheat.map(movie => (
          <div key={movie.id} className="movie2">
            <a className='EventtiUrl' href={movie.eventtiUrl} target="_blank" rel="noopener noreferrer">
            <h2 className='movieTitle'>{movie.title} </h2>
            <img className='movieImage' src={movie.image} alt={movie.title} />
              
              </a>
          </div>
        ))}
      </div>
      </div>
      <h2 className='FincomSon'>TMDB Trending series</h2>

      <div className='toinenDiv'>
      {
            nowInTheat.map(movie => (
          <div key={movie.id} className="movie2">
            <a className='EventtiUrl' href={movie.eventtiUrl} target="_blank" rel="noopener noreferrer">
            <h2 className='movieTitle'>{movie.title} </h2>
            <img className='movieImage' src={movie.image} alt={movie.title} />
              
              </a>
          </div>
        ))}
        
         </div>   
      </>  
    );
  }
