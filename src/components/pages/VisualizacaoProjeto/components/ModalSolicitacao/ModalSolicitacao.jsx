import style from "./ModalSolicitacao.module.css";
import { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

function ModalSolicitacao() {
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className={style.Container}>
      <button className={style.Button} onClick={openModal}>Convidar colaboradores</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        overlayClassName={style["modal-overlay"]}
        className={style["modal-content"]}
      >
        <h2 className={style["modal-title"]}>Convide o seu colaborador!</h2>
        <hr />
        <p className={style["modal-text"]}>
          We maintain that accessibility is a key component of any modern web
          application. As such, we have created this modal in such a way that it
          fulfills the accessibility requirements of the modern web. We seek to
          keep the focus on accessibility while providing a functional, capable
          modal component for general use.
        </p>
        <button className={style["modal-button"]} onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
}

export default ModalSolicitacao;
