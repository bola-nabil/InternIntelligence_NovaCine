import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import NavLink from "./NavLink";
const NavBar = () => {
  return (
    <Navbar bg="dark" data-bs-theme="dark" fixed="bottom">
      <Container>
        <Nav className="text-end margin-auto">
          <NavLink />
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
