import React from "react";
import "../App.css";
import Nav from "react-bootstrap/Nav";
import { Link, useLocation } from "react-router-dom";

function TabComponent(props) {
  const location = useLocation();
  const activePage = location.pathname;

  return (
    <div className="course-tabs">
      {/* Tabs */}
      <Nav
        fill
        variant="tabs"
        defaultActiveKey={`/courses/${props.title}/course-info`}
      >
        {/* Course-info tab */}
        <Nav.Item className="course-tabs-button">
          <Link
            to={`/courses/${props.title}/course-info`}
            className={`nav-link course-tabs-label ${
              activePage ===
              `/courses/${props.title.replace(/ /g, "%20")}/course-info`
                ? "active"
                : ""
            }`}
            style={{
              borderBottom:
                activePage ===
                `/courses/${props.title.replace(/ /g, "%20")}/course-info`
                  ? "3px solid orange"
                  : "none",
              color:
                activePage ===
                `/courses/${props.title.replace(/ /g, "%20")}/course-info`
                  ? "#ffb534"
                  : "#127c56",
            }}
          >
            <strong>Course Information</strong>
          </Link>
        </Nav.Item>

        {/* Post tab */}
        <Nav.Item className="course-tabs-button">
          <Link
            to={`/courses/${props.title}/post`}
            className={`nav-link course-tabs-label ${
              activePage === `/courses/${props.title.replace(/ /g, "%20")}/post`
                ? "active"
                : ""
            }`}
            style={{
              borderBottom:
                activePage ===
                `/courses/${props.title.replace(/ /g, "%20")}/post`
                  ? "3px solid orange"
                  : "none",
              color:
                activePage ===
                `/courses/${props.title.replace(/ /g, "%20")}/post`
                  ? "#ffb534"
                  : "#127c56",
            }}
          >
            <strong>Posts</strong>
          </Link>
        </Nav.Item>

        {/* Classwork tab */}
        <Nav.Item className="course-tabs-button">
          <Link
            to={`/courses/${props.title}/classwork`}
            className={`nav-link course-tabs-label ${
              activePage ===
              `/courses/${props.title.replace(/ /g, "%20")}/classwork`
                ? "active"
                : ""
            }`}
            style={{
              borderBottom:
                activePage ===
                `/courses/${props.title.replace(/ /g, "%20")}/classwork`
                  ? "3px solid orange"
                  : "none",
              color:
                activePage ===
                `/courses/${props.title.replace(/ /g, "%20")}/classwork`
                  ? "#ffb534"
                  : "#127c56",
            }}
          >
            <strong>Classwork</strong>
          </Link>
        </Nav.Item>

        {/* Members tab */}
        <Nav.Item className="course-tabs-button">
          <Link
            // className="course-tabs-label"
            to={`/courses/${props.title}/member-list`}
            className={`nav-link course-tabs-label ${
              activePage ===
              `/courses/${props.title.replace(/ /g, "%20")}/member-list`
                ? "active"
                : ""
            }`}
            style={{
              borderBottom:
                activePage ===
                `/courses/${props.title.replace(/ /g, "%20")}/member-list`
                  ? "3px solid orange"
                  : "none",
              color:
                activePage ===
                `/courses/${props.title.replace(/ /g, "%20")}/member-list`
                  ? "#ffb534"
                  : "#127c56",
            }}
          >
            <strong>Members</strong>
          </Link>
        </Nav.Item>
      </Nav>
    </div>
  );
}

export default TabComponent;
