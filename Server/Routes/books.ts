// modules required for routing
import express from 'express';
import { CallbackError } from 'mongoose';
const router = express.Router();
export default router;

// define the book model
import book from '../Models/books';

/* GET books List page. READ */
router.get('/', (req, res, next) => 
{
  // find all books in the books collection
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        page: 'books',
        books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {

  res.render('books/details', {
    title: 'Books',
    page: 'books',
    books: ''
  });


});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {

  let newBook = new book
  ({
    "Title": "The Fellowship of the Ring",
    "Description": "Sauron, the Dark Lord, has gathered to him all the Rings of Power – the means by which he intends to rule Middle-earth. All he lacks in his plans for dominion is the One Ring – the ring that rules them all – which has fallen into the hands of the hobbit, Bilbo Baggins.",
    "Price": 10.3,
    "Author": "J. R. R. Tolkien",
    "Genre": "Fantasy"

  });
  ({
    "Title": "The Two Towers",
    "Description": "Frodo and the Companions of the Ring have been beset by danger during their quest to prevent the Ruling Ring from falling into the hands of the Dark Lord by destroying it in the Cracks of Doom. ",
    "Price": 9.64,
    "Author": "J. R. R. Tolkien",
    "Genre": "Fantasy"

  });


  book.create(newBook, function(err: CallbackError){
    if(err)
    {
      console.log(err);
      res.end(err);
    }

    res.redirect('/books');
  });

  

});

// GET the Book Details page in order to edit an existing Book
router.get('/:id', (req, res, next) => {

  let id = req.params.id;

  // find all books in the books collection
  book.findById(id, {}, {}, function(err, bookToEdit){
    if(err)
    {
      console.error(err);
      res.end(err)
    }

    res.render('books/details', {
      title: 'Book Details',
      page: 'books',
      books: bookToEdit,
    })
  });

});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {

  let id = req.params.id;
  
  let newBook = new book
  ({
    "_id": id,
    "Title": req.body.title,
    "Description": '',
    "Price": Number(req.body.price),
    "Author": req.body.author,
    "Genre": req.body.genre

  });

  book.updateOne({_id: id}, newBook, function(err: CallbackError){
    if(err)
    {
      console.log(err);
      res.end(err);
    }

    res.redirect('/books');
  });


});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {
  let id = req.params.id;

  book.remove({_id:id}, function(err: CallbackError){
    if(err)
    {
      console.log(err);
      res.end(err);
    }

    res.redirect('/books');
  });
});


//module.exports = router;
