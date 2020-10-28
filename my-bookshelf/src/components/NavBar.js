import React, { useState } from "react";

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

const NavBar = (props) => {
  //NavBar toggler is only really needed for the phone screen
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar dark expand="sm" className="bg-primary">
        <Container className="nav-container">
          <NavbarBrand href="/">My Bookshelf</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/search">Add New Book</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/JakeScudder">Github</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;
