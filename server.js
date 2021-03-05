const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const config = require("config");
const dotenv = require("dotenv");

const books = require("./routes/api/books");
const users = require("./routes/api/users");
const auth = require("./routes/api/auth");

const app = express();

dotenv.config();

// Bodyparser Middleware
// app.use(cors());
app.use(express.json());

//Heroku
const dbKey = process.env.MONGODB_URI;

//Trying to debug DB
mongoose.set("debug", true);

// Connect to Mongo
mongoose
  .connect(dbKey || process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("Mongo did not connect", err));

//Use Routes
app.use("/api/books", books);
app.use("/api/users", users);
app.use("/api/auth", auth);

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  //Set static folder
  app.use(express.static("my-bookshelf/build"));

  app.get("*", (req, res) => {
    console.log("we are in app.get(/)");
    res.sendFile(
      path.resolve(__dirname, "my-bookshelf", "build", "index.html")
    );
  });
}

const port = process.env.PORT || 7000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
