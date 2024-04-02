import './UserProfile.css'
import React from 'react'

export default function UserProfile() {
  return (
    <>
    <div className='Konkka'>
    <div className='KolmeEkaa'>
    <div className='Kaikki' id='UserProfileAndAva'>UserProfile</div>
    <div className='Kaikki' id='ReviewsDiv'> Tänne tulee userin revit</div>
    <div className='Kaikki' id='Listat'> tänne tulee listat mitä on katottu yms</div>
    </div>
    <div className='ToisetKolme'>
    <div className='Kaikki' id='Favourites'> tänne tulee käyttäjän favs</div>
    <div className='Kaikki' id='LastWatched'> Tänne tulee mitä on viimeks katottu</div>
    <div className='Kaikki' id='Groups'> ja tänne tulee käyttäjän groupit</div>
    </div>
    </div>
    </>
  )

}
