import React, { useState } from "react";
import {
  Container,
  ListGroup,
  ListGroupItem,
  Button,
  Collapse,
  Card,
  CardBody,
} from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { v4 as uuidv4 } from "uuid";

const BookShelf = (props) => {
  const [books, setBooks] = useState([
    {
      id: uuidv4(),
      title: "Mistborn",
      subtitle: "The Final empire",
      author: "Brandon Sanderson",
      publishedDate: "2010-04-01",
      description:
        'For a thousand years the ash fell and no flowers bloomed. For a thousand years the Skaa slaved in misery and lived in fear. For a thousand years the Lord Ruler, the "Sliver of Infinity," reigned with absolute power and ultimate terror, divinely invincible. Then, when hope was so long lost that not even its memory remained, a terribly scarred, heart-broken half-Skaa rediscovered it in the depths of the Lord Ruler\'s most hellish prison. Kelsier "snapped" and found in himself the powers of a Mistborn. A brilliant thief and natural leader, he turned his talents to the ultimate caper, with the Lord Ruler himself as the mark. Kelsier recruited the underworld\'s elite, the smartest and most trustworthy allomancers, each of whom shares one of his many powers, and all of whom relish a high-stakes challenge. Only then does he reveal his ultimate dream, not just the greatest heist in history, but the downfall of the divine despot. But even with the best criminal crew ever assembled, Kel\'s plan looks more like the ultimate long shot, until luck brings a ragged girl named Vin into his life.',
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
  ]);

  // Function shows book details based on id
  const showDetails = (id) => {
    console.log(id);
    let element = document.getElementById(id);
    console.log(element);
    if (element.className === "collapse") {
      element.className = "collapse-show";
    } else {
      element.className = "collapse";
    }
  };

  return (
    <div>
      <Container>
        <Button
          dark="true"
          className="bg-primary"
          style={{ marginBottom: "2rem" }}
          onClick={() => {
            const title = prompt("Add Book Title");
            if (title) {
              setBooks((books) => books.concat({ id: uuidv4(), title }));
            }
          }}
        >
          Add Book
        </Button>
        <ListGroup>
          <TransitionGroup className="book-list">
            {books.map(
              ({
                id,
                title,
                subtitle,
                author,
                publishedDate,
                description,
                image,
                dateAdded,
                category,
              }) => (
                <CSSTransition key={id} timeout={600} classNames="fade">
                  <ListGroupItem>
                    <img
                      className="book-cover"
                      src={image}
                      alt="Book Cover"
                    ></img>
                    {/* Button passes the id of the collapse element to the handleClick function with an anonymous function */}
                    <Button
                      color="primary"
                      onClick={() => showDetails(id)}
                      style={{ marginBottom: "1rem" }}
                    >
                      Show Description
                    </Button>
                    <Collapse id={id}>
                      <Card>
                        <CardBody>
                          <h1 className="title">{title}</h1>
                          <h2 className="subtitle">{subtitle}</h2>
                          <h4 className="author">{author}</h4>
                          <h5 className="date-published">
                            Published on: {publishedDate}
                          </h5>
                          <p className="description">{description}</p>
                          <p className="date-added">
                            Book added on:{dateAdded}
                          </p>
                          <p className="category">Category: {category}</p>
                        </CardBody>
                      </Card>
                    </Collapse>
                  </ListGroupItem>
                </CSSTransition>
              )
            )}
          </TransitionGroup>
        </ListGroup>
      </Container>
    </div>
  );
};

export default BookShelf;
