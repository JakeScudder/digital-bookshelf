import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import NavBar from "./components/NavBar";
import Search from "./components/Search";
import BookShelf from "./components/BookShelf";
import BookShelfAZ from "./components/BookShelfAZ";

import store from "./store";
import { loadUser } from "./actions/authActions";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <NavBar />
          <Switch>
            <Route exact path="/sort-by-title" component={BookShelfAZ} />
            <Route path="/search" component={Search} />
            <Route exact path="/page/:pageNumber" component={BookShelf} />
            <Route exact path="/" component={BookShelf} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
