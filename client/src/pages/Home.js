import { React, useState, useEffect } from "react";
import axios from "axios";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Pagination from "react-bootstrap/Pagination";
import CardComponent from "../components/CardComponent";
import NavbarComponent from "../components/NavbarComponent";
import FooterComponent from "../components/FooterComponent";
import "../App.css";

function Home(props) {
  const [courses, setCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch courses data from the server
  useEffect(() => {
    axios
      .get(
        "http://localhost:5000/courses",
        { params: { page: currentPage } }, // Send the page number as a query parameter
        { withCredentials: true } // Include credentials in the request
      )
      .then((res) => {
        setCourses(res.data.data);
        setTotalPages(res.data.totalPages);
      })
      .catch((err) => console.log(err));
  }, [currentPage]);

  // Pagination
  let items = [];
  for (let number = 1; number <= totalPages; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === currentPage}
        onClick={() => setCurrentPage(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  return (
    <div>
      <NavbarComponent />
      {/* Title image */}
      <div className="p-3 text-center bg-image">
        <div className="mask">
          <div className="d-flex justify-content-center align-items-center h-100">
            <div className="text-white">
              <h1 className="mb-3">Courses</h1>
            </div>
          </div>
        </div>
      </div>
      <br />
      {/* List of courses  */}
      <Row xs={2} md={3} className="g-4">
        {courses.map((course) => (
          <Col key={course.id}>
            <CardComponent
              key={course.id}
              image={course.image}
              title={course.title}
              description={course.description}
            />
          </Col>
        ))}
      </Row>
      <br />
      {/* Pagination */}
      <Pagination className="pagination">{items}</Pagination>
      {/* Footer */}
      <FooterComponent />
    </div>
  );
}

export default Home;
