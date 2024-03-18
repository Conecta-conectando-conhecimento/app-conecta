import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "../components/pages/Register/Register";
import Profile from "../components/pages/Profile/Profile";
import Feed from "../components/pages/Feed/Feed";
import Login from "../components/pages/Login/Login";
import ForgotPassword from "../components/pages/Login/ForgotPassword";
import RegisterProject from "../components/pages/RegisterProject/RegisterProject";
import useAuth from "../hooks/useAuth";
import EditProfile from "../components/pages/EditProfile/EditProfile";

const Private = ({ item: Item }) => {
  const { signed } = useAuth();
  return signed ? <Item /> : <Login />;
};

const RoutesApp = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/profile" element={<Private item={Profile} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route
          path="/registerproject"
          element={<Private item={RegisterProject} />}
        />
        <Route path="/editprofile" element={<EditProfile />} />
      </Routes>
    </Router>
  );
};

export default RoutesApp;
