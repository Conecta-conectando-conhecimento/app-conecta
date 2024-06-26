import React, { useState } from 'react';
import styles from './styles.module.css'; // Importando estilos
import ModalSolicitacao from '../ModalSolicitacao/ModalSolicitacao';
import { useNavigate } from "react-router-dom";

function AcaoParticipacaoProjeto({ isOwner, projectId, setIsEditing, onAddParticipants }) {
    const navigate = useNavigate();
    const [editButtonText, setEditButtonText] = useState('Habilitar Edição do Projeto'); // Estado para o texto do botão

    const handleEditClick = () => {
        setIsEditing(prevState => !prevState);  // Toggle editing mode
        setEditButtonText(prevText => prevText === 'Habilitar Edição do Projeto' ? 'Desabilitar Edição de Projeto' : 'Habilitar Edição do Projeto');
    };

    function sendRequest() {
        console.log("Pedido enviado");
    }

    function navigateToEditProject() {
        navigate(`/editproject/${projectId}`);
    }

    function navigateToFormacaoEquipe() {
        navigate(`/formacaoequipe/${projectId}`);
    }

    return (
        <div className={styles.acaoParticipacaoContainer}>
            {isOwner ? (
                <div className={styles.ownerActions}>
                    <button className={styles.actionButton} onClick={navigateToFormacaoEquipe}>Formação de equipe</button>
                    <ModalSolicitacao projectId={projectId} onAddParticipants={onAddParticipants} isOwner={isOwner}/>
                    <button className={styles.actionButton} onClick={handleEditClick}>{editButtonText}</button>
                </div>
            ) : (
                <div className={styles.requestParticipation}>
                    <h3>Deseja participar do projeto?</h3>
                    <textarea className={styles.requestTextarea} placeholder="Digite seu pedido de participação..."></textarea>
                    <button className={styles.requestButton} onClick={sendRequest}>Enviar Pedido</button>
                </div>
            )}
        </div>
    );
}

export default AcaoParticipacaoProjeto;
