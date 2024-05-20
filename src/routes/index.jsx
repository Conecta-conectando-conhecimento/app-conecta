import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "../components/pages/Register/Register";
import UserProfile from "../components/pages/UserProfile/UserProfile";
import FeedUsuario from "../components/pages/FeedUsuario/FeedUsuario";
import Login from "../components/pages/Login/Login";
import ForgotPassword from "../components/pages/Login/ForgotPassword";
import RegisterProject from "../components/pages/RegisterProject/RegisterProject";
import useAuth from "../hooks/useAuth";
import EditProfile from "../components/pages/EditProfile/EditProfile";
import FeedProjetos from "../components/pages/FeedProjetos/FeedProjetos";
import VisualizacaoProjeto from "../components/pages/VisualizacaoProjeto/VisualizacaoProjeto";

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
        <Route path="/userprofile" element={<UserProfile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/registerproject" element={<RegisterProject />}/>
        <Route path="/feedProjetos" element={<FeedProjetos/>}/>
        <Route path="/editprofile" element={<EditProfile />} />
        <Route path="/visualizacaoprojeto/:projectId" element={<VisualizacaoProjeto />} />
      </Routes>
    </Router>
  );
};

export default RoutesApp;
