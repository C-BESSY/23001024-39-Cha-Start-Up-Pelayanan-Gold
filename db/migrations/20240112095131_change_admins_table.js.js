// In the generated migration file
exports.up = function (knex) {
    return knex.schema.alterTable('admins', (table) => {
        table.dropColumn('name');
        table.string('username').alter();
        table.string('password').alter();
    });
};
  
exports.down = function (knex) {};
  