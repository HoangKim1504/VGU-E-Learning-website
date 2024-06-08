import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function ProfileComponent({
  fullName,
  email,
  studentId,
  major,
  intake,
  phoneNumber,
  bio,
}) {
  const [data, setData] = useState();

  // Get all profile data
  useEffect(() => {
    axios
      .get("http://localhost:5000/allProfile")
      .then((res) => {
        console.log(res);
        setData(res.data[0]);
      })

      .catch((err) => console.log(err));
  }, []);

  // Display profile data
  return (
    <div className="container py-3">
      <div className="row">
        <div className="col-md-4">
          <div className="card mb-4">
            <div className="card-body text-center">
              <img
                src={data && `http://localhost:5000/avatar/` + data.avatar}
                alt="avatar"
                className="rounded-circle img-fluid"
                style={{ width: "150px" }}
              />
              <h5 className="my-3">{fullName}</h5>
              <p className="text-muted mb-1">
                {major}
                {intake}
              </p>
              <p className="text-muted mb-1">{studentId}</p>
            </div>
          </div>
          <Link to="/profile/edit">
            <Button variant="light" className="button-profile">
              Edit your profile
            </Button>
          </Link>
        </div>
        <div className="col-lg-8">
          <div className="card mb-4">
            <div className="card-body-profile">
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">
                    <strong>Full Name</strong>
                  </p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted mb-0">{fullName}</p>
                </div>
              </div>
              <hr className="hr" />
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">
                    <strong>Email</strong>
                  </p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted mb-0"></p>
                  {email}
                </div>
              </div>
              <hr className="hr" />
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">
                    <strong>Student ID</strong>
                  </p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted mb-0"></p>
                  {studentId}
                </div>
              </div>
              <hr className="hr" />
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">
                    <strong>Major</strong>
                  </p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted mb-0">{major}</p>
                </div>
              </div>
              <hr className="hr" />
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">
                    <strong>Intake</strong>
                  </p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted mb-0">{intake}</p>
                </div>
              </div>
              <hr className="hr" />
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">
                    <strong>Phone number</strong>
                  </p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted mb-0">{phoneNumber}</p>
                </div>
              </div>
              <hr className="hr" />
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">
                    <strong>Bio</strong>
                  </p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted mb-0">{bio}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileComponent;
