import React, { useState } from "react";
import { withRouter } from "react-router";
import { Jumbotron, Button } from "reactstrap";

import axios from "axios";

import apiKey from "../apiKey";

const SearchForm = (props) => {
  //Set State
  const [search, setSearch] = useState("");

  const [results, setResults] = useState([]);

  //Handles the form submission, passes info to handleSearch props
  const handleSubmit = (e) => {
    e.preventDefault();
    let searchUrl = `/search/${search}`;
    props.history.push(searchUrl);
    handleSearch(search);
    // Cookies.set("searchQuery", JSON.stringify(search));
    setSearch("");
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  //Handles Api Fetch
  const handleSearch = (query) => {
    axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${apiKey}`
      )
      .then((res) => {
        console.log(res.data.items);
        let apiResults = res.data.items;
        for (let i = 0; i < 5; i++) {
          console.log(apiResults[i].volumeInfo);
          let data = apiResults[i].volumeInfo;
          setResults((results) => results.concat(data));
        }
      })
      .catch((error) => {
        console.log("Error fetching and parsing data", error);
      });
  };

  const addBook = (id) => {};

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
                ({
                  id,
                  title,
                  subtitle,
                  authors,
                  publishedDate,
                  description,
                  imageLinks,
                  category,
                  industryIdentifiers,
                }) => (
                  <Jumbotron className="results-jumbo" key={id}>
                    <img src={imageLinks.thumbnail} alt="book-thumbnail"></img>
                    <h3 className="result-title">{title}</h3>
                    <h3 className="result-author">{authors[0]}</h3>
                    <h3 className="result-published-date">{publishedDate}</h3>
                    <p className="result-description">{description}</p>
                    <h3 className="result-isbn" style={{ display: "none" }}>
                      {industryIdentifiers[1].identifier}
                    </h3>
                    <p className="lead">
                      <Button
                        onClick={() => addBook(id)}
                        className="add-book"
                        color="primary"
                      >
                        Add to Bookshelf
                      </Button>
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
export default SearchFormWithRouter;