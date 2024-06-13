import React, { useState, useEffect } from 'react';
import styles from './EditModal.module.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import InputMask from 'react-input-mask';

// Função de formatação de data
const formatDateToDDMMYYYY = (dateString) => {
    if (!dateString) return '';

    // Log para depuração
    console.log("Raw birthday string:", dateString);

    // Verifica se a string contém a letra 'T' e se tem uma barra '/' para identificar o formato específico
    if (dateString.includes('T') && dateString.includes('/')) {
        const parts = dateString.split('/');
        const [dayPart] = parts[0].split('T');
        const [month, year] = parts[1].split('/');

        if (dayPart && month && year) {
            // Reconstrói a data no formato dd/mm/yyyy
            return `${dayPart}/${month}/${year}`;
        }
    }

    // Tenta outros formatos possíveis
    const regex = /(\d{4})-(\d{2})-(\d{2})|(\d{2})\/(\d{2})\/(\d{4})/;
    const match = dateString.match(regex);

    if (match) {
        if (match[1] && match[2] && match[3]) {
            // Formato yyyy-mm-dd
            return `${match[3]}/${match[2]}/${match[1]}`;
        } else if (match[4] && match[5] && match[6]) {
            // Formato dd/mm/yyyy
            return `${match[4]}/${match[5]}/${match[6]}`;
        }
    }

    // Tratamento adicional se o formato não corresponder aos esperados
    if (dateString.includes('T')) {
        const [datePart] = dateString.split('T');
        const [year, month, day] = datePart.split('-');
        if (year && month && day) {
            return `${day}/${month}/${year}`;
        }
    }

    // Retorna vazio se não puder formatar
    return '';
};

const EditModal = ({ show, user, onClose, onSave }) => {
    const [userData, setUserData] = useState({
        name: '',
        birthday: '',
        sobre: '',
        user_image_path: '',
        campus: '',
        linkedin: '',
        instagram: '',
        email: ''
    });

    useEffect(() => {
        if (user) {
            console.log("User data received:", user); // Log para depuração
            // Formatar a data de nascimento para dd/mm/yyyy
            const formattedUser = {
                ...user,
                birthday: formatDateToDDMMYYYY(user.birthday)
            };
            setUserData(formattedUser);
        }
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

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h2>Editar Perfil</h2>
                <div className={styles.columns}>
                    <div className={styles.column}>
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
                    </div>
                    <div className={styles.column}>
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
