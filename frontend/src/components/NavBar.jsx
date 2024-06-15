import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import "../styles/navbar.css"

function NavBar() {
	const auth = useAuth();
	return (
        <Navbar className="position-relative" bg="dark" variant="dark">
        <Container className="d-flex justify-content-between align-items-center m-4">
          <Navbar.Brand className="mainTitle position-absolute start-50 translate-middle-x">
            Todo App
          </Navbar.Brand>
          {auth.user && <Nav.Link onClick={auth.logout} className="fw-bold secondary position-absolute end-0 p-3 text-light" >
            Logout
          </Nav.Link>}
          {/* <Nav.Link disabled className="fw-bold position-absolute end-100 p-3">
            {user?.username}
          </Nav.Link> */}
        </Container>
      </Navbar> 
	);
}

export default NavBar;
