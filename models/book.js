const Bookshelf = require('../bookshelf');

const Book = Bookshelf.Model.extend({
  tableName: 'books',
  hasTimestamps: true,
  authors: function() {
    return this.belongsToMany('Author');
  }
});

module.exports = Bookshelf.model('Book', Book);
