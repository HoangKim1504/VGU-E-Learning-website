import React from "react";
import "../../App.css";
import NavbarComponent from "../../components/NavbarComponent";
import FooterComponent from "../../components/FooterComponent";
import TabComponent from "../../components/TabComponent";
import BreadcrumbComponent from "../../components/BreadcrumbComponent";
import AccordionComponent from "../../components/AccordionComponent";
import axios from "axios";
import { useState, useEffect } from "react";
import Card from "react-bootstrap/Card"; // Import Card from react-bootstrap
import { useParams } from "react-router-dom";

const Classwork = ({ token }) => {
  const [inClass, setInClass] = useState([]);
  const [homework, setHomework] = useState([]);
  const { title } = useParams();

  // Fetch classwork - class activity from the server
  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/courses/${title}/classwork/in-class `,
        { withCredentials: true } // Include credentials in the request
      )
      .then((res) => {
        console.log(res.data);
        setInClass(res.data);
      })
      .catch((err) => console.log(err));
  }, [title]);

  // Fetch classwork - homework from the server
  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/courses/${title}/classwork/homework `,
        { withCredentials: true } // Include credentials in the request
      )
      .then((res) => {
        console.log(res.data);
        setHomework(res.data);
      })
      .catch((err) => console.log(err));
  }, [title]);

  // Display the classwork
  return (
    <div>
      {/* Navbar */}
      <NavbarComponent />
      <BreadcrumbComponent title={title} />
      {/* Tab bar */}
      <TabComponent title={title} />
      {/* Post title */}
      <div className="course-info-header">
        <h1 className="course-info-title">Classwork</h1>
      </div>
      {/* Post */}
      {/* Class activity */}
      {Array.isArray(inClass) && inClass.length === 0 ? (
        <>
          <Card.Header as="h3" className="classwork-header">
            Class Activity
          </Card.Header>
          <p className="classwork-empty">There is no Class Activity here.</p>
        </>
      ) : (
        <>
          <Card.Header as="h3" className="classwork-header">
            Class Activity
          </Card.Header>
          <div className="accordion-box">
            {Array.isArray(inClass) &&
              inClass.map((item) => (
                <AccordionComponent
                  key={item.id}
                  title={item.title}
                  type={item.type}
                  link={item.link}
                  className="classwork-accordion"
                />
              ))}
          </div>
        </>
      )}

      {/* Homework */}
      {Array.isArray(homework) && homework.length === 0 ? (
        <>
          <Card.Header as="h3" className="classwork-header">
            Homework
          </Card.Header>
          <p className="classwork-empty">There is no Homework here.</p>
        </>
      ) : (
        <>
          <Card.Header as="h3" className="classwork-header">
            Homework
          </Card.Header>
          <div className="accordion-box">
            {Array.isArray(homework) &&
              homework.map((item) => (
                <AccordionComponent
                  key={item.id}
                  title={item.title}
                  type={item.type}
                  link={item.link}
                  className="classwork-accordion"
                />
              ))}
          </div>
        </>
      )}
      <br />
      {/* Footer */}
      <FooterComponent />
    </div>
  );
};

export default Classwork;
