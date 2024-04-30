import { Link } from "react-router-dom";
import "../../App.css";

const PasswordChanged = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      {/* Background image */}
      <div className="p-5 text-center bg-image"></div>

      {/* Password changed notification */}
      <div className="bg-white p-3 rounded w-50">
        <h2 className="form-title">
          <center>Password changed</center>
        </h2>
        <br />
        <p className="form-title">
          Your password has been successfully changed.
        </p>

        {/* Submit button */}
        <Link to="/login" className="btn btn-default border w-100">
          Login
        </Link>
      </div>
    </div>
  );
};

export default PasswordChanged;
