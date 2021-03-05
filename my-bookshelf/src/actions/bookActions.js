import axios from "axios";

import {
  GET_BOOKS,
  ADD_BOOK,
  DELETE_BOOK,
  BOOKS_LOADING,
  ADD_BOOK_LOADING,
  SORT_BOOK_AZ,
} from "./types";

import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";

export const getBooks = (pageNumber = "") => async (dispatch) => {
  console.log("getBook action");
  dispatch(setBooksLoading());
  try {
    const { data } = await axios.get(`/api/books?pageNumber=${pageNumber}`);

    dispatch({
      type: GET_BOOKS,
      payload: data,
    });
  } catch (error) {
    console.log("getBook action error:", error);
    dispatch(returnErrors(error.response.data, error.response.status));
  }
};

export const sortBookAZ = () => (dispatch) => {
  console.log("sortBookAZ redux Function");
  dispatch(setBooksLoading());
  axios
    .get("/api/books/sort-AZ")
    .then((res) => {
      console.log("sortedBooks:", res.data);
      dispatch({
        type: SORT_BOOK_AZ,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log("getBook action error:", err);
    });
};

export const addBook = (data) => (dispatch, getState) => {
  console.log("addBook redux action");
  // console.log(data);
  dispatch(addBookLoading());
  axios
    .post("/api/books", data, tokenConfig(getState))
    .then((res) => {
      console.log("addbook action response:", res.data);
      dispatch({
        type: ADD_BOOK,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log("addBook action error:", err);
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const deleteBook = (id) => (dispatch, getState) => {
  console.log("deleteBook redux Function");
  // console.log("id:", id);
  dispatch(setBooksLoading());
  axios.delete(`/api/books/${id}`, tokenConfig(getState)).then((res) => {
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
