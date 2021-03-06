// modules required for routing
// Manthan shah
// 300990910
// Midterm exam
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {
  book.find((err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/details', {
        title: 'add new Books',
        books: books
      });
    }
  });
});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {
console.log(req.body);
let new_book = book({
  "Title": req.body.title,
  "Price": req.body.price,
  "Author": req.body.author,
  "Genre": req.body.genre

});

book.create(new_book, (err, books) => {
  if (err) {
    console.log(err);
    res.end(err);
  }
  else {
    console.log("redirected tto home page");
    res.redirect('/books');
  }


});
 });

// GET the Book Details page in order to edit an existing Book
router.get('/:id', (req, res, next) => {
  let id = req.params.id;
  book.findById(id, (err, book) => {
    if (err) {
      return console.error(err); }
    else {
      res.render('books/details', {
        title: 'Book Updates',
        books: book
      }); }
  });
});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {

  let id = req.params.id;

  let book_update = book({
    "_id": id,
    "Title": req.body.title,
    "Price": req.body.price,
    "Author": req.body.author,
    "Genre": req.body.genre

  });

  book.update({_id: id}, book_update, (err) => {
      if(err) {
          console.log(err);
          res.end(err);
      }
      else {
         
          res.redirect('/books');
      }
  })

});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {
  let id = req.params.id;
  book.remove({ _id: id }, (err) => {
    if (err) {
      console.log(err);
      res.end(err);}
    else {
     
      res.redirect('/books');
    }
  });
});


module.exports = router;