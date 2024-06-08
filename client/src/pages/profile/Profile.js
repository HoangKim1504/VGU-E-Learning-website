import { React, useEffect, useState } from "react";
import axios from "axios";
import "../../App.css";
import NavbarComponent from "../../components/NavbarComponent";
import FooterComponent from "../../components/FooterComponent";
import ProfileComponent from "../../components/ProfileComponent";

function Profile({ token }) {
  const [user, setUser] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/getProfile`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true, // Include credentials in the request
      })
      .then((res) => {
        console.log(res.data);
        setUser(res.data);
      })
      .catch((err) => console.log(err));
  }, [token]);

  return (
    <>
      {/* Navbar */}
      <NavbarComponent />

      {/* Profile */}
      <section>
        {/* Background image */}
        <div className="p-5 text-center bg-image">
          {/* Profile form  */}
          {user && (
            <ProfileComponent
              key={user.id}
              fullName={user.full_name}
              email={user.email}
              studentId={user.student_id}
              major={user.major}
              intake={user.intake}
              phoneNumber={user.phone_number}
              bio={user.bio}
            />
          )}
        </div>
      </section>
      {/* Footer */}
      <FooterComponent />
    </>
  );
}

export default Profile;
