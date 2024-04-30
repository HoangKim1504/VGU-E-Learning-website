import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Offcanvas from "react-bootstrap/Offcanvas";
import Nav from "react-bootstrap/Nav";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../App.css";

const NavbarComponent = (props) => {
  const navigate = useNavigate();
  // Function to log out the user
  const Logout = () => {
    // Send a request to the server to clear the JWT cookie
    axios
      .get(
        "http://localhost:5000/logout",
        { withCredentials: true } // Include credentials in the request
      )
      .then((res) => {
        navigate("/");
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  return [false].map((expand) => (
    <Navbar key={expand} expand={expand} className="bg-body-tertiary mb-3">
      <Container fluid>
        {/* Navbar logo */}
        <Navbar.Brand href="/home">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/9/96/VGU-Logo.png"
            alt="VGU logo"
            height="40"
            weight="40"
            style={{ marginLeft: "20px" }}
          />
        </Navbar.Brand>

        {/* Navbar toogle */}
        <Navbar.Toggle
          aria-controls={`offcanvasNavbar-expand-${expand}`}
          className="navbar-toogle"
        />

        {/* offcanvas navbar */}
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-${expand}`}
          aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
          placement="end"
          style={{ width: "20%" }}
        >
          <Offcanvas.Header closeButton className="toggle-navbar-top">
            <Offcanvas.Title
              id={`offcanvasNavbarLabel-expand-${expand}`}
              className="toogle-navbar-title"
            >
              VGU E-Learning
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Nav.Link href="/home">Home</Nav.Link>
              <Nav.Link href="/profile">Profile</Nav.Link>
              <br />
              <button className="btn toogle-navbar" onClick={() => Logout()}>
                Log out
              </button>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  ));
};

export default NavbarComponent;
