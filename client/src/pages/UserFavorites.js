import React, {useState, useEffect} from 'react' 
//import './UserFavoritesWatchingPlanningCompleted.css'
import './Dinnkino.css'
import axios from 'axios'
import { jwtToken } from '../components/AuSignal'

export default function UserFavorites() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavorites = async () => { 
      try {
        const response = await axios.get(`http://localhost:3001/list_entry/getUserFavorites`, {
          headers: {
            'Authorization': `Bearer ${jwtToken.value}`
          }
        });
        const favoritesData = response.data;
        if (!favoritesData.favorites) {
          setFavorites([])
        } else {
          const allFavorites = await Promise.all(favoritesData.favorites.map(async (favorite) => {
            const media_id = favorite.media_id
            const mediaResponse = await axios.get(`http://localhost:3001/media/getMedia/${media_id}`)
            const { tmdb_id, media_type } = mediaResponse.data.media;
            let entry_id = favorite.entry_id
      
            if (media_type === 'movie') {
              const movieResponse = await axios.get(`http://localhost:3001/tmdb/movie/${tmdb_id}`)
              const movieData = movieResponse.data
              return {
                id: movieData.id,
                title: movieData.title,
                poster_path: movieData.poster_path,
                release_date: movieData.release_date,
                entry_id: entry_id
              }
            } else if (media_type === 'tv') {
              const tvShowResponse = await axios.get(`http://localhost:3001/tmdb/tv/${tmdb_id}`)
              const tvShowData = tvShowResponse.data;
              return {
                id: tvShowData.id,
                name: tvShowData.name,
                poster_path: tvShowData.poster_path,
                first_air_date: tvShowData.first_air_date,
                number_of_seasons: tvShowData.number_of_seasons,
                entry_id: entry_id
              }
            }
          }))
          setFavorites(allFavorites)
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching favorites:', error)
        setError('Failed to fetch favorites')
        setLoading(false)
      }
    }

    fetchFavorites()
  }, [])

  const handleDeleteFav = async (entry_id) => {
    try {
      const response = await axios.delete('http://localhost:3001/list_entry/removeEntry', {
        headers: {
          'Authorization': `Bearer ${jwtToken.value}`
        },
        data: {
          entry_id: entry_id,
          list_type: 'Favorite'
        }
      })
      console.log('Delete response:', response.data)
      // Remove the deleted favorite from the state
      setFavorites(prevFavorites => prevFavorites.filter(favorite => favorite.entry_id !== entry_id))
    } catch (error) {
      console.error('Error deleting favorite:', error)
      setError('Failed to delete favorite')
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  return (
    <div className="everything-wrapper">
      <h1>Favorites</h1>
      
      {favorites.length === 0 ? (
        <div>No favorites found</div>
      ) : (
        <div className="ew">
          {favorites.map((favorite) => (
            <div key={favorite.id} className="card">
              <img src={`https://image.tmdb.org/t/p/w500${favorite.poster_path}`} alt={favorite.title || favorite.name} />
              <div className="card-content">
                <h2>{favorite.title || favorite.name}</h2>
                <h3>Release date: {favorite.release_date || favorite.first_air_date}</h3>
                {favorite.number_of_seasons && (
                  <h3>Seasons: {favorite.number_of_seasons}</h3>
                )}
                <div className="SELECT-content">
                  <button onClick={() => handleDeleteFav(favorite.entry_id)}>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}