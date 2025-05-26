import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import styles from "@/styles/MainNav.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw } from '@fortawesome/free-solid-svg-icons';

const MainNav = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse user from localStorage", e);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    window.location.href = "/";
  };

  return (
    <Navbar expand="lg" bg="dark" variant="dark">
      <Container fluid>
        <Navbar.Brand href="/">
          <FontAwesomeIcon icon={faPaw} /> Pet Adoption
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className={`me-auto my-2 my-lg-0 nav ${styles.Nav}`} navbarScroll>
            <Nav.Link href="/">About Us</Nav.Link>
            <NavDropdown title="Adopt a Pet" id="navbarScrollingDropdown">
              <NavDropdown.Item href="/">Dog</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/">Cat</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/">Bird</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/">Rabbit</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/">Contact Us</Nav.Link>
          </Nav>

          {user ? (
              <Nav>
              <NavDropdown title={`Welcome, ${user.username}`} id="userDropdown" align="end">
                <NavDropdown.Item href="/">Edit Profile</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          ) : (
            <>
              <Button
                className={styles.buttonSpace}
                variant="outline-warning"
                onClick={() => window.location.href = '/login'}
              >
                Login
              </Button>
              <Button
                className={styles.buttonSpace}
                variant="outline-danger"
                onClick={() => window.location.href = '/signup'}
              >
                Sign Up
              </Button>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MainNav;
