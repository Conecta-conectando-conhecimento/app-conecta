import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styles from './EditModal.module.css';

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

const fieldTitles = {
    name: 'Nome',
    user_image_path: 'Imagem de Perfil',
    sobre: 'Sobre',
    campus: 'Campus',
    linkedin: 'LinkedIn',
    instagram: 'Instagram',
    email: 'E-mail',
    cpf: 'CPF',
    user_name: 'Nome de Usuário',
    birthday: 'Data de Nascimento'
};

const EditModal = ({ show, user, onClose, onSave }) => {
    const [formValues, setFormValues] = useState({
        name: '',
        user_image_path: '',
        sobre: '',
        campus: '',
        linkedin: '',
        instagram: '',
        email: '',
        cpf: '',
        user_name: '',
        birthday: ''
    });

    useEffect(() => {
        setFormValues({
            name: user.name || '',
            user_image_path: user.user_image_path || '',
            sobre: user.sobre || '',
            campus: user.campus || '',
            linkedin: user.linkedin || '',
            instagram: user.instagram || '',
            email: user.email || '',
            cpf: user.cpf || '',
            user_name: user.user_name || '',
            birthday: user.birthday || ''
        });
    }, [user]);

    const handleChange = (field, value) => {
        setFormValues(prevValues => ({
            ...prevValues,
            [field]: value
        }));
    };

    const handleSave = () => {
        onSave(formValues);
        onClose();
    };

    if (!show) {
        return null;
    }

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h2>Editar Perfil</h2>
                {Object.keys(fieldTitles).map(field => (
                    <div key={field} className={styles.fieldGroup}>
                        <label>{fieldTitles[field]}</label>
                        {field === 'sobre' ? (
                            <ReactQuill
                                theme="snow"
                                value={formValues[field]}
                                onChange={(value) => handleChange(field, value)}
                                modules={fullModules}
                                formats={fullFormats}
                            />
                        ) : (
                            <input
                                type="text"
                                value={formValues[field]}
                                onChange={(e) => handleChange(field, e.target.value)}
                            />
                        )}
                    </div>
                ))}
                <div className={styles.buttonGroup}>
                    <button onClick={onClose} className={styles.cancelButton}>Cancelar</button>
                    <button onClick={handleSave} className={styles.saveButton}>Salvar</button>
                </div>
            </div>
        </div>
    );
};

export default EditModal;
