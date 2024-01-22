const MovieOnShow = require('../models/movie_on_shows');

exports.getMovieOnShows = async (req, res) => {
    try {
        const movieOnShows = await MovieOnShow.query() 
        res.json(movieOnShows);
    } catch (error) {
        console.error('Error fetching movie on shows:', error) 
        res.status(500).json({ error: 'Internal Server Error' }) 
    }
} 

exports.createMovieOnShow = async (req, res) => {
    const { auditoriums_id, movies_id, date, start_time, end_time } = req.body 

    try {
    const newMovieOnShow = await MovieOnShow.query().insert({
        auditoriums_id,
        movies_id,
        date,
        start_time,
        end_time,
    }) 

    res.status(201).json(newMovieOnShow) 
    } catch (error) {
        console.error('Error creating movie on show:', error) 
        res.status(500).json({ error: 'Internal Server Error' }) 
    }
} 
