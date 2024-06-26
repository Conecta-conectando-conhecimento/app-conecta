import React, { useState, useEffect } from 'react';
import styles from './ModalStyles.module.css';
import axios from 'axios';
import InputMask from 'react-input-mask';
import { apiUrl } from '../../controllers/api';

const ConfigurationsModal = ({ show, user, onClose, onSave }) => {
    const [configData, setConfigData] = useState({
        user_name: '',
        email: '',
        cpf: ''
    });

    const [emailError, setEmailError] = useState('');

    useEffect(() => {
        if (user) {
            setConfigData({
                user_name: user.user_name || '',
                email: user.email || '',
                cpf: user.cpf || ''
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Validação de e-mail em tempo real
        if (name === 'email') {
            validateEmail(value);
        }

        setConfigData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const validateEmail = (email) => {
        // Expressão regular básica para validação de e-mail
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setEmailError('E-mail inválido');
        } else {
            setEmailError('');
        }
    };

    const removeCpfMask = (cpf) => {
        // Remove todos os caracteres que não são números
        return cpf.replace(/\D/g, '');
    };

    const handleSaveClick = async () => {
        if (emailError) {
            alert("Por favor, insira um e-mail válido.");
            return;
        }

        // Cria uma cópia dos dados de configuração e remove a máscara do CPF
        const dataToSend = {
            ...configData,
            cpf: removeCpfMask(configData.cpf) // Remove a máscara do CPF
        };

        try {
            const response = await axios.put(`${apiUrl}/user/update/${user.id}`, configData);
            console.log('Dados atualizados:', response.data);
            onSave(response.data);
        } catch (error) {
            console.error('Erro ao atualizar os dados:', error.message);
        }
    };

    if (!show) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h2>Configurações</h2>
                <div className={styles.columns}>
                    <div className={styles.column}>
                        <div className={styles.field}>
                            <label htmlFor="user_name">Nome de Usuário</label>
                            <input
                                id="user_name"
                                name="user_name"
                                type="text"
                                value={configData.user_name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className={styles.field}>
                            <label htmlFor="email">E-mail</label>
                            <input
                                id="email"
                                name="email"
                                type="text"
                                value={configData.email}
                                onChange={handleChange}
                            />
                            {/* Mostra mensagem de erro se o e-mail for inválido */}
                            {emailError && <span className={styles.error}>{emailError}</span>}
                        </div>
                        <div className={styles.field}>
                            <label htmlFor="cpf">CPF</label>
                            <InputMask
                                id="cpf"
                                name="cpf"
                                mask="999.999.999-99"
                                value={configData.cpf}
                                onChange={handleChange}
                            >
                                {(inputProps) => <input {...inputProps} type="text" />}
                            </InputMask>
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

export default ConfigurationsModal;
