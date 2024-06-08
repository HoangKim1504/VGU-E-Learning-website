import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
} from "mdb-react-ui-kit";
import "../App.css";

const FooterComponent = () => {
  return (
    <MDBFooter bgColor="light" className="text-center text-lg-start text-muted">
      <section className="section">
        <div className="container text-center text-md-start mt-5">
          <MDBContainer className="text-center text-md-start mt-5">
            <MDBRow className="mt-3">
              <MDBCol md="3" lg="4" xl="3" className="mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4 uni">
                  <MDBIcon icon="gem" className="me-3" />
                  VIETNAMESE-GERMAN UNIVERSITY E-LEARNING
                </h6>
                <p>
                  Ring road 4, Quarter 4, Thoi Hoa Ward, Ben Cat Town, Binh
                  Duong Province
                </p>
                <p>Tel. (0274) 222 0990 - 70206 </p>
                <p>Fax: (0274) 222 0980</p>
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
                    Introduction to Computer Science
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    Introduction to Programming
                  </a>
                </p>
              </MDBCol>

              <MDBCol md="2" lg="2" xl="2" className="mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Courses</h6>
                <p>
                  <a href="#!" className="text-reset">
                    Business Administration
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    English 1
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    English 2
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    Discrete Mathematics
                  </a>
                </p>
              </MDBCol>

              <MDBCol md="2" lg="2" xl="2" className="mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Courses</h6>
                <p>
                  <a href="#!" className="text-reset">
                    Computer Architectures
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    Algorithms and Data Structures
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    Statistics
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    Operating Systems
                  </a>
                </p>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </div>
      </section>

      <div className="text-center p-2">© 2024 Copyright: HK</div>
    </MDBFooter>
  );
};

export default FooterComponent;
