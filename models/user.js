const { Model } = require('objection')
const bcrypt = require('bcrypt')

class User extends Model {
  static get tableName() {
    return 'users';
  }

  async $beforeInsert(queryContext) {
    await super.$beforeInsert(queryContext)
    this.password = await bcrypt.hash(this.password, 10)
  }

  async $beforeUpdate(opt, queryContext) {
    await super.$beforeUpdate(opt, queryContext)
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10)
    }
  }

  static async deleteUserById(userId) {
    return this.query().deleteById(userId)
  }
}

module.exports = User;
