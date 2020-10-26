import {
  GET_BOOKS,
  DELETE_BOOK,
  ADD_BOOK,
  BOOKS_LOADING,
} from "../actions/types";

const initialState = {
  bookData: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_BOOKS:
      return {
        ...state,
        bookData: action.payload,
        loading: false,
      };
    case DELETE_BOOK:
      return {
        ...state,
        bookData: state.bookData.filter((book) => book.id !== action.payload),
      };
    case ADD_BOOK:
      return {
        ...state,
        bookData: [...state.bookData, action.payload],
        loading: false,
      };

    case BOOKS_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
