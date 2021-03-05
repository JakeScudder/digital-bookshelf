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
import Paginate from "./Paginate";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { sortBookAZ, deleteBook } from "../actions/bookActions";

const BookShelfAZ = ({ match }) => {
  const dispatch = useDispatch();

  const bookData = useSelector((state) => state.book.bookData);
  const page = useSelector((state) => state.book.page);
  const pages = useSelector((state) => state.book.pages);
  const loading = useSelector((state) => state.loading);
  const isAuth = useSelector((state) => state.isAuth);
  const addBookLoading = useSelector((state) => state.addBookLoading);

  console.log(match);
  const pageNumber = match.params.pageNumber || 1;

  useEffect(() => {
    dispatch(sortBookAZ(pageNumber));
  }, [dispatch, pageNumber]);

  const handleDelete = (id) => {
    console.log(id);
    const confirmation = prompt("Please type 'Delete'");
    if (confirmation === "Delete") {
      dispatch(deleteBook(id));
    }
    window.location.reload();
  };

  return (
    <div>
      <Container className="bookshelf-container">
        {loading ? <Spinner color="primary" /> : null}
        {addBookLoading ? (
          <div id="add-book-loading-spinner">
            <Spinner color="primary"></Spinner>
            <h4>
              Adding Book Now: Please wait while we retrieve a high quality
              image...
            </h4>
          </div>
        ) : null}
        <ListGroup style={{ marginBottom: "2rem" }}>
          <TransitionGroup className="book-list">
            {bookData.map(
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
                      alt="Book Cover"></img>

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
                    {isAuth ? (
                      <Button
                        className="remove-btn"
                        color="primary"
                        size="md"
                        onClick={() => handleDelete(_id)}>
                        &times;
                        <Link to="/"></Link>
                      </Button>
                    ) : null}
                  </ListGroupItem>
                </CSSTransition>
              )
            )}
          </TransitionGroup>
        </ListGroup>
        <Paginate pages={pages} page={page} />
      </Container>
    </div>
  );
};

export default BookShelfAZ;
