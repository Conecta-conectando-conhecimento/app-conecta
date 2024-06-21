import React from "react";
import styles from "./CardArquivo.module.css";
import { IoDocumentTextOutline } from 'react-icons/io5';
import { BiSolidTrashAlt, BiPencil } from "react-icons/bi";
import { useState } from "react";
import ModalArquivo from "./ModalArquivo";
const CardArquivo = ({ id, nome, url, isAdmin, isEditing, action, handleDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleVerClick = () => {
    if (url) {
      console.log(url)
        window.open(url, '_blank');
    } else {
        console.error('URL do arquivo não está disponível.');
    }
};


  const handleEditarClick = () => {
    action();
  };

  const handleDeleteClick = () => {
    //handleDelete(key);

    var resposta = confirm("Tem certeza que deseja excluir '" + nome + "'?" + id);
            if (resposta) {
                handleDelete(id);
            }
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
            <button className={styles.btnExcluir} onClick={handleDeleteClick}>
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