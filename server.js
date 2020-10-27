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

// DB Config
const dbDev = require("./config/keys").mongoURI;

//Heroku
const dbKey = process.env.MONGODB_URI;

//Heroku Fails
// var uristring =
//   process.env.MONGODB_URI ||
//   process.env.MONGOLAB_URI ||
//   process.env.MONGOHQ_URL ||
//   db;

// mongoose.connect(uristring, function (err, res) {
//   if (err) {
//     console.log("ERROR connecting to: " + uristring + ". " + err);
//   } else {
//     console.log("Succeeded connected to: " + uristring);
//   }
// });

// Connect to Mongo
mongoose
  .connect(dbKey || dbDev, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("Mongo did not connect", err));

//Use Routes
app.use("/api/books", books);

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  //Set static folder
  app.use(express.static("my-bookshelf/build"));

  app.get("/", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "my-bookshelf", "build", "index.html")
    );
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
