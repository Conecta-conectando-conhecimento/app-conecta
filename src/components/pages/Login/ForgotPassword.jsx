import React, { useState } from "react";
import style from "./Password.module.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const Email = {
      email: email,
    };
    try {
      await sendEmail(Email);
      console.log("Email enviado com sucesso!");
      // Adicione código para redirecionar ou exibir uma mensagem de sucesso.
    } catch (error) {
      console.error("Falha ao enviar email:", error);
      // Adicione código para exibir uma mensagem de erro ao usuário.
    }
  };

  return (
    <div className={style.InputGroup}>
      <div className={style.Inputbox}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <button className={style.button} onClick={handleSubmit}>
          Enviar
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;
