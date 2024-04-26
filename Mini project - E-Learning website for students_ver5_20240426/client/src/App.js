import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";
import ForgotPassword from "./pages/forgot-reset-password/ForgotPassword";
import EmailSent from "./pages/forgot-reset-password/EmailSent";
import ResetPassword from "./pages/forgot-reset-password/ResetPassword";
import PasswordChanged from "./pages/forgot-reset-password/PasswordChanged";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login page */}
        <Route
          path="/"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        {/* Public route */}
        {/* Sign up page */}
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />
        {/* Login page */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        {/* Forgot password page */}
        <Route
          path="/forgot-password"
          element={
            <PublicRoute>
              <ForgotPassword />
            </PublicRoute>
          }
        />
        {/* Email sent page */}
        <Route
          path="/email-sent"
          element={
            <PublicRoute>
              <EmailSent />
            </PublicRoute>
          }
        />
        {/* Reset password page */}
        <Route
          path="/reset-password/:randomString"
          element={
            <PublicRoute>
              <ResetPassword />
            </PublicRoute>
          }
        />
        {/* Password changed page */}
        <Route
          path="/password-changed"
          element={
            <PublicRoute>
              <PasswordChanged />
            </PublicRoute>
          }
        />

        {/* Private route */}
        {/* Home page */}
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        {/* Profile page */}
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        {/* <Route path="/test" element={<Test />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
