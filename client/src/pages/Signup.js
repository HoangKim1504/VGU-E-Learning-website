import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Signup() {
  // State variables to hold name, email, password state
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  // Navigate to the other page
  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    // Send a POST request to the server for login
    axios
      .post("http://localhost:5000/signup", { name, email, password })
      .then((result) => {
        console.log(result);
        if (result.data === "Registered successfully") {
          navigate("/login");
          alert("User registered successfully");
        } else if (result.data === "Registration failed") {
          navigate("/signup");
          alert("User registered unsuccessfully");
        }
      })
      .catch((err) => console.log(err));
  };

  // Render the login form
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      {/* Background image */}
      <div className="p-5 text-center bg-image"></div>

      {/* Sign up form */}
      <div className="p-3 rounded w-50">
        <h2 className="form-title">
          <center>Sign Up</center>
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Name input */}
          <div className="mb-3">
            <label className="input-title">
              <strong>Name</strong>
            </label>
            <input
              className="form-control"
              type="text"
              placeholder="Enter Name"
              autoComplete="off"
              name="email"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          {/* Email input */}
          <div className="mb-3">
            <label className="input-title">
              <strong>Email</strong>
            </label>
            <input
              className="form-control"
              type="text"
              placeholder="Enter Email"
              autoComplete="off"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {/* Password input */}
          <div className="mb-3">
            <label className="input-title">
              <strong>Password</strong>
            </label>
            <input
              className="form-control"
              type="password"
              placeholder="Enter Password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <br />
          {/* Submit button */}
          <button
            type="submit"
            className="btn btn-success w-100"
            disabled={!name || !email || !password}
          >
            Sign Up
          </button>
        </form>

        <br />
        {/* Login link */}
        <center className="form-title">
          <strong>Already have an account? </strong>
          <Link to="/login" className="form-link">
            Login
          </Link>
        </center>
      </div>
    </div>
  );
}

export default Signup;
