const express = require("express");
const mediaController = require("../controllers/media_controller");

const router = express.Router();

router.get('/movie/search', mediaController.searchMovies);
router.get('/movie/discover', mediaController.discoverMovies);
router.get('/movie/:id', mediaController.getMovieById);
router.get('/movie/:top', mediaController.topRatedMovies);
router.get('/tv/:top', mediaController.topRatedSeries);



module.exports = router;