import React from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import "../App.css";

const CardVerticalComponent = (props) => {
  return (
    <Card>
      <Card.Img variant="top" src={props.image} width="50px" height="170px" />
      <Card.Body>
        <Link
          to={`/courses/${props.title}/course-info`}
          className="course-card"
        >
          <Card.Title>{props.title}</Card.Title>
        </Link>
        <Card.Text>Semester {props.semester}</Card.Text>
        <Card.Text>Teacher: {props.teacher}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default CardVerticalComponent;
