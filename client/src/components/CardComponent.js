import React from "react";
import Card from "react-bootstrap/Card";
import "../App.css";

const CardComponent = (props) => {
  return (
    <Card>
      <Card.Img variant="top" src={props.image} width="50px" height="170px" />
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>{props.description}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default CardComponent;
