import { useNavigate, Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Offcanvas from "react-bootstrap/Offcanvas";
import Nav from "react-bootstrap/Nav";
import "../App.css";

const NavbarComponent = (props, { token }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
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

  // get user data
  useEffect(() => {
    axios
      .get("http://localhost:5000/getUser", {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      })
      .then((response) => {
        console.log("Token is valid:", response.data);
        setUser(response.data);
      })
      .catch((error) => {
        console.log("Error verifying token:", error);
      });
  }, [token]);

  // Get the current location
  const location = useLocation();
  const activePage = location.pathname;

  return [false].map((expand) => (
    <Navbar key={expand} expand={expand} className="bg-body-tertiary">
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
        <p className="navbar-welcome">Hello, {user.email}</p>

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
              className="navbar-toogle-title"
            >
              VGU E-Learning
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-1">
              <Link
                to="/home"
                className={`btn navbar-toogle-link ${
                  activePage === "/home" ? "active" : ""
                }`}
                style={{
                  backgroundColor: activePage === "/home" ? "#ecebeab7" : "",
                  border: activePage === "/home" ? "none" : "",
                }}
              >
                Home
              </Link>
              <Link
                to="/profile"
                className={`btn navbar-toogle-link ${
                  activePage === "/profile" ? "active" : ""
                }`}
                style={{
                  backgroundColor: activePage === "/profile" ? "#ecebeab7" : "",
                  border: activePage === "/profile" ? "none" : "",
                }}
              >
                Profile
              </Link>
              <br />
              <button className="btn navbar-toogle" onClick={() => Logout()}>
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
