// SugestionsModal.jsx

import React, { useState } from 'react';
import Modal from 'react-modal';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styles from './ModalStyles.module.css';

Modal.setAppElement('#root'); // Definindo o elemento root para acessibilidade

const SugestionsModal = ({ isOpen, onRequestClose, onSave }) => {
    const [sugestionText, setSugestionText] = useState('');

    const handleSave = () => {
        onSave(sugestionText);
        setSugestionText('');
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            className={styles.modalContent}
            overlayClassName={styles.modalOverlay}
            contentLabel="Sugestões"
        >
            <button className={styles.closeButton} onClick={onRequestClose}>&times;</button>
            <h2>Enviar Sugestão</h2>
            <div className={styles.field}>
                <label htmlFor="sugestion">Forneça detalhes sobre a sugestão que você quer nos passar. Isso nos ajudará a melhorar nosso site.</label>
                <div className={styles['quill-container']}>
                    <ReactQuill
                        value={sugestionText}
                        onChange={setSugestionText}
                        readOnly={false}
                        modules={{ toolbar: false }}
                    />
                </div>
            </div>
            <div className={styles.buttonGroup}>
                <button className={styles.cancelButton} onClick={onRequestClose}>Cancelar</button>
                <button className={styles.saveButton} onClick={handleSave}>Salvar</button>
            </div>
        </Modal>
    );
};

export default SugestionsModal;
