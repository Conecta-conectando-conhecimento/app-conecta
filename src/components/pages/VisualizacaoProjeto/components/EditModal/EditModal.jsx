import React, { useState } from 'react';
import styles from './EditModal.module.css';

const EditModal = ({ field, value, onClose, onSave }) => {
    const [newValue, setNewValue] = useState(value);

    const handleChange = (e) => {
        setNewValue(e.target.value);
    };

    const handleSave = () => {
        onSave(field, newValue);
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h2>Editar {field}</h2>
                <textarea value={newValue} onChange={handleChange} />
                <div className={styles.buttonGroup}>
                    <button onClick={handleSave} className={styles.saveButton}>Salvar</button>
                    <button onClick={onClose} className={styles.cancelButton}>Cancelar</button>
                </div>
            </div>
        </div>
    );
};

export default EditModal;
