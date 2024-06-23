import React from "react";
import styles from "./CardParticipante.module.css";
import { useNavigate } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";

const CardParticipante = ({ participantId, id, nome, faculdade, fotoUrl, isEditing, projectId, isAdmin, onKickParticipant }) => {
  const navigate = useNavigate();

  const navigateToProfile = (userid) => {
    navigate(`/userprofile/${userid}`);
  };

  const kickParticipant = () => {
    onKickParticipant(participantId, nome, false);
    
  }

  return (
    <div className={styles.card} >
      <div className={styles.contentInfo} onClick={() => navigateToProfile(id)}>
        <img className={styles.fotoParticipante} src={fotoUrl} alt="pessoa-foto" />
        <div className={styles.userInfo}>
          <p className={styles.nome}>{nome}</p>
          <p className={styles.faculdade}>{faculdade}</p>
        </div>
      </div>
      {isEditing && isAdmin &&
        <button className={styles.btnKickParticipant} onClick={() => kickParticipant()}>
          <BiLogOut className={styles.icon} />
        </button>
      }


    </div>
  );
};

export default CardParticipante;
