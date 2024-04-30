import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../App.css";

function ForgotPassword() {
  const [email, setEmail] = useState();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    // Send a POST request to the server for login
    axios
      .post(
        "http://localhost:5000/forgot-password",
        { email },
        { withCredentials: true } // Include credentials in the request
      )
      .then((res) => {
        console.log(res.data);
        if (res.data.Status === "Success") {
          navigate("/email-sent");
        }
      })
      .catch((err) => console.log(err));
  };

  // Render the forgot password form
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      {/* Background image */}
      <div className="p-5 text-center bg-image"></div>

      {/* Forgot password form */}
      <div className="bg-white p-3 rounded w-50">
        <h2 className="form-title">
          <center>Forgot password</center>
        </h2>
        <br />
        <p className="form-title">
          Please enter the email address that you used to register, and we will
          send you a link to reset your password via Email.
        </p>
        <form onSubmit={handleSubmit}>
          {/* Email input */}
          <div className="mb-3">
            <label className="form-title">
              <strong>Email</strong>
            </label>
            <input
              className="form-control"
              type="email"
              placeholder="Enter Email"
              autoComplete="on"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="btn btn-success w-100"
            disabled={!email}
          >
            Request a reset link
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
