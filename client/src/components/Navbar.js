import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React from 'react';


export default function NavBar () {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/overview">Overview</Nav.Link>
            <Nav.Link href="/expenses">Expenses</Nav.Link>
            <Nav.Link href="/income">Income</Nav.Link>
            <Nav.Link href="/shared">Shared</Nav.Link>
          </Nav>
          <Navbar.Text>
            Signed in as: Mark Otto
          </Navbar.Text>
          <a href="/">Sign Out</a>
        </Container>
      </Navbar>
    </>
  );
}

