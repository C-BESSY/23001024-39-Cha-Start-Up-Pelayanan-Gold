exports.getMovies = async (req, res) => {
  try {
    const tmdbApiKey = process.env.TMDB_API_KEY;
    const tmdbEndpoint = `https://api.themoviedb.org/3/movie/popular?api_key=${tmdbApiKey}&language=en-US&page=1`;

    const { default: fetch } = await import('node-fetch');

    const tmdbResponse = await fetch(tmdbEndpoint);
    const tmdbData = await tmdbResponse.json();

    const client = await global.pool.connect();
    const result = await client.query('SELECT * FROM movies');
    const databaseMovies = result.rows;
    client.release();

    const mergedMovies = tmdbData.results.map(tmdbMovie => {
      const databaseMovie = databaseMovies.find(dbMovie => dbMovie.tmdb_id === tmdbMovie.id);

      if (databaseMovie) {
        return {
          ...tmdbMovie,
          overview: databaseMovie.overview,
        };
      } else {
        return tmdbMovie;
      }
    });
 
    res.json(mergedMovies);
  } catch (error) {
    console.error('Error fetching movies:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getMovieById = async (req, res) => {
  const movieId = parseInt(req.params.movieId);
  try {
    const tmdbApiKey = process.env.TMDB_API_KEY;
    // Use a different endpoint for getting a specific movie by ID
    const tmdbEndpoint = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${tmdbApiKey}&language=en-US`;

    const { default: fetch } = await import('node-fetch');
    const response = await fetch(tmdbEndpoint);
    const data = await response.json();

    // Check that the movie was found in TMDb API
    if (response.status !== 200 || data.success === false) {
      throw new Error(`No movie with ID ${movieId}`);
    }

    res.json(data);
  } catch (err) {
    console.error(err);
    res.sendStatus(404);
  }
};

exports.addMovie = async (req, res) => {
  const { title, releaseDate, genre, director, cast, overview, image } = req.body;
  const userId = req.user.id;

  // Check if the user is logged in
  if (!req.isAuthenticated()) {
    return res.redirect('/login');
  }
  try {
    let newMovie;
    // Check if the user is an admin
    if (req.user.role === 'admin') {
      // Admins can directly create a new movie
      newMovie = await Movie.create({
        title,
        releaseDate: new Date(releaseDate),
        genre,
        director,
        cast: JSON.stringify(cast),
        overview,
        image,
      });
    } else {
      // For regular users cannot create movies directly
      return res.status(403).json({ message: 'Permission denied. Only admins can create movies.' });
    }
    // Update the user's movie list with the new movie ID
    const updatedUser = await User.findOneAndUpdate(
      { id: userId },
      { $push: { movies: newMovie._id } },
      { new: true }
    );
    res.status(201).json({ message: 'Movie created successfully', user: updatedUser });
  } catch (error) {
    console.error('Error creating a new movie:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};


// exports.updateMovie = async (req, res) => { }

// exports.deleteMovie = async (req, res) => { }