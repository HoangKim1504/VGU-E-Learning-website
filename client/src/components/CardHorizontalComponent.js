import React from "react";
import Card from "react-bootstrap/Card";
import "../App.css";

const CardHorizontalComponent = (props) => {
  // Format the date
  const dateTime = new Date(props.date);
  // Format the date to be dd-mm-yyyy
  const formattedDate = `${dateTime.getDate()}-${
    dateTime.getMonth() + 1
  }-${dateTime.getFullYear()}`;

  return (
    <>
      <Card className="card-horizontal">
        <Card.Header as="h4" className="post-header">
          {props.title}
        </Card.Header>
        <Card.Body>
          <Card.Title>
            <h6>
              Post by {props.owner} at {formattedDate} ({props.time})
            </h6>
          </Card.Title>
          <br />
          <Card.Text className="post-content">{props.content}</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default CardHorizontalComponent;
