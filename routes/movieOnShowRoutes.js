const express = require('express');
const router = express.Router();
const movieOnShowController = require('../controllers/movieOnShowController');

router.get('/', movieOnShowController.getMovieOnShows);
router.post('/', movieOnShowController.createMovieOnShow);

module.exports = router;
