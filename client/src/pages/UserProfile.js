import { Link, Navigate } from 'react-router-dom'
import './UserProfile.css'
import React from 'react'

export default function UserProfile({user}) {
    const Num = 10;
    if (user === null){
      return <Navigate to='/login' />
    }
  return (
    <>
    <div className='Konkka'>
    <div className='KolmeEkaa'>
    <div className='Kaikki' id='UserProfileAndAva'>
        <p>User xxx Profile</p>
    </div>
    <div className='Kaikki' id='ReviewsDiv'> 
        <p> <Link to="/TopMovies">Reviews</Link></p>
        <p id='Review'> Review 1</p>
        <p id='Review'> Review 2</p>
        <p id='Review'> Review 3</p>
        <p id='Review'> Review 4</p>
        <p id='Review'> Review 5</p>
    </div>
    <div className='Kaikki' id='Listat'>
        <p id='Lista'><Link to="/UserCompletedPages">Completed </Link>{Num}</p>
        <p id='Lista'><Link to="/UserWatchingPages">Watching </Link>{Num}</p>
        <p id='Lista'><Link to="/UserPlanToWatchPages">Plan to watch </Link>{Num}</p>
        
    </div>
    </div>
    <div className='ToisetKolme'>
    <div className='Kaikki' id='Favourites'> 
    <p> <Link to="/UserFavorites">Favourites</Link></p>
    <p id='Favori'> favo 1</p>
    <p id='Favori'> favo 2</p>
    <p id='Favori'> favo 3</p>
    <p id='Favori'> favo 4</p>
    <p id='Favori'> favo 5</p>
 
    </div>
    <div className='Kaikki' id='LastWatched'> 
    <p> Last Watched</p>
    <p id='Lwatched'> Movie 1</p>
    <p id='Lwatched'> Movie 2</p>
    <p id='Lwatched'> Movie 3</p>
    <p id='Lwatched'> Movie 4</p>

    </div>
    <div className='Kaikki' id='Groups'>
    <p>Groups</p> 
    <p id='GroupsID'> Group 1</p>
    <p id='GroupsID'> Group 2</p>
    <p id='GroupsID'> Group 3</p>
    <Link to='/MakeGroup'>
    <button id='MakeGroupButton' type='button'> Make Group</button>
    </Link>
    </div>
    </div>
    </div>
    </>
  )

}
