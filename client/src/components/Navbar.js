import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { LogoutButton } from '../hooks/useLogOut';
import Navbar from 'react-bootstrap/Navbar';
import React from 'react';


export default function NavBar ({email}) {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Nav className="me-auto">
            <Nav.Link href="/overview">Overview</Nav.Link>
            <Nav.Link href="/expenses">Expenses</Nav.Link>
            <Nav.Link href="/income">Income</Nav.Link>
            <Nav.Link href="/shared">Shared</Nav.Link>
          </Nav>
          
          <Navbar.Text>
            Signed in as: {email}
          </Navbar.Text>
        </Container>
        <LogoutButton className=""/>
      </Navbar>
    </>
  );
}

