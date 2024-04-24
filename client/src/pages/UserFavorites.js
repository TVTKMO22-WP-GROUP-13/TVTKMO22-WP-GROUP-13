import React, {useState, useEffect} from 'react' 
//import './UserFavoritesWatchingPlanningCompleted.css'
import './Dinnkino.css'
import axios from 'axios'
import { jwtToken } from '../components/AuSignal'

export default function UserFavorites() {
  const [FAVORIITIT, setFavorites] = useState([])
  const [noFavorites, setNoFavorites] = useState(false)

  useEffect(() => {
    const fetchFavorites = async () => { 
      try {
        const response = await axios.get(`http://localhost:3001/list_entry/getUserFavorites`, {
          headers: {
            'Authorization': `Bearer ${jwtToken.value}`
          }
        })
        const favoritesData = response.data;
        const favorites = favoritesData.favorites;
        const allFavorites = [];
    
        for (let i = 0; i < favorites.length; i++) {
          const favorite = favorites[i];
          const media_id = favorite.media_id;
          const mediaResponse = await axios.get(`http://localhost:3001/media/getMedia/${media_id}`);
          const { tmdb_id, media_type } = mediaResponse.data.media;
          //console.log('TMDB ID:', tmdb_id);
          //console.log('Media type:', media_type);
    
          if (media_type === 'movie') {
            const movieResponse = await axios.get(`http://localhost:3001/tmdb/movie/${tmdb_id}`);
            const movieData = movieResponse.data;
            console.log('Movie data:', tmdb_id, media_type)
            const movie = {
              id: movieData.id,
              original_title: movieData.original_title,
              poster_path: movieData.poster_path,
              release_date: movieData.release_date
            };
            //console.log('Movie:', movie);
            allFavorites.push(movie);
          } else if (media_type === 'tv') {
            //console.log("inside loop")
            //console.log("tvid", tmdb_id, media_type)
            const tvShowResponse = await axios.get(`http://localhost:3001/tmdb/tv/${tmdb_id}`);
            const tvShowData = tvShowResponse.data;
            //console.log('tv show:', tvShowResponse.data)
            //console.log('TV Show data:', tvShowData);
            const tvShow = {
              id: tvShowData.id,
              name: tvShowData.name,
              poster_path: tvShowData.poster_path,
              first_air_date: tvShowData.first_air_date,
              number_of_seasons: tvShowData.number_of_seasons
            };
            //console.log('TV Show:', tvShow)
            allFavorites.push(tvShow);
          }
        }
        setFavorites(allFavorites);
        console.log('Favorites:', allFavorites);
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    };

    fetchFavorites();
    
  }, []); 
console.log('Favoritessssssss:', FAVORIITIT);
  return (
    <div className="everything-wrapper">
      <h1>Favorites</h1>
  
      {noFavorites ? (
        <div>No favorites found</div>
      ) : (
        <div className="ew">
          {FAVORIITIT.map((favorite) => (
            <div key={favorite.id} className="card">
              <img src={`https://image.tmdb.org/t/p/w500${favorite.poster_path}`} alt={favorite.original_title || favorite.name} />
              <div className="card-content">
                <h2>{favorite.original_title || favorite.name}</h2>
                <h3>Release date: {favorite.release_date || favorite.first_air_date}</h3>
                {favorite.number_of_seasons && (
                <h3>Seasons: {favorite.number_of_seasons}</h3>
              )}
              </div>
            </div>
            
          ))}
 </div>
)}      
    </div>
  )
}
