const Movie = require ('../models/movie')
const fetch = import('node-fetch').then(module => module.default);
const fs = require('fs');

exports.getMovies = async (req, res) => {
  try {
    const tmdbApiKey = process.env.TMDB_API_KEY;
    const tmdbEndpoint = `https://api.themoviedb.org/3/movie/popular?api_key=${tmdbApiKey}&language=en-US&page=1`

    const { default: fetch } = await import('node-fetch')

    const tmdbResponse = await fetch(tmdbEndpoint)
    const tmdbData = await tmdbResponse.json()

    const client = await global.pool.connect()
    const result = await client.query('SELECT * FROM movies')
    const databaseMovies = result.rows;
    client.release()

    const mergedMovies = tmdbData.results.map(tmdbMovie => {
      const databaseMovie = databaseMovies.find(dbMovie => dbMovie.tmdb_id === tmdbMovie.id)

      if (databaseMovie) {
        return {
          ...tmdbMovie,
          overview: databaseMovie.overview,
        }
      } else {
        return tmdbMovie
      }
    });
 
    res.json(mergedMovies)
  } catch (error) {
    console.error('Error fetching movies:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
};

exports.getMovieById = async (req, res) => {
  const movieId = parseInt(req.params.movieId);
  try {
    const tmdbApiKey = process.env.TMDB_API_KEY
    const tmdbEndpoint = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${tmdbApiKey}&language=en-US`

    const { default: fetch } = await import('node-fetch')
    const response = await fetch(tmdbEndpoint)
    const data = await response.json()

    if (response.status !== 200 || data.success === false) {
      throw new Error(`No movie with ID ${movieId}`)
    }

    res.json(data)
  } catch (err) {
    console.error(err)
    res.sendStatus(404)
  }
};

exports.addMovie = async (req, res) => {
  try {
    const { title, releaseDate, genre, director, cast, overview, imageSource } = req.body;
    const imageData = await getImageData(imageSource);

    const newMovie = await Movie.create({
      title,
      releaseDate,
      genre,
      director,
      cast,
      overview,
      image: imageData,
    });

    res.status(201).json({ success: true, movie: newMovie });
  } catch (error) {
    console.error('Error creating a new movie:', error);
    res.status(500).json({ success: false, error: 'Internal server error.' });
  }
};

async function getImageData(source) {
  if (source.startsWith('http')) {
    const response = await fetch(source);
    const buffer = await response.buffer();
    return buffer;
  } else {
    return fs.readFile(source);
  }
}

exports.updateMovie = async (req, res) => { }

exports.deleteMovie = async (req, res) => { }