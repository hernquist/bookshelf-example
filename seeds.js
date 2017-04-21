const Author = require('./models/author');
const Book = require('./models/book');

const drSeuss         = new Author( { name: 'Dr. Seuss' } );
const catInHat        = new Book( { title: 'The Cat in the Hat' } );
const greenEggsAndHam = new Book( { title: 'Green Eggs and Ham' } );

const hemingway       = new Author( { name: 'Ernest Hemingway' } );
const farewellToArms  = new Book( { title: 'A Farewell to Arms' } );
const oldManAndSee    = new Book( { title: 'The Old Man and the Sea' } );

// DELETE all of the old authors.
Author.where('id', '!=', 0).destroy()
.then( () => {
  // DELETE all of the old books.
  return Book.where('id', '!=', 0).destroy();
})
.then( () => {
  // CREATE some authors
  return Promise.all( [ drSeuss.save(), hemingway.save() ] );
})
.then( (authors) => {
  // CREATE some books
  return Promise.all([
    catInHat.save(),
    greenEggsAndHam.save(),
    farewellToArms.save(),
    oldManAndSee.save()
  ])
  .then(books => {
    // ASSOCIATE the books to the authors
    return Promise.all([
      books[0].authors().attach(authors[0]),
      books[1].authors().attach(authors[0]),
      books[2].authors().attach(authors[1]),
      books[3].authors().attach(authors[1])
    ]);
  });
})
// GET all of the books
.then( book => {
  return Book.fetchAll({withRelated: ['authors']});
})
.then( books => {
  books.forEach( book => {
    console.log('book:', book.toJSON());
  });
  // GET all of the authors
  return Author.fetchAll({withRelated: ['books']});
})
.then( authors => {
  authors.forEach( author => {
    console.log('author:', author.toJSON());
  });
  process.exit();
})
.catch( err => {
  console.error(err);
  process.exit(1);
});
