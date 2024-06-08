import { React, useState, useEffect } from "react";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import NavbarComponent from "../../components/NavbarComponent";
import FooterComponent from "../../components/FooterComponent";
import "../../App.css";

function ProfileEdit({ token }) {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const [fullName, setFullName] = useState();
  const [major, setMajor] = useState();
  const [intake, setIntake] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [bio, setBio] = useState();
  const [file, setFile] = useState();
  const [data, setData] = useState();

  // get Profile info for default values in form
  useEffect(() => {
    axios
      .get(`http://localhost:5000/getProfile`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true, // Include credentials in the request
      })
      .then((res) => {
        setUser(res.data);
        console.log("Profile info:", res.data);
        // setData(res.data[0]);
      })
      .catch((err) => console.log(err));
  }, [token]);

  // handle submit on Save Changes button
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submit

    // Send a POST request to the server with the form data
    axios
      .post(
        "http://localhost:5000/editProfile",
        { fullName, major, intake, phoneNumber, bio },
        { withCredentials: true } // Include credentials in the request;
      )
      .then((res) => {
        if (res.data.Status === "Success") {
          alert("Profile updated successfully!");
          navigate("/profile");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // handle file
  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

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

  const handleUpload = (e) => {
    // Create a FormData object
    const formData = new FormData();
    // Append the file to the FormData object
    formData.append("avatar", file);
    // Send a POST request to the server with the FormData object
    axios
      .post("http://localhost:5000/editProfile/uploadAvatar", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        if (res.data.Status === "Success") {
          console.log("Succeded");
          alert("Avatar uploaded successfully!");
          axios
            .get("http://localhost:5000/allProfile")
            .then((res) => {
              console.log(res);
              setData(res.data[0]);
            })
            .catch((err) => console.log(err));
        } else {
          console.log("Failed");
          alert("Avatar uploaded failed!");
        }
      })
      .catch((err) => console.log(err));
  };

  // Return the JSX that will be rendered to the user
  return (
    <>
      {/* Navbar */}
      <NavbarComponent />

      {/* Profile */}
      <section>
        {/* Background image */}
        <div className="p-5 text-center bg-image">
          {/* Form */}
          <div className="container py-3">
            <div className="row">
              <div className="col-md-4">
                <div className="card mb-4">
                  {/* Short profile */}
                  <div className="card-body text-center">
                    <img
                      src={
                        data && `http://localhost:5000/avatar/` + data.avatar
                      }
                      alt="avatar"
                      className="rounded-circle img-fluid"
                      style={{ width: "150px" }}
                    />

                    <br />
                    <br />
                    <p>Only image files (jpg, jpeg, png) are allowed!</p>
                    <Form.Control
                      type="file"
                      size="sm"
                      onChange={handleFile}
                      accept="avatar/"
                      multiple={false}
                    />
                    <br />
                    <Button
                      variant="light"
                      className="button-profile-edit"
                      onClick={handleUpload}
                    >
                      Upload new image
                    </Button>
                  </div>
                </div>
              </div>
              {/* Detail profile */}
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
                        <Form.Control
                          className="input-profile"
                          size="text"
                          type="text"
                          placeholder={user.full_name}
                          onChange={(e) => setFullName(e.target.value)}
                        />
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
                        <Form.Control
                          plaintext
                          readOnly
                          defaultValue={user.email}
                        />
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
                        <Form.Control
                          plaintext
                          readOnly
                          defaultValue={user.student_id}
                        />
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
                        <Form.Control
                          className="input-profile"
                          size="text"
                          type="text"
                          placeholder={user.major}
                          onChange={(e) => setMajor(e.target.value)}
                        />
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
                        <Form.Control
                          className="input-profile"
                          type="number"
                          placeholder={user.intake}
                          onChange={(e) => setIntake(e.target.value)}
                        />
                      </div>
                    </div>
                    <hr className="hr" />
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">
                          <strong>Phone Number</strong>
                        </p>
                      </div>
                      <div className="col-sm-9">
                        <Form.Control
                          className="input-profile"
                          type="number"
                          placeholder={user.phone_number}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                        />
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
                        <Form.Control
                          className="input-profile"
                          as="textarea"
                          rows={3}
                          placeholder={user.bio}
                          onChange={(e) => setBio(e.target.value)}
                        />
                        <br />
                      </div>
                    </div>
                    <div className="row">
                      <Link to="/profile">
                        <Button
                          variant="light"
                          className="button-profile-edit"
                          type="submit"
                          onClick={handleSubmit}
                        >
                          Save changes
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <FooterComponent />
    </>
  );
}

export default ProfileEdit;
