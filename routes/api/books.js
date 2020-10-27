const express = require("express");
const router = express.Router();

//Cover images
const bookcovers = require("bookcovers");

// Book model
const Book = require("../../models/Book");

// @route GET api/books
// @desc Get All Books
// @access Public
router.get("/", (req, res) => {
  console.log("hit books.js home route");
  Book.find()
    .sort({ date: -1 })
    .then((books) => res.json(books))
    .catch((err) =>
      res.status(404).json({ success: false }, "get route broken", err)
    );
});

// @route POST api/books
// @desc Add a Book
// @access Public
router.post("/", (req, res) => {
  console.log("server", req.body);
  req.setTimeout(70000);
  let maxImage;
  //Fetches higher quality image
  bookcovers.withIsbn(req.body.isbn).then((res) => {
    if (res.amazon["3x"]) {
      maxImage = res.amazon["3x"];
    } else if (res.amazon["2.5x"]) {
      maxImage = res.amazon["2.5x"];
    } else if (res.amazon["2x"]) {
      maxImage = res.amazon["2x"];
    }
    console.log("maxImage", maxImage);
  });

  //Once max-image is found, add entire book to database
  let checkExist = setInterval(() => {
    if (maxImage) {
      console.log("exists");
      clearInterval(checkExist);
      const newBook = new Book({
        title: req.body.title,
        subtitle: req.body.subtitle,
        author: req.body.author,
        publishedDate: req.body.publishedDate,
        description: req.body.description,
        image: maxImage,
        category: req.body.category,
      });

      newBook
        .save()
        .then((book) => res.json(book))
        .catch((err) =>
          res
            .status(500)
            .json({ success: false }, "books.js: post route broken", err)
        );
    }
  }, 1000);
});

// @route DELETE api/books/:id
// @desc Delete a Book
// @access Public
router.delete("/:id", (req, res) => {
  Book.findById(req.params.id)
    .then((book) => book.remove().then(() => res.json({ success: true })))
    .catch((err) => res.status(404).json({ success: false }));
});

module.exports = router;

//*****Second Iteration
// setTimeout(() => {
//   const newBook = new Book({
//     title: req.body.title,
//     subtitle: req.body.subtitle,
//     author: req.body.author,
//     publishedDate: req.body.publishedDate,
//     description: req.body.description,
//     image: maxImage,
//     category: req.body.category,
//   });

//   newBook.save().then((book) => res.json(book));
// }, 15000);

//*****First iteration
// const newBook = new Book({
//   title: req.body.title,
//   subtitle: req.body.subtitle,
//   author: req.body.author,
//   publishedDate: req.body.publishedDate,
//   description: req.body.description,
//   image: maxImage,
//   category: req.body.category,
// });

// newBook.save().then((book) => res.json(book));
