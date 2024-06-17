import React from "react";
import styles from "./CardArquivo.module.css";
import { IoDocumentTextOutline } from 'react-icons/io5';
import { BiSolidTrashAlt, BiPencil } from "react-icons/bi";
import { useState } from "react";
import ModalArquivo from "./ModalArquivo";
const CardArquivo = ({ nome, url, isAdmin, isEditing, action }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleVerClick = () => {
    window.open(url, "_blank", "noopener noreferrer");
  };

  const handleEditarClick = () => {
    action();
  };

  return (
    <div className={styles.card}>
      <div className={styles.icon}>
        <IoDocumentTextOutline />
      </div>
      <div className={styles.content}>
        <p className={styles.nome}>{nome}</p>
        {isAdmin && isEditing && (
          <>
            <button className={styles.btnEditar} onClick={handleEditarClick}>
              <BiPencil />
            </button>
            <button className={styles.btnExcluir}>
              <BiSolidTrashAlt />
            </button>
          </>
        )}
        <button className={styles.btnVer} onClick={handleVerClick}>
          Ver
        </button>
      </div>
    </div>
  );
};

export default CardArquivo;