const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const BookSchema = new Schema({
  title: String,
  subtitle: String,
  author: String,
  publishedDate: String,
  description: String,
  image: String,
  dateAdded: { type: Date, default: Date.now },
  category: {
    type: String,
    required: false,
  },
});

module.exports = Book = mongoose.model("book", BookSchema);
