import React, { useEffect } from "react";
import {
  Container,
  ListGroup,
  ListGroupItem,
  Spinner,
  Button,
} from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Link } from "react-router-dom";

import GenericModal from "./GenericModal";

//Redux
import { connect, useDispatch } from "react-redux";
import { deleteBook, sortBookAZ } from "../actions/bookActions";

const BookShelfAZ = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(sortBookAZ());
  }, [dispatch]);

  const handleDelete = (id) => {
    console.log(id);
    const confirmation = prompt("Please type 'Delete'");
    if (confirmation === "Delete") {
      props.deleteBook(id);
    }
    window.location.reload();
  };

  return (
    <div>
      <Container className="bookshelf-container">
        {props.loading ? <Spinner color="primary" /> : null}
        {props.addBookLoading ? (
          <div id="add-book-loading-spinner">
            <Spinner color="primary"></Spinner>
            <h4>
              Adding Book Now: Please wait while we retrieve a high quality
              image...
            </h4>
          </div>
        ) : null}
        <ListGroup>
          <TransitionGroup className="book-list">
            {props.books.map(
              ({
                _id,
                title,
                subtitle,
                author,
                publishedDate,
                description,
                image,
                dateAdded,
                category,
              }) => (
                <CSSTransition key={_id} timeout={600} classNames="fade">
                  <ListGroupItem>
                    <img
                      className="book-cover"
                      src={image}
                      alt="Book Cover"
                    ></img>

                    <GenericModal
                      id={_id}
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
                      onClick={() => handleDelete(_id)}
                    >
                      &times;
                      <Link to="/"></Link>
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
  loading: state.book.loading,
  addBookLoading: state.book.addBookLoading,
});

const mapDispatchToProps = (dispatch) => {
  return {
    sortBookAZ: () => dispatch(sortBookAZ),
    deleteBook: (id) => dispatch(deleteBook(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookShelfAZ);