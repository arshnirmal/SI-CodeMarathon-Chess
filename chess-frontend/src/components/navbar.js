import React from "react";
import { Button, Form, FormControl, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "./chess1.png";

const NavbarComponent = () => {
  return (
    <Navbar expand="lg" style={{ backgroundColor: "#4e7837" }}>
      <div className="container">
        <Navbar.Brand
          as={Link}
          to="/"
          style={{ color: "#ffffff", fontSize: "1.5rem" }}
        >
          <img src={logo} width="35" height="35" alt="logo" /> Chess App
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          style={{ color: "#2c2b29" }}
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" style={{ color: "#ffffff" }}>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/add-match" style={{ color: "#ffffff" }}>
              Add Match
            </Nav.Link>
            <Nav.Link as={Link} to="/top-players" style={{ color: "#ffffff" }}>
              Top Players
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/search-players"
              style={{ color: "#ffffff" }}
            >
              Search Players
            </Nav.Link>
            <Nav.Link as={Link} to="/most-wins" style={{ color: "#ffffff" }}>
              Most Wins
            </Nav.Link>
          </Nav>
          <Form className="d-flex">
            <FormControl
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              style={{ backgroundColor: "#ffffff", color: "#4b4847" }}
            />
            <Button
              variant="outline-light"
              style={{ color: "#2c2b29", borderColor: "#2c2b29" }}
            >
              Search
            </Button>
            <div className="mx-2"></div>
            <Button
              variant="outline-light"
              style={{ color: "#2c2b29", borderColor: "#2c2b29" }}
            >
              Logout
            </Button>
          </Form>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default NavbarComponent;
