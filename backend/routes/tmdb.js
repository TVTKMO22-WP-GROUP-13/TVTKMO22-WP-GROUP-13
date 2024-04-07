const { getMovie, searchMovie } = require('../tmdb/tmdb_api');

const router = require('express').Router();

//get movie by id
router.get('/movie/:id', async (req, res) => {
    try {
        const movie = await getMovie(req.params.id);
        res.json(movie);
    } catch (error) {
        console.error('Error fetching the movie:', error);
        res.status(500).json({ message: 'Failed to retrieve the movie' });
    }
});

//search for movies with a query (string)
router.get('/search/:query', async (req, res) => {
    try {
        const movies = await searchMovie(req.params.query);
        res.json(movies);
    } catch (error) {
        console.error('Error searching for movies:', error);
        res.status(500).json({ message: 'Failed to search for movies' });
    }
});

module.exports = router;