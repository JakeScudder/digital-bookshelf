import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const GenericModal = (props) => {
  const {
    buttonLabel,
    className,
    isOpen,
    toggle,
    id,
    title,
    subtitle,
    author,
    publishedDate,
    description,
    dateAdded,
    category,
  } = props;

  // const [modal, setModal] = useState(false);

  // const toggle = () => setModal(!modal);

  return (
    <div>
      <Button color="danger" onClick={toggle}>
        {buttonLabel}
      </Button>
      <Modal id={id} isOpen={isOpen} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>
          <h1 className="title">{title}</h1>
          <h2 className="subtitle">{subtitle}</h2>
          <h4 className="author">{author}</h4>
          <h5 className="date-published">Published on: {publishedDate}</h5>
          <p className="date-added">
            Added to Digital Bookshelf on:{dateAdded}
          </p>
          <p className="category">Category: {category}</p>
          <p className="description">{description}</p>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Hide Details
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default GenericModal;
