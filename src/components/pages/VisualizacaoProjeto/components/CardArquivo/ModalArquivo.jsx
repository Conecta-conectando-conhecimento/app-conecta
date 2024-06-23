import { useState } from 'react';
import styles from './ModalArquivo.module.css';

const ModalArquivo = ({ isOpen, onClose, onUpdate, initialName }) => {
    const [fileName, setFileName] = useState(initialName);

    const handleConfirmClick = () => {
        onUpdate(fileName);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h2>Editar Nome do Arquivo</h2>
                <input
                    type="text"
                    value={fileName}
                    onChange={(e) => setFileName(e.target.value)}
                    className={styles.input}
                />
                <div className={styles.buttons}>
                    <button onClick={onClose} className={styles.btnClose}>
                        Fechar
                    </button>
                    <button onClick={handleConfirmClick} className={styles.btnConfirm}>
                        Confirmar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalArquivo;
