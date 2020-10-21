import React, { useState } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { v4 as uuidv4 } from "uuid";

import GenericModal from "./GenericModal";

const BookShelf = (props) => {
  const [books, setBooks] = useState([
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
  ]);

  return (
    <div>
      <Container>
        <Button
          dark="true"
          className="bg-primary"
          style={{ marginBottom: ".5rem" }}
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

                    <GenericModal
                      id={id}
                      title={title}
                      subtitle={subtitle}
                      author={author}
                      publishedDate={publishedDate}
                      description={description}
                      image={image}
                      dateAdded={dateAdded}
                      category={category}
                    />
                    <Button
                      className="remove-btn"
                      color="primary"
                      size="md"
                      onClick={() => {
                        const confirmation = prompt("Please type 'Delete'");
                        if (confirmation === "Delete") {
                          setBooks((books) =>
                            books.filter((book) => book.id !== id)
                          );
                        }
                      }}
                    >
                      &times;
                    </Button>
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
