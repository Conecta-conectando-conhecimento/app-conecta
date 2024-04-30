import React from 'react';
import styles from './styles.module.css'; // Importando estilos
import ModalSolicitacao from '../ModalSolicitacao/ModalSolicitacao';

function AcaoParticipacaoProjeto({ isOwner }) {
    function sendRequest() {
        console.log("Pedido enviado");
    }

    return (
        <div className={styles.acaoParticipacaoContainer}>
            {isOwner ? (
                <div className={styles.ownerActions}>
                    <button className={styles.actionButton}>Formação de equipe</button>
                    <ModalSolicitacao />
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
