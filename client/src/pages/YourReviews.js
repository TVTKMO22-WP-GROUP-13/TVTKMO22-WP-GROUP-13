import { Link, Navigate } from 'react-router-dom'
import React from 'react'
import './YourReviews.css'

export default function YourReviews({user}) {
    if (user === null){
        return <Navigate to='/login' />
      }
  return (
    <div class="wrapperi">
      <h1>User xxx reviews</h1>

      <div class="flex-container">
        {/* Kuva elokuvasta/sarjasta */}
        <div class="movie">Movie</div>

        {/* Tähtiarvostelu */}
        <div class="stars">Stars</div>

        {/* Arvosteluteksti */}
        <div class="text">Review text</div>
      </div>

    </div>
  )
}
