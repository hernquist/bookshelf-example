const knex = require('knex')(require('./knexfile'));
const bookshelf = require('bookshelf')(knex);
bookshelf.plugin('registry')
bookshelf.plugin(require('bookshelf-cascade-delete'));

module.exports = bookshelf;
