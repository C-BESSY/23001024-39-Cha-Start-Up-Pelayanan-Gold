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