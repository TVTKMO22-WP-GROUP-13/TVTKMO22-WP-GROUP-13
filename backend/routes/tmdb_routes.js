import express from "express";
import * as mediaController from "../controllers/media_controller";

const router = express.Router();

router.get('/movie/search', mediaController.searchMovies);
router.get('/movie/discover', mediaController.discoverMovies);
router.get('/movie/:id', mediaController.getMovieById);

export default router;