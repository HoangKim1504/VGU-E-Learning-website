import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import React from "react";
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
} from "mdb-react-ui-kit";

function Home() {
  const navigate = useNavigate();

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
  return (
    <div>
      {/* Navbar */}
      {[false].map((expand) => (
        <Navbar key={expand} expand={expand} className="bg-body-tertiary mb-3">
          <Container fluid>
            <Navbar.Brand href="/home">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/9/96/VGU-Logo.png"
                alt="VGU logo"
                height="40"
                weight="40"
                style={{ marginLeft: "20px" }}
              />
            </Navbar.Brand>
            <Navbar.Toggle
              aria-controls={`offcanvasNavbar-expand-${expand}`}
              style={{ marginRight: "20px" }}
            />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
              style={{ width: "20%" }}
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title
                  id={`offcanvasNavbarLabel-expand-${expand}`}
                  style={{ color: "orange" }}
                >
                  VGU E-Learning
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link href="/home">Home</Nav.Link>
                  <Nav.Link href="/profile">Profile</Nav.Link>
                  <br />
                  <button
                    style={{
                      color: "white",
                      background: "orange",
                      borderRadius: "4px",
                    }}
                    onClick={() => Logout()}
                  >
                    Log out
                  </button>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}

      <br />

      {/* Profile */}
      <h1>Profile page</h1>
      <h3>Welcome!</h3>
      {/* Footer */}
      <MDBFooter
        bgColor="light"
        className="text-center text-lg-start text-muted"
      >
        <section className="" style={{ background: "orange" }}>
          <MDBContainer
            className="text-center text-md-start mt-5"
            style={{ paddingTop: "30px", marginLeft: "20px" }}
          >
            <MDBRow className="mt-3">
              <MDBCol md="3" lg="4" xl="3" className="mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">
                  <MDBIcon
                    icon="gem"
                    className="me-3"
                    style={{ paddingTop: "30px" }}
                  />
                  VIETNAMESE-GERMAN UNIVERSITY E-LEARNING
                </h6>
                <p>
                  Ring road 4, Quarter 4, Thoi Hoa Ward, Ben Cat Town, Binh
                  Duong Province
                </p>
              </MDBCol>

              <MDBCol md="2" lg="2" xl="2" className="mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Courses</h6>
                <p>
                  <a href="#!" className="text-reset">
                    Algebra
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    Calculus
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    Introduction to Programming
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    Data Structures and Algorithms
                  </a>
                </p>
              </MDBCol>

              <MDBCol md="3" lg="2" xl="2" className="mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Courses</h6>
                <p>
                  <a href="#!" className="text-reset">
                    Algebra
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    Calculus
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    Introduction to Programming
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    Data Structures and Algorithms
                  </a>
                </p>
              </MDBCol>

              <MDBCol md="4" lg="3" xl="3" className="mx-auto mb-md-0 mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                <p>
                  <MDBIcon icon="home" className="me-2" />
                  Ring road 4, Quarter 4, Thoi Hoa Ward, Ben Cat Town, Binh
                  Duong Province
                </p>
                <p>
                  <MDBIcon icon="envelope" className="me-3" />
                  info@example.com
                </p>
                <p>
                  <MDBIcon icon="phone" className="me-3" /> + 01 234 567 88
                </p>
                <p>
                  <MDBIcon icon="print" className="me-3" /> + 01 234 567 89
                </p>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </section>

        <section
          className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom"
          style={{ background: "orange", marginBottom: "-50px" }}
        >
          {/* <div className="me-5 d-none d-lg-block">
            <span>Get connected with us on social networks:</span>
          </div>

          <div>
            <a href="" className="me-4 text-reset">
              <MDBIcon fab icon="facebook-f" />
            </a>
            <a href="" className="me-4 text-reset">
              <MDBIcon fab icon="twitter" />
            </a>
            <a href="" className="me-4 text-reset">
              <MDBIcon fab icon="google" />
            </a>
            <a href="" className="me-4 text-reset">
              <MDBIcon fab icon="instagram" />
            </a>
            <a href="" className="me-4 text-reset">
              <MDBIcon fab icon="linkedin" />
            </a>
            <a href="" className="me-4 text-reset">
              <MDBIcon fab icon="github" />
            </a>
          </div> */}
        </section>

        <div
          className="text-center p-4"
          // style={{ backgroundColor: "rgba(0, 0, 0, 0.05" }}
          style={{ background: "orange" }}
        >
          © 2024 Copyright: HK
        </div>
      </MDBFooter>
    </div>
  );
}

export default Home;
