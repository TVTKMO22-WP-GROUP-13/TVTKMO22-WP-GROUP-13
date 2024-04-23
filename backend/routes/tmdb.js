//tmdb.js
const express = require("express");
const mediaController = require("../controllers/media_controller");

const router = express.Router();

router.get('/movie/search', mediaController.searchMovies);
router.get('/discover/movie', mediaController.discoverMovies);
router.get('/movie/:id', mediaController.getMovieById);
router.get('/tv/search', mediaController.searchTv);
router.get('/tv/discover', mediaController.discoverTv);
router.get('/tv/:id', mediaController.getTvById);
router.get('/movie/top', mediaController.topRatedMovies);
router.get('/tv/:top', mediaController.topRatedSeries);
router.get('/trending/tv/:tWindow', mediaController.trendingSeries);







module.exports = router;