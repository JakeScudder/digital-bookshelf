const express = require("express");
const router = express.Router();

//Cover images
const bookcovers = require("bookcovers");

//Debugging chrome error
puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});

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
  console.log("post request body:", req.body);
  // req.setTimeout(70000);
  let maxImage;

  //Added chrome buildpack to retrieve amazon results
  //Added puppeteer buildpack
  //Fetches higher quality image with Promise
  const promise = new Promise((resolve, reject) => {
    bookcovers.withIsbn(req.body.isbn).then((res) => {
      console.log("getting book cover response:", res);
      if (res.amazon["3x"]) {
        maxImage = res.amazon["3x"];
        resolve(res)
      } 
      if (res.amazon["2.5x"]) {
        maxImage = res.amazon["2.5x"];
        resolve(res)
      } 
      if (res.amazon["2x"]) {
        maxImage = res.amazon["2x"];
        resolve(res)
      } else {
        const error = { success: false }
        reject(error)
      }
    })
  })

  //Will not build book until promise resolves
  promise
    //debug heroku
    .then(() => {
      console.log("now adding book to db")
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
    })
    .catch(err => {
      res.status(500).send({success: false}, "Failed to add book:", err);
    })
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

//First iteration of addBook
  // //Once max-image is found, add entire book to database
  // let checkExist = setInterval(() => {
  //   if (maxImage) {
  //     console.log("exists");
  //     clearInterval(checkExist);
  //     const newBook = new Book({
  //       title: req.body.title,
  //       subtitle: req.body.subtitle,
  //       author: req.body.author,
  //       publishedDate: req.body.publishedDate,
  //       description: req.body.description,
  //       image: maxImage,
  //       category: req.body.category,
  //     });

  //     newBook
  //       .save()
  //       .then((book) => res.json(book))
  //       .catch((err) =>
  //         res
  //           .status(500)
  //           .json({ success: false }, "books.js: post route broken", err)
  //       );
  //   }
  // }, 1000);
