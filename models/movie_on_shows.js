const { Model } = require('objection') 

class MovieOnShow extends Model {
    static get tableName() {
        return 'movie_on_shows' 
    }
}

module.exports = MovieOnShow 
