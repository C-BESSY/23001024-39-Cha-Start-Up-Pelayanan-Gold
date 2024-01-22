exports.up = function (knex) {
    return knex.schema.createTable('movies', function (table) {
      table.increments('id').primary();
      table.string('title');
      table.date('release_date');
      table.string('genre');
      table.string('director');
      table.json('cast');
      table.text('overview');
      table.string('image');
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable('movies');
  };
  