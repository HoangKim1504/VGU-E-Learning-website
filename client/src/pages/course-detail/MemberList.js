import React from "react";
import "../../App.css";
import NavbarComponent from "../../components/NavbarComponent";
import FooterComponent from "../../components/FooterComponent";
import TabComponent from "../../components/TabComponent";
import BreadcrumbComponent from "../../components/BreadcrumbComponent";
import ListGroupComponent from "../../components/ListGroupComponent";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const MemberList = ({ token }) => {
  const [memberList, setMemberList] = useState([]);
  const { title } = useParams();

  // Get the member list of the course
  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/courses/${title}/member-list`,
        { withCredentials: true } // Include credentials in the request
      )
      .then((res) => {
        console.log(res.data);
        setMemberList(res.data);
      })
      .catch((err) => console.log(err));
  }, [title]);

  return (
    <div>
      {/* Navbar */}
      <NavbarComponent />
      <BreadcrumbComponent title={title} />
      {/* Tab bar */}
      <TabComponent title={title} />
      {/* Post title */}
      <div className="course-info-header">
        <h1 className="course-info-title">Member list</h1>
      </div>
      {/* Post */}
      {memberList.map((member) => (
        <ListGroupComponent
          key={member.id}
          email={member.email}
          className="member-list"
        />
      ))}
      <br />
      {/* Footer */}
      <FooterComponent />
    </div>
  );
};

export default MemberList;
