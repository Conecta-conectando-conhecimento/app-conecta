import React from 'react';
import './styles.module.css'; 

function AcaoParticipacaoProjeto({ isOwner }) {
    function sendRequest() {
        console.log("Pedido enviado");
    }

    return (
        <div className="acao-participacao-container">
            {isOwner ? (
                <div className="owner-actions">
                    <button className="action-button">Formar Equipes</button>
                    <button className="action-button">Convidar Participantes</button>
                </div>
            ) : (
                <div className="request-participation">
                    <textarea className="request-textarea" placeholder="Digite seu pedido de participação..."></textarea>
                    <button className="request-button" onClick={sendRequest}>Enviar Pedido</button>
                </div>
            )}
        </div>
    );
}

export default AcaoParticipacaoProjeto;
