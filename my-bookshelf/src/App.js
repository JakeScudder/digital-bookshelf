import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import NavBar from "./components/NavBar";
import Search from "./components/Search";
import BookShelf from "./components/BookShelf";
import BookShelfAZ from "./components/BookShelfAZ";

//Redux
import { Provider } from "react-redux";
import store from "./store";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
          <NavBar />
          <Switch>
            <Route exact path="/">
              <BookShelf />
            </Route>
            <Route exact path="/sort-by-title">
              <BookShelfAZ />
            </Route>
            <Route path="/search">
              <Search />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
