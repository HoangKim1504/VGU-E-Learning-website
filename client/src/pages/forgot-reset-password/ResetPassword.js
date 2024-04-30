import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../../App.css";

function ResetPassword() {
  const [newPassword, setNewPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const navigate = useNavigate();
  const { randomString } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    // Send a POST request to the server for login
    axios
      .post(
        `http://localhost:5000/reset-password/${randomString}`,
        { newPassword, confirmPassword },
        { withCredentials: true } // Include credentials in the request
      )
      .then((res) => {
        if (res.data.Status === "Success") {
          navigate("/password-changed");
        }
      })
      .catch((err) => console.log(err));
  };

  // Render the reset password form
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      {/* Background image */}
      <div className="p-5 text-center bg-image"></div>

      {/* Reset password form */}
      <div className="p-3 rounded w-50">
        <h2 className="form-title">
          <center>Reset password</center>
        </h2>
        <br />
        <p className="form-title">
          Set a new password for your account. Please enter your new password.
        </p>
        <form onSubmit={handleSubmit}>
          {/* New Password input */}
          <div className="mb-3">
            <label className="form-title">
              <strong>New Password</strong>
            </label>
            <input
              className="form-control"
              type="password"
              placeholder="Enter New Password"
              name="password"
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          {/* Confirm Password input */}
          <div className="mb-3">
            <label className="form-title">
              <strong>Confirm Password</strong>
            </label>
            <input
              className="form-control"
              type="password"
              placeholder="Enter Confirm Password"
              name="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {/* {newPassword !== confirmPassword && (
              <p className="text-danger">Confirm Password is not correct</p>
            )} */}
          </div>

          <br />
          {/* Submit button */}
          <button
            type="submit"
            className="btn btn-success w-100"
            disabled={
              !newPassword ||
              !confirmPassword ||
              newPassword !== confirmPassword
            }
          >
            Reset password
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
