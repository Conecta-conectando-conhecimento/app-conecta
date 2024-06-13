import React, { useState } from 'react';
import Modal from 'react-modal';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styles from './ModalStyles.module.css';

Modal.setAppElement('#root'); // Definindo o elemento root para acessibilidade

const ReportProblemModal = ({ isOpen, onRequestClose, onSave }) => {
    const [reportText, setReportText] = useState('');

    const handleSave = () => {
        onSave(reportText);
        setReportText('');
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            className={styles.modalContent}
            overlayClassName={styles.modalOverlay}
            contentLabel="Report Problem"
        >
            <button className={styles.closeButton} onClick={onRequestClose}>&times;</button>
            <h2>Reportar Problema</h2>
            <div className={styles.field}>
                <label htmlFor="report">Forneça detalhes sobre o problema que você está enfrentando. Isso nos ajudará a entender melhor a situação e a encontrar uma solução mais rapidamente.</label>
                <div className={styles['quill-container']}>
                    <ReactQuill
                        value={reportText}
                        onChange={setReportText}
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

export default ReportProblemModal;
