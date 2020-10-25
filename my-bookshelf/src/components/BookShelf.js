import React, { useEffect } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import GenericModal from "./GenericModal";

//Redux
import { connect } from "react-redux";
import { getBooks, deleteBook } from "../actions/bookActions";

const BookShelf = (props) => {
  useEffect(() => {
    props.getBooks();
    console.log("BookShelf Component:", props.books);
  });

  const handleDelete = (id) => {
    console.log(id);
    const confirmation = prompt("Please type 'Delete'");
    if (confirmation === "Delete") {
      props.deleteBook(id);
    }
  };

  return (
    <div>
      <Container>
        {/* <Button
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
        </Button> */}
        <ListGroup>
          <TransitionGroup className="book-list">
            {props.books.map(
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
                      onClick={() => handleDelete(id)}
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

const mapStateToProps = (state) => ({
  books: state.book.bookData,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getBooks: () => dispatch(getBooks),
    deleteBook: (id) => dispatch(deleteBook(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookShelf);
