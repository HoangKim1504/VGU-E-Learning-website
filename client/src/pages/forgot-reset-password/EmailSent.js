import "../../App.css";

const EmailSent = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      {/* Background image */}
      <div className="p-5 text-center bg-image"></div>

      {/* Email sent notification */}
      <div className="p-3 rounded w-50">
        <h2 className="form-title">
          <center>Email sent</center>
        </h2>
        <br />
        <p className="form-title">
          We have sent you an email with a link to reset your password. Please
          check your inbox or spam mail.
        </p>
      </div>
    </div>
  );
};

export default EmailSent;
