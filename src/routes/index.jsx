import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "../components/pages/Register/Register";
import Profile from "../components/pages/Profile/Profile";
import FeedUsuario from "../components/pages/FeedUsuario/FeedUsuario";
import Login from "../components/pages/Login/Login";
import ForgotPassword from "../components/pages/Login/ForgotPassword";
import RegisterProject from "../components/pages/RegisterProject/RegisterProject";
import useAuth from "../hooks/useAuth";
import EditProfile from "../components/pages/EditProfile/EditProfile";
import FeedProjetos from "../components/pages/FeedProjetos/FeedProjetos";
import VisualizacaoProjeto from "../components/pages/VisualizacaoProjeto/VisualizacaoProjeto";
import EditProject from "../components/pages/EditProject/EditProject";

const Private = ({ item: Item }) => {
  const { signed } = useAuth();
  return signed ? <Item /> : <Login />;
};

const RoutesApp = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/feedUsuario" element={<FeedUsuario />} />
        <Route path="/profile" element={<Private item={Profile} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/registerproject" element={<Private item={RegisterProject} />}/>
        <Route path="/feedProjetos" element={<FeedProjetos/>}/>
        <Route path="/editprofile" element={<EditProfile />} />
        <Route path="/visualizacaoprojeto/:projectId" element={<VisualizacaoProjeto />} />
        <Route path="/editproject/:projectId" element={<EditProject />} />
      </Routes>
    </Router>
  );
};

export default RoutesApp;
