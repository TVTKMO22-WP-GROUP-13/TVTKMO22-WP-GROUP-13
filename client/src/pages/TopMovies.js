import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function TopSeries() {
  const [topSer, setTopSer] = useState([])
  useEffect(() => {

    axios.get(`http://localhost:3001/tmdb/movie/top_rated`)
      .then(response => {
        const testi = response.data
        const eventtiArray = testi.results.map(eventti => ({
          id: eventti.id,
          backdrop_path: eventti.backdrop_path,
          name: eventti.title,
          image: eventti.poster_path,
          orgname: eventti.original_title,
          first_air_date: eventti.release_date,
        }))
        setTopSer(eventtiArray)
      })
      .catch(error => console.error('joku men vituiks taas2'))
  }, [])

  return (
    <div>
      <h2>Top rated movies</h2>
      <ul>
        {topSer.map((serie) => (
          <li key={serie.id}>
            <a href={`https://www.themoviedb.org/movie/${serie.id}`} target="_blank" rel="noopener noreferrer">
              <h3>{serie.name}</h3>
              <img src={`https://image.tmdb.org/t/p/w500/${serie.image}`} alt={serie.name} />
            </a>
            <p>Original Name: {serie.orgname}</p>
            <p>Release date: {serie.first_air_date}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
