exports.up = function(knex, Promise) {
  return knex.schema.createTable('books', function(table) {
    table.increments('id').primary();
    table.string('title');
    table.timestamps(true, true);  // adds created_at and updated_at
  }).createTable('authors', function(table) {
    table.increments('id').primary();
    table.string('name');
    table.timestamps(true, true);  // adds created_at and updated_at
  }).createTable('authors_books', function(table) {
    table.integer('author_id').references('authors.id');
    table.integer('book_id').references('books.id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('books')
    .dropTable('authors')
    .dropTable('authors_books');
};
