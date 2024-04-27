const { getAllReviews, getReviewsByUser, getReviewById, getReviewByMediaId, addReview, deleteReview} = require('../database/review_db');
const { getMediaByTmdbId, addMedia } = require('../database/media_db');
const { auth } = require('../middleware/auth');

const router = require('express').Router();

// endpoint to get all reviews
router.get('/all', async (req, res) => {
    try {
        const reviews = await getAllReviews();
        //check if reviews array is empty
        if (reviews.length === 0) {
            return res.status(404).json({ message: 'No reviews found' });
        }
        console.log(reviews);
        res.json({ message: 'Reviews retrieved successfully', reviews });
    } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).json({ message: 'Failed to retrieve reviews' });
    }
});

// endpoint to get all reviews by user_id
router.get('/getReviewsByUser/:user_id', async (req, res) => {
    const { user_id } = req.params;

    try {
        const reviews = await getReviewsByUser(user_id);
        if (reviews.length === 0) {
            return res.status(404).json({ message: 'No reviews found' });
        }
        res.json({ message: 'Reviews retrieved successfully', reviews });
    } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).json({ message: 'Failed to retrieve reviews' });
    }
});

// endpoint to get a review by review_id
router.get('/getReview/:review_id', async (req, res) => {
    const { review_id } = req.params;  // Extracting review_id from the route parameter

    try {
        const review = await getReviewById(review_id);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.json({ message: 'Review retrieved successfully', review });
    } catch (error) {
        console.error('Error fetching review:', error);
        res.status(500).json({ message: 'Failed to retrieve review' });
    }
});

// endpoint to get a review by media_id
router.get('/getReviewByMediaId/:media_id', async (req, res) => {
    
    const { media_id } = req.params;
    
    console.log('Media ID:', media_id);
    try {
        const review = await getReviewByMediaId(media_id);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.json({ message: 'Review retrieved successfully', review });
    } catch (error) {
        console.error('Error fetching review:', error);
        res.status(500).json({ message: 'Failed to retrieve review' });
    }
});

// endpoint to add a review
router.post('/addReview', auth, async (req, res) => {
    const media_id = req.body.media_id;
    const user_id = req.body.user_id;
    const tmdb_id = req.body.tmdb_id;
    const rating = req.body.rating;
    const review_text = req.body.review_text;

    try {
        // Check if the user exists
        console.log('User ID:', user_id);

        if (!user_id) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the media_id exists
        let media = await getMediaByTmdbId(tmdb_id);
        if (!media) {
            // If media doesn't exist, add it
            await addMedia(tmdb_id, media_type);
            // Fetch the media again
            console.log('3RD TMDB ID:', tmdb_id);
            media = await getMediaByTmdbId(tmdb_id);
            if (!media) {
                return res.status(500).json({ message: 'Failed to add media' });
            }
        }

        // Extract the media_id from the fetched media
        const media_id = media.media_id;

        // Check if the review already exists
        const existingReview = await getReviewByMediaId(media_id);
        if (existingReview) {
            return res.status(400).json({ message: 'Review already exists' });
        }

        // Check if the rating is valid
        if (rating < 1 || rating > 5) {
            return res.status(400).json({ message: 'Invalid rating' });
        }

        // Check if the review text is valid
        if (!review_text) {
            return res.status(400).json({ message: 'Invalid review text' });
        }

        // Add the review
        await addReview(media_id, user_id, rating, review_text);
        res.json({ message: 'Review added successfully' });
    } catch (error) {
        console.error('Error adding review:', error);
        res.status(500).json({ message: 'Failed to add review' });
    }
});

// endpoint to delete a review
router.delete('/deleteReview/:review_id', async (req, res) => {
    const { review_id } = req.params;

    try {
        await deleteReview(review_id);
        res.json({ message: 'Review deleted successfully' });
    } catch (error) {
        console.error('Error deleting review:', error);
        res.status(500).json({ message: 'Failed to delete review' });
    }
});

module.exports = router;