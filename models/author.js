const Bookshelf = require('../bookshelf');

const Author = Bookshelf.Model.extend({
  tableName: 'authors',
  hasTimestamps: true,
  books: function() {
    return this.belongsToMany('Book');
  }
}, {
  dependents: ['books']
});

module.exports = Bookshelf.model('Author', Author);
