import React, { useState, Fragment } from "react";

import {
  Collapse,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  Container,
} from "reactstrap";

// Redux
import { connect } from "react-redux";
import { sortBookAZ } from "../actions/bookActions";

// Components
import RegisterModal from "./auth/RegisterModal";
import LoginModal from "./auth/LoginModal";
import Logout from "./auth/Logout";

const NavBar = (props) => {
  //NavBar toggler is only really needed for the phone screen
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const handleRedux = () => {
    console.log("calling sortBookAZ redux")
    props.sortBookAZ();
  }

  const authLinks = (

  );

  
  return (
    <div>
      <Navbar dark expand="sm" className="bg-primary">
        <Container className="nav-container">
          <NavbarBrand href="/">My Bookshelf</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink onClick={handleRedux} href="/sort-by-title">Sort A - Z</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/search">Add New Book</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/JakeScudder" id="github-link">Github</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#">|</NavLink>
              </NavItem>
              <NavItem>
                <RegisterModal/>
              </NavItem>
              <NavItem>
                <LoginModal/>
              </NavItem>
              <NavItem>
                <Logout />
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

const mapStateToProps = (state) => ({
  books: state.book.bookData,
  loading: state.book.loading,
  isAuth: state.auth.isAuthenticated,
  user: state.auth.user
});

const mapDispatchToProps = (dispatch) => {
  return {
    sortBookAZ: () => dispatch(sortBookAZ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);