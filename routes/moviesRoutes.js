const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');

router.get('/movies', movieController.getMovies);
router.get('/movies/:movieId', movieController.getMovieById);
router.post('/create', movieController.addMovie);
router.put('/:movieId', movieController.updateMovie);
// router.delete('/:movieId', movieController.deleteMovie);

module.exports = router;