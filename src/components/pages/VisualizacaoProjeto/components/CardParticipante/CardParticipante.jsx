import React from "react";
import styles from "./CardParticipante.module.css";
import { useNavigate } from "react-router-dom";

const CardParticipante = ({ id, nome, faculdade, fotoUrl }) => {
  const navigate = useNavigate();

  const navigateToProfile = (userid) => {
    navigate(`/userprofile/${userid}`);
  };

  return (
    <div className={styles.card} onClick={() => navigateToProfile(id)}>
      <img className={styles.fotoParticipante} src={fotoUrl} alt="pessoa-foto" />
      <div className={styles.userInfo}>
        <p className={styles.nome}>{nome}</p>
        <p className={styles.faculdade}>{faculdade}</p>
      </div>
    </div>
  );
};

export default CardParticipante;
