import React from "react";
import styles from "./CardArquivo.module.css";
import { IoDocumentTextOutline } from 'react-icons/io5'; // Ícone de arquivo

const CardArquivo = ({ nome, url }) => {
  const handleVerClick = (event) => {
    // Verificar se o clique foi feito com o botão do scroll (button === 1)
    if (event.button === 0 || event.button === 1) {
      window.open(url, "_blank", "noopener noreferrer"); 
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.icon}>
        <IoDocumentTextOutline />
      </div>
      <div className={styles.content}>
        <p className={styles.nome}>{nome}</p>
        <button className={styles.btnVer} onMouseDown={handleVerClick}>
          Ver
        </button>
      </div>
    </div>
  );
};

export default CardArquivo;