import React from "react";
// import Card from "react-bootstrap/Card";
import "../../App.css";
import NavbarComponent from "../../components/NavbarComponent";
import FooterComponent from "../../components/FooterComponent";
import TabComponent from "../../components/TabComponent";
import CardHorizontalComponent from "../../components/CardHorizontalComponent";
import BreadcrumbComponent from "../../components/BreadcrumbComponent";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Post = ({ token }) => {
  const [post, setPost] = useState([]);
  const { title } = useParams();

  // Fetch courses data from the server
  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/courses/${title}/post`,
        { withCredentials: true } // Include credentials in the request
      )
      .then((res) => {
        console.log(res.data);
        setPost(res.data);
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
      {/* Post */}
      {Array.isArray(post) && post.length === 0 ? (
        <>
          <div className="course-info-header">
            <h1 className="course-info-title">Class Posts</h1>
          </div>

          <p className="post-empty">There is no Post here.</p>
        </>
      ) : (
        <>
          <div className="course-info-header">
            <h1 className="course-info-title">Class Posts</h1>
          </div>
          {Array.isArray(post) &&
            post.map((postItem) => (
              <CardHorizontalComponent
                key={postItem.id}
                owner={postItem.owner}
                title={postItem.title}
                content={postItem.content}
                date={postItem.date}
                time={postItem.time}
              />
            ))}
        </>
      )}
      <br />
      {/* Footer */}
      <FooterComponent />
    </div>
  );
};

export default Post;
