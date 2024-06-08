import { React, useEffect, useState } from "react";
import axios from "axios";
import "../../App.css";
import NavbarComponent from "../../components/NavbarComponent";
import FooterComponent from "../../components/FooterComponent";
import TabComponent from "../../components/TabComponent";
// import M1Algebra from "../../assets/module-files/M1 - Algebra.pdf";
import BreadcrumbComponent from "../../components/BreadcrumbComponent";
import { useParams } from "react-router-dom";

const CourseInfo = ({ token }) => {
  const [course, setCourse] = useState([]);
  const [pdfFile, setPdfFile] = useState([]);
  const { title } = useParams();

  // Fetch courses data from the server
  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/courses/${title}/course-info`,
        { withCredentials: true } // Include credentials in the request
      )
      .then((res) => {
        console.log(res.data);
        setCourse(res.data);
      })
      .catch((err) => console.log(err));
  }, [title]);

  // Fetch pdf data from the server
  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/courses/${title}/pdf`,
        { withCredentials: true, responseType: "blob" } // Set the response type to 'blob'
      )
      .then((res) => {
        console.log(res.data);
        // Create a URL object from the blob
        const url = URL.createObjectURL(res.data);

        // Set the PDF data state
        setPdfFile(url);
      })
      .catch((err) => console.log(err));
  }, [title]);

  return (
    <>
      {/* Navbar */}
      <NavbarComponent />
      <BreadcrumbComponent title={title} />
      {/* Tab bar */}
      <TabComponent title={title} />
      {/* Course info */}
      <div className="course-info-header">
        <h1 className="course-info-title">{course.title}</h1>
      </div>
      <h3 className="course-info">Teacher: {course.teacher}</h3>
      <h3 className="course-info">
        Course Curriculum:
        <br />
        <>
          <br />
          {pdfFile && (
            <object
              data={pdfFile}
              type="application/pdf"
              width="100%"
              height="600px"
            >
              <p>
                Your browser does not support PDFs.
                <a href={pdfFile}>Download the PDF file here</a>.
              </p>
            </object>
          )}
        </>
      </h3>
      <h3 className="course-info">Reference book: </h3>
      <p className="book-info">{course.book}</p>

      <br />
      {/* Footer */}
      <FooterComponent />
    </>
  );
};

export default CourseInfo;
