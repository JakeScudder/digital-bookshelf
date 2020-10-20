import React, { Component } from "react";
import { getData } from "../APIFetch";
import apiKey from "../apiKey";

class Book extends Component {
  render() {
    let config = { "Access-Control-Allow-Origin": "*" };
    let url = `https://www.googleapis.com/books/v1/volumes?q=mistborn&key=${apiKey}`;
    getData(
      url,
      config,
      (res) => {
        //success
        console.log("success");
        console.log(res);
      },
      (err) => {
        //error
        alert(err);
      }
    );
    return <div></div>;
  }
}

export default Book;
