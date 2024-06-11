// components/EditModal/EditModal.js
import React, { useState, useEffect } from 'react';
import styles from './EditModal.module.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

// Começo estilo do React Quill
const fullModules = {
    toolbar: {
        container: [
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['bold', 'italic', 'underline'],
            [{ 'align': [] }],
            ['clean']
        ]
    }
};

const fullFormats = [
    'list', 'bullet', 'bold', 'italic', 'underline', 'align'
];
// Fim estilo do React Quill

const EditModal = ({ show, user, onClose, onSave }) => {
    const [name, setName] = useState(user.name);

    useEffect(() => {
        setName(user.name); // Atualize o estado local quando o usuário mudar
    }, [user]);

    const handleSaveClick = () => {
        onSave(name);
    };

    if (!show) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h2>Editar Perfil</h2>
                <div className={styles.fieldGroup}>
                    <div className={styles.field}>
                        <label htmlFor="name">Nome Completo</label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className={styles.field}>
                        <label>Nome de Usuário</label>
                        <input type="text" />
                    </div>
                    <div className={styles.field}>
                        <label>CPF</label>
                        <input type="text" />
                    </div>
                    <div className={styles.field}>
                        <label>Data de Nascimento</label>
                        <input type="text" />
                    </div>
                    <div className={styles.field}>
                        <label>Sobre</label>
                        <ReactQuill
                            theme="snow"
                            modules={fullModules}
                            formats={fullFormats}
                        />
                    </div>
                    <div className={styles.field}>
                        <label>Imagem de Perfil</label>
                        <input type="text" />
                    </div>
                    <div className={styles.field}>
                        <label>Campus</label>
                        <input type="text" />
                    </div>
                    <div className={styles.field}>
                        <label>Linkedin</label>
                        <input type="text" />
                    </div>
                    <div className={styles.field}>
                        <label>Instagram</label>
                        <input type="text" />
                    </div>
                    <div className={styles.field}>
                        <label>E-mail</label>
                        <input type="text" />
                    </div>

                </div>

                <div className={styles.buttonGroup}>
                    <button className={styles.cancelButton} onClick={onClose}>Cancelar</button>
                    <button className={styles.saveButton} onClick={handleSaveClick}>Salvar</button>
                </div>
            </div>
        </div>
    );
};

export default EditModal;
