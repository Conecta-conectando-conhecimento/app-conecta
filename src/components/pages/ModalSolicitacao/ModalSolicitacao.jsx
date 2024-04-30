import style from "./ModalSolicitacao.module.css";
import { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

function ModalSolicitacao() {
  //funções relacionadas ao modal
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    setEmails(['']);
  }


  //funções relacionadas ao email
  const [emails, setEmails] = useState(['']);

  const addEmailField = () => {
    setEmails([...emails, '']);
  };

  const handleEmailChange = (index, event) => {
    const newEmails = [...emails];
    newEmails[index] = event.target.value;
    setEmails(newEmails);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(emails); //logica de email no email
  };

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
        <h2 className={style["modal-title"]}>Solicitação</h2>
        <h3 className={style["modal-subtitle"]}>Convide pessoas para participar do seu projeto</h3>
        <div>
      <form className={style.formulario} onSubmit={handleSubmit}>
        {emails.map((email, index) => (
          <div key={index}>
            <input className= {style["input"]}
              type="email"
              placeholder="Informe o email para solicitar participação"
              value={email}
              onChange={(e) => handleEmailChange(index, e)}
            />
          </div>
        ))}
        <button type="button" className= {style.mais}onClick={addEmailField}>+</button>
        <br />
      </form>
    </div>
        <div className={style.buttons}>
        <button className={style["modal-button"]} onClick={closeModal}>Close</button>
        <button className= {style.botaoEnviar} type="submit" onClick={closeModal}>Enviar</button>
        </div>
      </Modal>
    </div>
  );
}

export default ModalSolicitacao;
