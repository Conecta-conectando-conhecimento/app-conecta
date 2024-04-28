import style from "./Register.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import InputMask from "../../../Masked";
import { ToastContainer, toast } from "react-toastify";

function Register() {
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [email, setEmail] = useState("");
  const [dataNascimento, setDataNasc] = useState("");
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmSenha, setConfirmSenha] = useState("");
  const [nomeUsuario, setNomeUsuario] = useState("");


  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (senha === confirmSenha) {
      alert("Senhas conferem");
      handleAddUser();
    } else {
      alert("Senhas não conferem");
    }
  };

  // inserir usuários no banco
  const handleAddUser = async (e) => {
    const dados = {
      email: email,
      nome_completo: nomeCompleto,
      cpf: cpf,
      senha: senha,
      nome_usuario: nomeUsuario,
      data_de_nascimento: dataNascimento,
    };

  
    try {
      const response = await axios.post(
        "http://localhost:8000/auth/register",
        {
          email: dados.email,
          name: dados.nome_completo, 
          cpf: dados.cpf,
          password: dados.senha, 
          user_name: dados.nome_usuario,
          birthday: dados.data_de_nascimento, 
        },
        {
          headers: {
            Authorization: 'Bearer rx2MCEpi0tHffGn',
            'Content-Type': 'application/json',
          },
        }
      );
      
  
      if (!response.data.status) {
        console.error("Ocorreu um erro ao tentar realizar registro: ", response.data.error);
      } else {
        alert("Usuário cadastrado com sucesso!");
        navigate('/login');
      }
    } catch (error) {
      console.error('Erro ao realizar cadastro:', error);
    }
  };
  

    return (
      <div className="telaregister">
        <ToastContainer
          position="top-left"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <section className={style.secao_logo}>
          <div className={style.div_css}>
            <Link className={style.link_button} to="/login">
              <button>Entrar</button>
            </Link>
          </div>
          <div className={style.logo_conecta}>
            <img src="/assets/conectaLogo.png" alt="Imagem Conecta!" />
          </div>
        </section>
        <section className={style.secao_apresentacao} >
          <div className={style.div_apresentacao}>
            <img
              className={style.imagem_apresentacao}
              src="/assets/azul.jpg"
              alt="Pessoas com roupa azul!"
            />
            <h1 className={style.texto_apresentacao}>
              Conectando graduandos para potencializar a eficiência de projetos em
              desenvolvimento.
            </h1>
          </div>
          <div className={style.div_apresentacao}>
            <h1 className={style.texto_apresentacao}>
              Convide pessoas que entendem do assunto para te ajudar no seu
              projeto.
            </h1>
            <img
              className={style.imagem_apresentacao}
              src="/assets/maos.jpg"
              alt="Maos juntas"
            />
          </div>
          <div className={style.div_apresentacao}>
            <img
              className={style.imagem_apresentacao}
              src="/assets/pessoas.jpg"
              alt="Pessoas trabalhando"
            />
            <h1 className={style.texto_apresentacao}>
              Amplie sua rede de contatos interagindo com graduandos tanto da sua área de estudo quanto de outras disciplinas.
            </h1>
          </div>
        </section>
        <section className={style.secao_formulario_cadastro} id="secao_forms">
          <p className={style.titleRegister}>
            Quer se conectar aos outros estudantes? Faça o seu cadastro!
          </p>
          <div className={style.formularioDeCadastro}>
            <form onSubmit={handleSubmit}>
              <div className={style.form_input_group}>
                <div className={style.input_box}>
                  <label htmlFor="name">Nome Completo</label>
                  <input
                    type="text"
                    id="nameId"
                    name="nome_completo"
                    placeholder="Digite o seu nome completo"
                    onChange={(e) => setNomeCompleto(e.target.value)}
                    required
                  />
                </div>
                <div className={style.input_box}>
                  <label htmlFor="email">E-mail</label>
                  <input
                    type="email"
                    id="emailId"
                    name="email"
                    placeholder="Digite o seu e-mail institucional"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className={style.input_box}>
                  <label htmlFor="birthday">Data de nascimento</label>
                  <input
                    type="date"
                    id="birthdayId"
                    name="data_de_nascimento"
                    placeholder="dd/mm/aaaa"
                    onChange={(e) => setDataNasc(e.target.value)}
                    required
                  />
                </div>
                <div className={style.input_box}>
                  <label htmlFor="cpf">CPF</label>
                  <InputMask
                    type="text"
                    id="cpfId"
                    name="cpf"
                    maxLength="11"
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                    required
                  />
                </div>
                <div className={style.input_box}>
                  <label htmlFor="password">Senha</label>
                  <input
                    type="password"
                    id="passwordId"
                    name="senha"
                    placeholder="Confirme sua senha"
                    onChange={(e) => setSenha(e.target.value)}
                    required
                  />
                </div>
                <div className={style.input_box}>
                  <label htmlFor="passwordConfirm">Confirme sua senha</label>
                  <input
                    type="password"
                    id="passwordConfirmId"
                    name="passwordConfirm"
                    placeholder="Confirme sua senha"
                    onChange={(e) => setConfirmSenha(e.target.value)}
                    required
                  />
                </div>
                <div className={style.input_box}>
                  <label htmlFor="userName">Nome do usuário</label>
                  <input
                    type="text"
                    id="userNameId"
                    name="nome_usuario"
                    placeholder="Digite o seu nome de usuário"
                    onChange={(e) => setNomeUsuario(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className={style.contButton}>
                <input
                  className={style.btnCadastrar}
                  type="submit"
                  name="Cadastrar"
                  value="Cadastrar"
                />
                <p className={style.pHaveAcconut}>
                  Já tem uma conta? <Link to="/login">Clique aqui</Link>
                </p>
              </div>
            </form>
          </div>
        </section>
      </div>
    );
  }

  export default Register;
