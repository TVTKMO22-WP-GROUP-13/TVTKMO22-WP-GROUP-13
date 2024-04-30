import { Link, Navigate } from 'react-router-dom'
import './UserProfile.css'
import React from 'react'
import { useSignals } from '@preact/signals-react/runtime';
import { jwtToken } from '../components/AuSignal';

export default function UserProfile() {
    const Num = 10;
    useSignals();
    if(jwtToken.value.length === 0){
      
      return <Navigate to='/login' />
    }
  return (
    <>
    <div className='Konkka'>
    <div className='KolmeEkaa'>
    <div className='Kaikki' id='ReviewsDiv'> 
        <p> <Link to="/YourReviews">Reviews</Link></p>
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

 
    </div>
    <div className='Kaikki' id='LastWatched'> 
    <p> <Link to="/UserLastWatched">Last watched</Link></p>


    </div>
    <div className='Kaikki' id='Groups'>
    <p>Groups</p> 
    <Link to='/MakeGroup'>
    <button id='MakeGroupButton' type='button'> Make Group</button>
    </Link>
    </div>
    </div>
    </div>
    </>
  )

}
