'use strict';

const mongoose = require('mongoose');

mongoose.connect(process.env.DB);

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  comments: [String]
});

const Book = mongoose.model('Book', bookSchema);

module.exports = function (app) {

  app.route('/api/books')
    .get(async function (req, res){
      try {
        const books = await Book.find({});
        const booksWithCount = books.map(book => ({
          _id: book._id,
          title: book.title,
          commentcount: book.comments.length
        }));
        res.json(booksWithCount);
      } catch (err) {
        res.json([]);
      }
    })
    
    .post(async function (req, res){
      let title = req.body.title;
      if (!title) {
        return res.send('missing required field title');
      }
      try {
        const newBook = new Book({ title: title, comments: [] });
        const savedBook = await newBook.save();
        res.json({ _id: savedBook._id, title: savedBook.title });
      } catch (err) {
        res.send('error saving book');
      }
    })
    
    .delete(async function(req, res){
      try {
        await Book.deleteMany({});
        res.send('complete delete successful');
      } catch (err) {
        res.send('error deleting books');
      }
    });

  app.route('/api/books/:id')
    .get(async function (req, res){
      let bookid = req.params.id;
      try {
        const book = await Book.findById(bookid);
        if (!book) {
          return res.send('no book exists');
        }
        res.json({ _id: book._id, title: book.title, comments: book.comments });
      } catch (err) {
        res.send('no book exists');
      }
    })
    
    .post(async function(req, res){
      let bookid = req.params.id;
      let comment = req.body.comment;
      if (!comment) {
        return res.send('missing required field comment');
      }
      try {
        const book = await Book.findById(bookid);
        if (!book) {
          return res.send('no book exists');
        }
        book.comments.push(comment);
        const updatedBook = await book.save();
        res.json({ _id: updatedBook._id, title: updatedBook.title, comments: updatedBook.comments });
      } catch (err) {
        res.send('no book exists');
      }
    })
    
    .delete(async function(req, res){
      let bookid = req.params.id;
      try {
        const book = await Book.findByIdAndDelete(bookid);
        if (!book) {
          return res.send('no book exists');
        }
        res.send('delete successful');
      } catch (err) {
        res.send('no book exists');
      }
    });
  
};
