import React, { useState, useEffect } from 'react'
import { jwtToken } from '../components/AuSignal';
import './YourReviews.css'
import axios from 'axios'

export default function YourReviews() {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('http://localhost:3001/review/all', {
          headers: {
            Authorization: `Bearer ${jwtToken.value}`,
          },
        })
        const reviewsData = response.data
        if (!reviewsData || !reviewsData.reviews || reviewsData.reviews.length === 0) {
          setLoading(false)
          return
        }
        //console.log('Reviews:', reviewsData.reviews)

        const allReviews = await Promise.all(
          reviewsData.reviews.map(async (review) => {
            //console.log("review", review)
            const { media_id, rating, review_text, user_id, review_id } = review
            const mediaResponse = await axios.get(`http://localhost:3001/media/getMedia/${media_id}`)
            const { tmdb_id, media_type } = mediaResponse.data.media
            const mediaDetails = media_type === 'movie' ? 'tmdb/movie' : 'tmdb/tv'
            const mediaResponseDetails = await axios.get(`http://localhost:3001/${mediaDetails}/${tmdb_id}`)
            const responseData = mediaResponseDetails.data
            const usernameResponse = await axios.get(`http://localhost:3001/user_data/user_id?user_id=${user_id}` )
            const username = usernameResponse.data.user.username
            return {
              id: responseData.id,
              title: responseData.title || responseData.name,
              poster_path: responseData.poster_path,
              release_date: responseData.release_date || responseData.first_air_date,
              number_of_seasons: responseData.number_of_seasons,
              rating,
              review_text,
              username,
              review_id
            }
          })
        )
        //console.log("allReviews", allReviews)
        setReviews(allReviews)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching reviews:', error)
        setError('Error fetching reviews')
        setLoading(false)
      }
    }
  
    fetchReviews()
  }, [])

  const handleDeleteReview = async (review_id) => {
    try {
      await axios.delete('http://localhost:3001/review/deleteReview', {
        headers: {
          Authorization: `Bearer ${jwtToken.value}`,
        },
        data: {
          review_id,
        },
      })
      setReviews((reviews) => reviews.filter((review) => review.review_id !== review_id))
    } catch (error) {
      console.error('Error deleting review:', error)
      setError('Failed to delete review')
    }
  };

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  return (
    <div className="wrapperI">
      <h1>Reviews</h1>
      {error && <div>{error}</div>}
      <ul>
        <div className="flex-containerI">
        {reviews.map((review) => (
          <div key={review.id} className="review">
            <div>
              <img src={`https://image.tmdb.org/t/p/w185${review.poster_path}`} alt={review.title} />
            </div>
            <div className="review-content">
              <h2>{review.title}</h2>
              <p>Release Date: {review.release_date}</p>
              <p>Number of Seasons: {review.number_of_seasons}</p>
              <p>By: {review.username}</p>
              <p>Rating: {review.rating}</p>
              <p>Review: {review.review_text}</p>
              <button onClick={() => handleDeleteReview(review.review_id)}>Delete Review</button>
            </div>
          </div>
        ))}
        </div>
      </ul>
    </div>
  )
}