const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");

const books = require("./routes/api/books");

const app = express();

// Bodyparser Middleware
app.use(cors());
app.use(bodyParser.json());

//HEROKU TESTING
const dbKey = process.env.MONGODB_URI;

// // DB Config
// const db = require("./config/keys").mongoURI;

// Connect to Mongo
mongoose
  .connect(dbKey, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

//Use Routes
app.use("/api/books", books);

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  //Set static folder
  app.use(express.static("my-bookshelf/build"));

  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "my-bookshelf", "build", "index.html")
    );
  });
}

const port = process.env.PORT || 7000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
