const express = require('express');
const router = express.Router();
const { getAllFavorites, getFavorites, addFavorite, removeFavorite } = require('../database/favorites_db');
const { auth } = require('../middleware/auth');
const { getUser } = require('../database/user_data_db');

//get all favorites

router.get('/all', async (req, res) => {
    try {
        const favorites = await getAllFavorites();

        if (favorites.length === 0) {
            return res.status(404).json({ message: 'No favorites found' });
        }
        res.json(favorites);
    } catch (error) {
        console.error('Error fetching favorites:', error);
        res.status(500).json({ message: 'Failed to retrieve favorites' });
    }
}
);

// endpoint to get users favorites
router.get('/favorites', async (req, res) => {
    const user_id = res.locals.user_id;

    try {
        const user = await getUser(user_id);
        if (!user_id) {
            return res.status(404).json({ message: 'User not found' });
        }

        const favoriteMovies = await getFavorites(user_id);
        res.json({ favorites: favoriteMovies });
    } catch (error) {
        console.error('Error fetching favorites:', error);
        res.status(500).json({ message: 'Failed to retrieve favorites' });
    }
});

// endpoint to add a movie to favorites
router.post('/addFavorite', auth, async (req, res) => {
    const media_id = req.body.media_id;
    const user_id = res.locals.user_id;
    const list_type = 'favorite';
    const group_id = null;
    const status = null;
    const added_by_user_id = user_id;

    try {
        const user = await getUser(user_id);
        if (!user_id) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        // check if the movie is already in favorites to avoid duplicates
        if (user.favorites.includes(media_id)) {
            return res.status(400).json({ message: 'Movie already in favorites' });
        }

        // add movie to user's favorites in the database
        await addFavorite(user_id, media_id, list_type, group_id, status, added_by_user_id);
        res.json({ success: true, message: 'Movie added to favorites' });
    } catch (error) {
        console.error('Error adding movie to favorites:', error);
        res.status(500).json({ message: 'Failed to add movie to favorites' });
    }
});

// endpoint to remove a movie from favorites
router.delete('/removeFavorite', async (req, res) => {
    const { media_id } = req.params;
    const user_id = res.locals.user_id;

    try {
        const user = await getUser(user_id);
        if (!user_id) {
            return res.status(404).json({ message: 'User not found' });
        }

        // remove movie from user's favorites in the database
        await removeFavorite(user_id, media_id);
        res.json({ success: true, message: 'Movie removed from favorites' });
    } catch (error) {
        console.error('Error removing movie from favorites:', error);
        res.status(500).json({ message: 'Failed to remove movie from favorites' });
    }
});

module.exports = router;