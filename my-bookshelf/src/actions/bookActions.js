import { GET_BOOKS, ADD_BOOK, DELETE_BOOK } from "./types";

export const getBooks = () => (dispatch) => {
  console.log("Getting book action");
  return {
    type: GET_BOOKS,
  };
};

export const addBook = (data) => (dispatch) => {
  console.log("addBook redux action");
  dispatch({
    type: ADD_BOOK,
    payload: data,
  });
};

export const deleteBook = (id) => (dispatch) => {
  dispatch({
    type: DELETE_BOOK,
    payload: id,
  });
};
