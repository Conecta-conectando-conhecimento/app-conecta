import React, { useState, useEffect } from 'react';
import styles from './EditModal.module.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import InputMask from 'react-input-mask';

const EditModal = ({ show, user, onClose, onSave }) => {
    const [userData, setUserData] = useState({
        name: '',
        user_name: '',
        cpf: '',
        birthday: '',
        sobre: '',
        user_image_path: '',
        campus: '',
        linkedin: '',
        instagram: '',
        email: ''
    });

    useEffect(() => {
        setUserData(user);
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSaveClick = () => {
        onSave(userData);
    };

    if (!show) return null;

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

    const formatBirthday = (dateString) => {
        // Assume que a data está no formato "DD/MM/YYYY"
        const [day, month, year] = dateString.split('/');
        return `${year}-${month}-${day}`;
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h2>Editar Perfil</h2>
                <div className={styles.fieldGroup}>
                    <div className={styles.field}>
                        <label htmlFor="name">Nome Completo</label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            value={userData.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.field}>
                        <label htmlFor="user_name">Nome de Usuário</label>
                        <input
                            id="user_name"
                            name="user_name"
                            type="text"
                            value={userData.user_name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.field}>
                        <label htmlFor="cpf">CPF</label>
                        <input
                            id="cpf"
                            name="cpf"
                            type="text"
                            value={userData.cpf}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.field}>
                        <label htmlFor="birthday">Data de Nascimento</label>
                        <InputMask
                            mask="99/99/9999"
                            id="birthday"
                            name="birthday"
                            value={userData.birthday}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.field}>
                        <label htmlFor="sobre">Sobre</label>
                        <ReactQuill
                            theme="snow"
                            modules={fullModules}
                            value={userData.sobre || ''}
                            onChange={(value) => setUserData(prevState => ({
                                ...prevState,
                                sobre: value
                            }))}
                        />
                    </div>
                    <div className={styles.field}>
                        <label htmlFor="user_image_path">Imagem de Perfil</label>
                        <input
                            id="user_image_path"
                            name="user_image_path"
                            type="text"
                            value={userData.user_image_path}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.field}>
                        <label htmlFor="campus">Campus</label>
                        <input
                            id="campus"
                            name="campus"
                            type="text"
                            value={userData.campus}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.field}>
                        <label htmlFor="linkedin">Linkedin</label>
                        <input
                            id="linkedin"
                            name="linkedin"
                            type="text"
                            value={userData.linkedin}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.field}>
                        <label htmlFor="instagram">Instagram</label>
                        <input
                            id="instagram"
                            name="instagram"
                            type="text"
                            value={userData.instagram}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.field}>
                        <label htmlFor="email">E-mail</label>
                        <input
                            id="email"
                            name="email"
                            type="text"
                            value={userData.email}
                            onChange={handleChange}
                        />
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
