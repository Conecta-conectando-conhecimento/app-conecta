import React, { useState } from 'react';
import style from './ResetPassword.module.css';
import { Link } from 'react-router-dom';

function ResetPassword() {
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [errors, setErrors] = useState({});

    const handleSubmit = (event) => {


    };

    return (
        <div className={style.resetPasswordContainer}>
            <div className={style.container}>
                <h1>Redefinir Senha</h1>
                <p>Caso queira trocar sua senha ou tenha esquecido, preencha os dados abaixo para poder troca-la.</p>
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
                    <Link to="/login">
                        <button type="submit" className={style.submitButton}>Redefinir Senha</button>
                    </Link>

                </form>
            </div>
        </div>
    );
}

export default ResetPassword;
