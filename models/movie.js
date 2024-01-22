const knex = require('knex');
const dbConfig = require('../knexfile');

const db = knex(dbConfig.development);

class Movie {
  constructor(db) {
    this.db = db;
  }

  async create(movie) {
    return this.db('movies').insert({
      title: movie.title,
      release_date: movie.releaseDate,
      genre: movie.genre,
      director: movie.director,
      cast: movie.cast,
      overview: movie.overview,
      image: movie.image,
    }).returning('*');
  }
}

module.exports = new Movie(db);
