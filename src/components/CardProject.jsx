import React from 'react';
import style from "./pages/FeedProjetos/FeedProjetos.module.css";
import { Link } from 'react-router-dom';

const Card = ({ projetoNome, texto, projetoId }) => {
  return (
    <div className={style.card}>
      <div className={style.informacoesTexto}>
        <p className={style.projetoNome}>{projetoNome}</p>
        <p className={style.texto}>{texto}</p>
      </div>
      <div className={style.colunaImagemPerfilBotaoVerMais}>
        <Link to={`/visualizacaoprojeto/${projetoId}`} className={style.linkNaoSublinhado}>
          <button id="verMais" className={style.botaoVerMais}>Ver mais +</button>
        </Link>
      </div>
    </div>
  );
}

export default Card;
