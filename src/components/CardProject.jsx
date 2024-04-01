import React from 'react';
import style from "./pages/FeedProjetos/FeedProjetos.module.css";

const Card = ({ projetoNome, texto }) => {
  return (
    <div className={style.card}>
      <div className={style.informacoesTexto}>
        <p className={style.projetoNome}>{projetoNome}</p>
        <p className={style.texto}>{texto}</p>
      </div>
      <div className={style.colunaImagemPerfilBotaoVerMais}>
        <button id="verMais" className={style.botaoVerMais}>Ver mais +</button>
      </div>
    </div>
  );
};

export default Card;
