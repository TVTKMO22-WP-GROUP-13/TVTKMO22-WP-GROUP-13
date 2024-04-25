import React, { useState, useEffect } from 'react';
import './Dinnkino.css';
import axios from 'axios';
import { jwtToken } from '../components/AuSignal';

export default function UserFavorites() {
  const [favorites, setFavorites] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get('http://localhost:3001/list_entry/getUserFavorites', {
          headers: {
            Authorization: `Bearer ${jwtToken.value}`,
          },
        })
        const favoritesData = response.data
        if (!favoritesData || !favoritesData.favorites || favoritesData.favorites.length === 0) {
          setLoading(false)
          return
        }
        //console.log('Favorites:', favoritesData.favorites)
        
        const allFavorites = await Promise.all(
          favoritesData.favorites.map(async (favorite) => {
            //console.log("favorite", favorite)
            const { media_id, entry_id } = favorite
            const mediaResponse = await axios.get(`http://localhost:3001/media/getMedia/${media_id}`)
            const { tmdb_id, media_type } = mediaResponse.data.media
            const mediaDetails = media_type === 'movie' ? 'tmdb/movie' : 'tmdb/tv'
            const mediaResponseDetails = await axios.get(`http://localhost:3001/${mediaDetails}/${tmdb_id}`)
            const responseData = mediaResponseDetails.data
            return {
              id: responseData.id,
              title: responseData.title || responseData.name,
              poster_path: responseData.poster_path,
              release_date: responseData.release_date || responseData.first_air_date,
              number_of_seasons: responseData.number_of_seasons,
              entry_id,
            }
          })
        )
        //console.log("allFavorites", allFavorites)
        setFavorites(allFavorites)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching favorites:', error)
        setError('Error fetching favorites')
        setLoading(false)
      }
    }

    fetchFavorites()
  }, [])

  const handleDeleteFav = async (entry_id) => {
    try {
      await axios.delete('http://localhost:3001/list_entry/removeEntry', {
        headers: {
          Authorization: `Bearer ${jwtToken.value}`,
        },
        data: {
          entry_id,
          list_type: 'Favorite',
        },
      })
      setFavorites((prevFavorites) => prevFavorites.filter((favorite) => favorite.entry_id !== entry_id))
    } catch (error) {
      console.error('Error deleting favorite:', error)
      setError('Failed to delete favorite')
    }
  };

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  return (
    <div className="everything-wrapper">
      <h1>Favorites</h1>
      {favorites.length === 0 && <div>No favorites found :( </div>}
      <div className="ew">
        {favorites.map((favorite) => (
          <div key={favorite.id} className="card">
            <img src={`https://image.tmdb.org/t/p/w500${favorite.poster_path}`} alt={favorite.title} />
            <div className="card-content">
              <h2>{favorite.title}</h2>
              <h3>Release date: {favorite.release_date}</h3>
              {favorite.number_of_seasons && <h3>Seasons: {favorite.number_of_seasons}</h3>}
              <div className="SELECT-content">
                <button onClick={() => handleDeleteFav(favorite.entry_id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}