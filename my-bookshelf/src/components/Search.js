import React, { useState } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { Jumbotron, Button} from "reactstrap";

import axios from "axios";
// import apiKey from "../apiKey";

//Redux
import { connect } from "react-redux";
import { addBook } from "../actions/bookActions";

const SearchForm = (props) => {
  //Set State
  const [search, setSearch] = useState("");

  const [results, setResults] = useState([]);

  const myKey = process.env.REACT_APP_API_KEY;

  //Handles the form submission, passes info to handleSearch func
  const handleSubmit = (e) => {
    e.preventDefault();
    let searchUrl = `/search/${search}`;
    props.history.push(searchUrl);
    handleSearch(search);
    // Cookies.set("searchQuery", JSON.stringify(search));
    setSearch("");
  };

  //Handles user input
  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  //Handles Api Fetch to search for books
  const handleSearch = (query) => {
    let emptyArray = [];
    setResults(emptyArray);
    axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${myKey}`
      )
      .then((res) => {
        let apiResults = res.data.items;
        for (let i = 0; i < 5; i++) {
          let data = apiResults[i].volumeInfo;
          console.log(data);
          setResults((results) => results.concat(data));
        }
      })
      .catch((error) => {
        console.log("Error fetching and parsing data", error);
      });
  };

  //Sends formatted book data to redux state
  const handleAddBook = (index) => {
    console.log("AddBook function");
    let data = results[index];
    console.log(data);
    let formattedData = {};
    formattedData.title = data.title;
    formattedData.subtitle = data.subtitle;
    formattedData.author = data.authors[0];
    formattedData.publishedDate = data.publishedDate;
    formattedData.description = data.description;
    formattedData.isbn = data.industryIdentifiers[1].identifier;
    formattedData.image = data.imageLinks.thumbnail;
    //TODO: category
    console.log("formattedData:", formattedData);
    //Calls the redux addBook function
    props.addBook(formattedData);
  };

  return (
    <div className="search-container">
      <div className="search-bar-container">
        <form onSubmit={handleSubmit} className="search-form">
          <div className="search-bar-input">
            <input
              className="search-input"
              type="search"
              name="search"
              placeholder="Search for a book"
              value={search}
              onChange={handleChange}
            />
          </div>
          <div className="search-btn-div">
            <button type="submit" className="search-button">
              <svg
                fill="#fff"
                height="24"
                viewBox="0 0 23 23"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                <path d="M0 0h24v24H0z" fill="none" />
              </svg>
            </button>
          </div>
        </form>
      </div>
      <div className="search-results">
        <div>
          {results.length > 0
            ? results.map(
                (
                  {
                    id,
                    title,
                    subtitle,
                    authors,
                    publishedDate,
                    description,
                    imageLinks,
                  },
                  index
                ) => (
                  <Jumbotron className="results-jumbo" key={index}>
                    {imageLinks ? (
                      <img
                        src={imageLinks.thumbnail}
                        alt="book-thumbnail"
                      ></img>
                    ) : null}
                    <h3 className="result-title">{title}</h3>
                    <h3 className="result-subtitle">{subtitle}</h3>
                    <h3 className="result-author">{authors[0]}</h3>
                    <h3 className="result-published-date">{publishedDate}</h3>
                    <p className="result-description">{description}</p>
                    <p className="lead">
                    <Link to="/">
                      <Button
                        onClick={() => handleAddBook(index)}
                        className="add-book"
                        color="primary"
                      >Add to Bookshelf
                      </Button>
                    </Link>
                    </p>
                  </Jumbotron>
                )
              )
            : null}
        </div>
      </div>
    </div>
  );
};

const SearchFormWithRouter = withRouter(SearchForm);

const mapStateToProps = (state) => ({
  books: state.book.bookData,
});

const mapDispatchToProps = (dispatch) => {
  return {
    addBook: (data) => dispatch(addBook(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchFormWithRouter);
