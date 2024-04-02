import { Link } from 'react-router-dom'
import './UserProfile.css'
import React from 'react'

export default function UserProfile() {
  return (
    <>
    <div className='Konkka'>
    <div className='KolmeEkaa'>
    <div className='Kaikki' id='UserProfileAndAva'>
        <p>UserProfile</p>
    </div>
    <div className='Kaikki' id='ReviewsDiv'> 
        <p> <Link to="/TopMovies">Reviews</Link></p>
    </div>
    <div className='Kaikki' id='Listat'>
        <p><Link to="/TopMovies">Completed</Link></p>
        
        <p><Link to="/TopMovies">Watching</Link></p>
        <p><Link to="/TopMovies">Plan to watch</Link></p>
        
    </div>
    </div>
    <div className='ToisetKolme'>
    <div className='Kaikki' id='Favourites'> 
    <p> <Link to="/TopMovies">Favourites</Link></p>
 
    </div>
    <div className='Kaikki' id='LastWatched'> 
    <p> Last Watched</p>
    </div>
    <div className='Kaikki' id='Groups'>
    <p>Groups</p> 
    </div>
    </div>
    </div>
    </>
  )

}
