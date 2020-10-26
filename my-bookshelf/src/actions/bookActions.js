import axios from "axios";
import { GET_BOOKS, ADD_BOOK, DELETE_BOOK, BOOKS_LOADING } from "./types";

export const getBooks = () => (dispatch) => {
  console.log("getBook action");
  dispatch(setBooksLoading());
  axios.get("/api/books").then((res) => {
    dispatch({
      type: GET_BOOKS,
      payload: res.data,
    });
  });
};

export const addBook = (data) => (dispatch) => {
  console.log("addBook redux action");
  // console.log(data);
  dispatch(setBooksLoading());
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
      console.log("addBook action error");
    });
};

export const deleteBook = (id) => (dispatch) => {
  console.log("deleteBook redux Function");
  // console.log("id:", id);
  dispatch(setBooksLoading());
  axios.delete(`/api/books/${id}`).then((res) => {
    dispatch({
      type: DELETE_BOOK,
      payload: res.id,
    });
  });
};

export const setBooksLoading = () => {
  return {
    type: BOOKS_LOADING,
  };
};
