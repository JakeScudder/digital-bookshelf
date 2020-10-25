import { v4 as uuidv4 } from "uuid";
import { GET_BOOKS, DELETE_BOOK, ADD_BOOK } from "../actions/types";

const initialState = {
  bookData: [
    {
      id: uuidv4(),
      title: "Mistborn",
      subtitle: "The Final empire",
      author: "Brandon Sanderson",
      publishedDate: "2010-04-01",
      description:
        'For a thousand years the ash fell and no flowers bloomed. For a thousand years the Skaa slaved in misery and lived in fear. For a thousand years the Lord Ruler, the "Sliver of Infinity," reigned with absolute power and ultimate terror, divinely invincible. Then, when hope was so long lost that not even its memory remained, a terribly scarred, heart-broken half-Skaa rediscovered it in the depths of the Lord Ruler\'s most hellish prison. Kelsier "snapped" and found in himself the powers of a Mistborn. A brilliant thief and natural leader, he turned his talents to the ultimate caper, with the Lord Ruler himself as the mark.',
      image:
        "https://m.media-amazon.com/images/I/91MtImlhRSL._AC_UY654_FMwebp_QL65_.jpg",
      dateAdded: "2020-10-19",
      category: "fantasy",
    },
    {
      id: uuidv4(),
      title: "Warbreaker",
      author: "Brandon Sanderson",
      publishedDate: "2010-04-01",
      description: "Test 2",
      image:
        "https://m.media-amazon.com/images/I/51yNKw2vXSL._AC_UY436_FMwebp_QL65_.jpg",
      dateAdded: "2020-10-19",
      category: "fantasy",
    },
    {
      id: uuidv4(),
      title: "Elantris",
      author: "Brandon Sanderson",
      publishedDate: "2010-04-01",
      description: "Test 3",
      image:
        "https://m.media-amazon.com/images/I/91wTP3k8ZtL._AC_UY654_FMwebp_QL65_.jpg",
      dateAdded: "2020-10-19",
      category: "fantasy",
    },
    {
      id: uuidv4(),
      title: "OathBringer",
      subtitle: "The Final empire",
      author: "Brandon Sanderson",
      publishedDate: "2010-04-01",
      description: "Kelsier is cool",
      image:
        "https://m.media-amazon.com/images/I/91x4fchgt2L._AC_UY654_FMwebp_QL65_.jpg",
      dateAdded: "2020-10-19",
      category: "fantasy",
    },
    {
      id: uuidv4(),
      title: "To Be Deleted",
      subtitle: "The Final empire",
      author: "Brandon Sanderson",
      publishedDate: "2015-04-01",
      description: "Kelsier is cool",
      image:
        "https://m.media-amazon.com/images/I/91x4fchgt2L._AC_UY654_FMwebp_QL65_.jpg",
      dateAdded: "2020-10-19",
      category: "fantasy",
    },
  ],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_BOOKS:
      return {
        ...state,
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
      };
    default:
      return state;
  }
}
