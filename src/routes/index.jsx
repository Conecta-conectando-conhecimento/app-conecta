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
import FormacaoEquipe from "../components/pages/FormacaoEquipe/FormacaoEquipe";
import FormacaoEquipe2 from "../components/pages/FormacaoEquipe2/FormacaoEquipe2";


const Private = ({ item: Item }) => {
  const { signed } = useAuth();
  return signed ? <Item /> : <Login />;
};

const RoutesApp = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/feedUsuario" element={<FeedUsuario />} />
        <Route path="/userprofile/:userId" element={<Private item={UserProfile} />} />
        <Route path="/editprofile" element={<Private item={EditProfile} />} />
        <Route path="/feedProjetos" element={<FeedProjetos/>}/>
        <Route path="/registerproject" element={<Private item={RegisterProject} />}/>
        <Route path="/visualizacaoprojeto/:projectId" element={<VisualizacaoProjeto />} />
        <Route path="/formacaoequipe/:projectId" element={<FormacaoEquipe />}/>
        <Route path="/formacaoequipe2/:projectId" element={<FormacaoEquipe2 />}/>
      </Routes>
    </Router>
  );
};

export default RoutesApp;
