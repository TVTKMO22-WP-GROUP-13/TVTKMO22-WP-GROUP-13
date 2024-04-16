const express = require('express');
const router = express.Router();

// endpoint to get favorites
router.get('/', (req, res) => {
    try {
        const favoriteMovies = [];
        res.json({ favorites: [...favoriteMovies] });
    } catch (error) {
        console.error('Error fetching favorites:', error);
        res.status(500).json({ message: 'Failed to retrieve favorites' });
    }
});

// endpoint to add a movie to favorites
router.post('/', async (req, res) => {
    const { movieId } = req.body;
    const userId = req.user._id;

    try {
        const user = await getUser(username);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        // Check if the movie is already in favorites to avoid duplicates
        if (user.favorites.includes(movieId)) {
            return res.status(400).json({ message: 'Movie already in favorites' });
        }

        
        res.json({ success: true, message: 'Movie added to favorites' });
    } catch (error) {
        console.error('Error adding movie to favorites:', error);
        res.status(500).json({ message: 'Failed to add movie to favorites' });
    }
});

// endpoint to remove a movie from favorites
router.delete('/:movieId', (req, res) => {
    const { movieId } = req.params;

    try {
        // remove movieId from user's favorites in the database
        res.json({ success: true, message: 'Movie removed from favorites' });
    } catch (error) {
        console.error('Error removing movie from favorites:', error);
        res.status(500).json({ message: 'Failed to remove movie from favorites' });
    }
});

module.exports = router;