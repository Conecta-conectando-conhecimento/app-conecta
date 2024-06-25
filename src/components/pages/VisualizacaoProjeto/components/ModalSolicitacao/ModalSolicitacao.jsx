import React, { useState } from 'react';
import Modal from 'react-modal';
import SearchUser from './SearchUser';
import style from './ModalSolicitacao.module.css';
import axios from 'axios';
import { apiUrl } from '../../../../../controllers/api';

Modal.setAppElement('#root');

function ModalSolicitacao({projectId, onAddParticipants, isOwner}) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const openModal = () => {
    if(isOwner) {
      setIsOpen(true);
    } else {
      alert("Somente admins do projeto podem adicionar colaboradores");
    }
    
  }
  const closeModal = () => {
    setIsOpen(false);
    setSelectedUsers([]);
  }

  const handleUserSelect = (user) => {
    setSelectedUsers([...selectedUsers, user]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addUsersToProject();
  };

  const addUsersToProject = async () => {
    for (const dados of selectedUsers) {
      try {
        const response = await axios.post(`${apiUrl}/participants/create`,	
          {
            project_id: projectId,
            user_id: dados.id
          }
        ); 
        console.log(`Participante adicionado com sucesso: ${response.data.data}`);
        setSelectedUsers([]);
        closeModal();
        onAddParticipants();
      } catch (error) {
        console.error(`Erro ao adicionar participante: ${error.message}`);
      }
    }
  }

  return (
    <div className={style.container}>
      <button className={style.button} onClick={openModal}>Adicionar colaboradores</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Solicitação"
        overlayClassName={style.modalOverlay}
        className={style.modalContent}
      >
        <h2 className={style.modalTitle}>Solicitação</h2>
        <h3 className={style.modalSubtitle}>Adicione os usuários que deseja participar do seu projeto</h3>
        <form className={style.formulario} onSubmit={handleSubmit}>
          <SearchUser onUserSelect={handleUserSelect} />
          <div className={style.selectedUsers}>
            {selectedUsers.map((user, index) => (
              <div key={index} className={style.userItem}>
                {user.name}
              </div>
            ))}
          </div>
          <div className={style.buttons}>
            <button className={style.modalButton} onClick={closeModal}>Fechar</button>
            <button className={style.botaoEnviar} type="submit">Adicionar</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default ModalSolicitacao;
