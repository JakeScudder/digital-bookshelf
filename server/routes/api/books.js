const express = require("express");
const router = express.Router();

// Book model
const Book = require("../../models/Book");

// @route GET api/books
// @desc Get All Books
// @access Public
router.get("/");

module.exports = router;
