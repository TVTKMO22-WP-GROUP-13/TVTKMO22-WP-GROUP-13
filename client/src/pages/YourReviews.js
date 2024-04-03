import { Link, Navigate } from 'react-router-dom'
import React from 'react'

export default function YourReviews({user}) {
    if (user === null){
        return <Navigate to='/login' />
      }
  return (
    <div>Käyttäjän kaikki revit tänne</div>
  )
}
