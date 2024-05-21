import React, { useState } from 'react';
import styles from './EditCharacteristicsModal.module.css';

const EditCharacteristicsModal = ({ field, value, onClose, onSave }) => {
    const [status, setStatus] = useState(value.status);
    const [maxParticipants, setMaxParticipants] = useState(value.max_participants);
    const [interestArea, setInterestArea] = useState(value.interest_area);

    const handleSave = () => {
        const updatedValue = {
            status: status === 'true',
            max_participants: maxParticipants,
            interest_area: interestArea,
        };
        onSave(updatedValue);
        onClose();
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h2>Editar Características do Projeto</h2>
                <label>
                    Status do Projeto:
                    <select value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value={true}>Aberto</option>
                        <option value={false}>Fechado</option>
                    </select>
                </label>
                <label>
                    Número Máximo de Participantes:
                    <input
                        type="number"
                        value={maxParticipants}
                        onChange={(e) => setMaxParticipants(e.target.value)}
                    />
                </label>
                <label>
                    Áreas de Interesse:
                    <input
                        type="text"
                        value={interestArea}
                        onChange={(e) => setInterestArea(e.target.value)}
                    />
                </label>
                <div className={styles.buttonGroup}>
                    <button onClick={onClose} className={styles.cancelButton}>Cancelar</button>
                    <button onClick={handleSave} className={styles.saveButton}>Salvar</button>
                </div>
            </div>
        </div>
    );
};

export default EditCharacteristicsModal;
