const { Model } = require('objection');

class Book extends Model {
  static get tableName() {
    return 'books';
  }

  static get relationMappings() {
    const User = require('./user');
    const MovieOnShow = require('./movie_on_shows');

    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'books.users_id',
          to: 'users.id',
        },
      },
      movieOnShow: {
        relation: Model.BelongsToOneRelation,
        modelClass: MovieOnShow,
        join: {
          from: 'books.movie_on_shows_id',
          to: 'movie_on_shows.id',
        },
      },
    };
  }
}

module.exports = Book;
