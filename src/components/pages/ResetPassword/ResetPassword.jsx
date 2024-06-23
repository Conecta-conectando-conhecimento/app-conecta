import React, { useState } from 'react';
import style from './ResetPassword.module.css';

function ResetPassword() {
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [errors, setErrors] = useState({});

    const handleSubmit = (event) => {
        event.preventDefault();

        // Validação básica
        const newErrors = {};

        if (!cpf) newErrors.cpf = 'CPF é obrigatório';
        if (!email) newErrors.email = 'Email é obrigatório';
        if (!newPassword) newErrors.newPassword = 'Nova senha é obrigatória';
        if (newPassword !== confirmNewPassword) newErrors.confirmNewPassword = 'As senhas não coincidem';

        setErrors(newErrors);

        // Se não houver erros, você pode enviar os dados para o backend
        if (Object.keys(newErrors).length === 0) {
            console.log('Formulário enviado', { cpf, email, newPassword, confirmNewPassword });
            // Aqui você faria uma chamada para a API para atualizar a senha
        }
    };

    return (
        <div className={style.resetPasswordContainer}>
            <h1>Redefinir Senha</h1>
            <form onSubmit={handleSubmit} className={style.form}>
                <div className={style.formGroup}>
                    <label htmlFor="cpf">CPF</label>
                    <input
                        type="text"
                        id="cpf"
                        value={cpf}
                        onChange={(e) => setCpf(e.target.value)}
                        className={errors.cpf ? style.errorInput : ''}
                    />
                    {errors.cpf && <p className={style.errorMessage}>{errors.cpf}</p>}
                </div>
                <div className={style.formGroup}>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={errors.email ? style.errorInput : ''}
                    />
                    {errors.email && <p className={style.errorMessage}>{errors.email}</p>}
                </div>
                <div className={style.formGroup}>
                    <label htmlFor="newPassword">Nova Senha</label>
                    <input
                        type="password"
                        id="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className={errors.newPassword ? style.errorInput : ''}
                    />
                    {errors.newPassword && <p className={style.errorMessage}>{errors.newPassword}</p>}
                </div>
                <div className={style.formGroup}>
                    <label htmlFor="confirmNewPassword">Confirmar Nova Senha</label>
                    <input
                        type="password"
                        id="confirmNewPassword"
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                        className={errors.confirmNewPassword ? style.errorInput : ''}
                    />
                    {errors.confirmNewPassword && <p className={style.errorMessage}>{errors.confirmNewPassword}</p>}
                </div>
                <button type="submit" className={style.submitButton}>Redefinir Senha</button>
            </form>
        </div>
    );
}

export default ResetPassword;
