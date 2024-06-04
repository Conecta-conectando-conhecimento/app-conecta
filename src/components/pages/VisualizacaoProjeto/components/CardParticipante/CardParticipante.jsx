import React from "react";
import styles from "./CardParticipante.module.css";

const CardParticipante = ({ nome, faculdade, fotoUrl }) => {
  return (
    <div className={styles.card}>
      <img className={styles.fotoParticipante} src={fotoUrl} alt="pessoa-foto" />
      <div className={styles.userInfo}>
        <p className={styles.nome}>{nome}</p>
      </div>
    </div>
  );
};

export default CardParticipante;