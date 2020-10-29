import axios from "axios";

import {
  GET_BOOKS,
  ADD_BOOK,
  DELETE_BOOK,
  BOOKS_LOADING,
  ADD_BOOK_LOADING,
  SORT_BOOK_AZ
} from "./types";

export const getBooks = () => (dispatch) => {
  console.log("getBook action");
  dispatch(setBooksLoading());
  axios
    .get("/api/books")
    .then((res) => {
      console.log("books:", res.data);
      dispatch({
        type: GET_BOOKS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log("getBook action error:", err);
    });
};

export const sortBookAZ = () => (dispatch) => {
  console.log("sortBookAZ redux Function");
  dispatch(setBooksLoading());
  axios
    .get("/api/books/sort-AZ")
    .then((res) => {
      console.log("sortedBooks:", res.data)
      dispatch({
        type: SORT_BOOK_AZ,
        payload: res.data,
      })
    })
    .catch((err) => {
      console.log("getBook action error:", err);
    });
};

export const addBook = (data) => (dispatch) => {
  console.log("addBook redux action");
  // console.log(data);
  dispatch(addBookLoading());
  axios
    .post("/api/books", data)
    .then((res) => {
      console.log("addbook action response:", res.data);
      dispatch({
        type: ADD_BOOK,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log("addBook action error:", err);
    });
};

export const deleteBook = (id) => (dispatch) => {
  console.log("deleteBook redux Function");
  // console.log("id:", id);
  dispatch(setBooksLoading());
  axios.delete(`/api/books/${id}`).then((res) => {
    dispatch({
      type: DELETE_BOOK,
      payload: res.data,
    });
  });
};

export const setBooksLoading = () => {
  return {
    type: BOOKS_LOADING,
  };
};

export const addBookLoading = () => {
  return {
    type: ADD_BOOK_LOADING,
  };
};
