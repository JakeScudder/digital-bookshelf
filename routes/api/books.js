const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

//Cover images
const bookcovers = require("bookcovers");

// Book model
const Book = require("../../models/Book");

// @route GET api/books
// @desc Get All Books
// @access Public
router.get("/", async (req, res) => {
  const pageSize = 7;
  const page = Number(req.query.pageNumber) || 1;
  console.log("page:", page);
  console.log("req.query:", req.query);

  const count = await Book.countDocuments();
  await Book.find()
    .sort({ dateAdded: -1 })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .then((books) =>
      res.json({ books, page, pages: Math.ceil(count / pageSize) })
    )
    .catch((err) =>
      res.status(404).json({ success: false }, "get route broken", err)
    );
});

// @route GET api/books
// @desc Get All Books and sort from A - Z
// @access Public
router.get("/sort-AZ", (req, res) => {
  console.log("sorting books A - Z");
  //TODO: Maybe move regex expression to a searchable database parameter when book is added to database.
  Book.find()
    .sort({ titleAZ: 1 })
    .then((books) => res.json(books))
    .catch((err) =>
      res.status(404).json({ success: false }, "get route broken", err)
    );
});

// @route POST api/books
// @desc Add a Book
// @access Private
router.post("/", auth, (req, res) => {
  console.log("post request body:", req.body);
  // req.setTimeout(70000);
  let maxImage;

  //Fetches higher quality image with Promise
  const promise = new Promise((resolve, reject) => {
    bookcovers.withIsbn(req.body.isbn).then((res) => {
      console.log("getting book cover response:", res);

      if (res.amazon) {
        console.log("choosing Amazon image");
        if (res.amazon["3x"]) {
          maxImage = res.amazon["3x"];
          resolve(res);
          return;
        }
        if (res.amazon["2.5x"]) {
          maxImage = res.amazon["2.5x"];
          resolve(res);
          return;
        }
        if (res.amazon["2x"]) {
          maxImage = res.amazon["2x"];
          resolve(res);
          return;
        }
      }

      if (res.openLibrary) {
        if (res.openLibrary.large) {
          maxImage = res.openLibrary.large;
          resolve(res);
          return;
        }
        if (res.openLibrary.medium) {
          maxImage = res.openLibrary.medium;
          resolve(res);
          return;
        }
        if (res.openLibrary.small) {
          maxImage = res.openLibrary.small;
          resolve(res);
          return;
        }
      }
      if (res.google.thumbnail) {
        maxImage = res.google.thumbnail;
        resolve(res);
        return;
      }
      if (res.google.smallThumbnail) {
        maxImage = res.google.smallThumbnail;
        resolve(res);
        return;
      } else {
        const error = { success: false };
        reject(error);
      }
    });
  });

  //Will not build book until promise resolves
  promise
    //debug heroku
    .then(() => {
      console.log("now adding book to db");
      const newBook = new Book({
        title: req.body.title,
        titleAZ: req.body.titleAZ,
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
          res.json({ success: false }, "Mongo save data error:", err)
        );
    })
    .catch((err) => {
      res.status(500).send({ success: false }, "Failed to add book:", err);
    });
});

// @route DELETE api/books/:id
// @desc Delete a Book
// @access Private
router.delete("/:id", auth, (req, res) => {
  Book.findById(req.params.id)
    .then((book) => book.remove().then(() => res.json({ success: true })))
    .catch((err) => res.status(404).json({ success: false }));
});

module.exports = router;
