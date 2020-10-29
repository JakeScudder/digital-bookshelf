const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const BookSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  titleAZ: String,
  subtitle: String,
  author: {
    type: String,
    required: true,
  },
  publishedDate: String,
  description: String,
  image: {
    type: String,
    required: true,
  },
  dateAdded: { type: Date, default: Date.now },
  category: String,
});

module.exports = Book = mongoose.model("book", BookSchema);
