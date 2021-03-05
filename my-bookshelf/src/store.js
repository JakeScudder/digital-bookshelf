import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import bookReducer from "./reducers/bookReducer";
import errorReducer from "./reducers/errorReducer";
import authReducer from "./reducers/authReducer";

const initialState = {};

const middleware = [thunk];

const reducer = combineReducers({
  book: bookReducer,
  error: errorReducer,
  auth: authReducer,
});

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
