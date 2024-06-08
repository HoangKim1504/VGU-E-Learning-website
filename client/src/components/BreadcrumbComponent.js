import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link } from "react-router-dom";

function BreadcrumbComponent(props) {
  return (
    <div>
      <Breadcrumb className="breadcrumb">
        <Breadcrumb.Item>
          <Link to="/home" className="item-breadcrumb">
            Home
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item active>{props.title}</Breadcrumb.Item>
      </Breadcrumb>
    </div>
  );
}

export default BreadcrumbComponent;
