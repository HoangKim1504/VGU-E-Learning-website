import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

function ListGroupComponent(props) {
  return (
    <div>
      <Card className="list-group-card">
        <Card.Header className="post-header ">
          <strong>Students</strong>
        </Card.Header>
        <ListGroup as="ol" numbered className="list-group">
          <ListGroup.Item as="li">{props.email}</ListGroup.Item>
        </ListGroup>
      </Card>
    </div>
  );
}

export default ListGroupComponent;
