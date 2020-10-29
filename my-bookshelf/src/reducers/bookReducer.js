import {
  GET_BOOKS,
  SORT_BOOK_AZ,
  DELETE_BOOK,
  ADD_BOOK,
  BOOKS_LOADING,
  ADD_BOOK_LOADING,
} from "../actions/types";

const initialState = {
  bookData: [],
  loading: false,
  addBookLoading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_BOOKS:
      return {
        ...state,
        bookData: action.payload,
        loading: false,
      };
      case SORT_BOOK_AZ:
        return {
          ...state,
          bookData: action.payload,
          loading: false,
        };
    case DELETE_BOOK:
      return {
        ...state,
        bookData: state.bookData.filter((book) => book.id !== action.payload),
        loading: false,
      };
    case ADD_BOOK:
      return {
        ...state,
        bookData: [...state.bookData, action.payload],
        addBookLoading: false,
      };

    case BOOKS_LOADING:
      return {
        ...state,
        loading: true,
      };

    case ADD_BOOK_LOADING:
      return {
        ...state,
        addBookLoading: true,
      };
    default:
      return state;
  }
}
