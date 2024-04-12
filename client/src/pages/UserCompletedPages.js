import React from 'react'
import './UserFavoritesWatchingPlanningCompleted.css'

export default function ComplitedPages() {
  return (
    <div class="wrapperi">
      <h1>Mitä käyttäjä on katsonut</h1>

      <div class="flex-container">
        {/* Kuva elokuvasta/sarjasta */}
        <div class="movie">Movie</div>

        {/* TMDB luokitus */}
        <div class="rating">TMDB rating</div>

        {/* Kuvaus */}
        <div class="description">Description</div>

        {/* Julkaisuvuosi ja kaudet */}
        <div class="release">Release year, seasons</div>
      </div>

    </div>
  )
}
