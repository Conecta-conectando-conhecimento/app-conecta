import style from "./Login.module.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";
import UserController from "../../../controllers/userController";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const { signin } = useAuth(); // Obtenha a função de login do contexto de autenticação


  const handleLogin = async () => {
    if (!email || !senha) {
      setError('Preencha todos os campos');
      return;
    }
  
    try {
      const { data } = await UserController.loginUser({ email, password: senha, signin });
    
      if (data.accessToken) {
        const { name, id } = data.user;
        signin(email, data.accessToken, name, id);
        navigate('/feedprojetos');
        alert('Bem vindo!');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError('Credenciais inválidas');
      } else {
        console.error('Erro ao fazer login:', error.message);
      }
    }
  };

  return (
    <div className={style.bodyLogin}>
      <div className={style.DivImgTelaLogin}>
        <img
          className={style.imgTelaLogin}
          src="/assets/maos.jpg"
          alt="uniao"
        />
        <div className={style.FormProject}>
          <h1 className={style.Titulo}>
            Oi de novo! <br />
            Que bom que voltou!
          </h1>
          <div className={style.ImputGroup}>
            <div className={style.ImputBox}>
              <label htmlFor="email">Login</label>
              <input
                type="text"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => [setEmail(e.target.value), setError("")]}
                required
              />
            </div>

            <div className={style.ImputBox}>
              <label htmlFor="senha">Senha</label>
              <input
                type="password"
                name="senha"
                placeholder="Senha"
                value={senha}
                onChange={(e) => [setSenha(e.target.value), setError("")]}
                required
              />
              <div className={style.senha}>
                <a href="/resetpassword">Esqueceu a senha?</a>
              </div>
            </div>
            {error && <p className={style.errorMessage}>{error}</p>}
          </div>

          <div className={style.buttons}>
            <button className={style.btnCadastrar1} onClick={handleLogin}>
              Entrar
            </button>
            <Link to="/">
              <button className={style.btnCadastrar2} type="button">
                Cadastrar-se
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
