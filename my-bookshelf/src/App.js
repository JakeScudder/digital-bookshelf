import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import NavBar from "./components/NavBar";
import BookShelf from "./components/BookShelf";

function App() {
  return (
    <div className="App">
      <NavBar />
      <BookShelf />
    </div>
  );
}

export default App;
