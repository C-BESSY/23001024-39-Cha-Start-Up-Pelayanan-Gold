const { Model } = require('objection')
const bcrypt = require('bcrypt')

class Admin extends Model {
  static get tableName() {
    return 'admins'
  }

  async $beforeInsert(queryContext) {
    await super.$beforeInsert(queryContext);
    this.password = await bcrypt.hash(this.password, 10)
  }

  async $beforeUpdate(opt, queryContext) {
    await super.$beforeUpdate(opt, queryContext);
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10)
    }
  }
}

module.exports = Admin
