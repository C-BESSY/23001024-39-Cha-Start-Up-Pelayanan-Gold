exports.up = function (knex) {
    return knex.schema.alterTable('users', function (table) {
        table.string('email', 255).alter();
    });
  };
  
exports.down = function (knex) {
    return knex.schema.alterTable('users', function (table) {
        table.string('email', 50).alter();
    });
};