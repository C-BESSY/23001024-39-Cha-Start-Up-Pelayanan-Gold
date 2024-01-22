const { Model } = require ('objection')

class ticket extends Model {
    static get tableName(){
        return 'tickets'
    }

    
}