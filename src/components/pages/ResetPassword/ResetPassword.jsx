import React, { useState } from 'react';
import style from './ResetPassword.module.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom"; // Importar useNavigate

function ResetPassword() {
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate(); // Usar o hook useNavigate

    const handleFetchUser = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/user/email/${email}`);
            const userData = response.data.data;
            setUser(userData);
            return userData;
        } catch (error) {
            setErrors(prevErrors => ({ ...prevErrors, fetch: 'Erro ao buscar usuário. Verifique o email digitado.' }));
            return null;
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrors({});
        setLoading(true);
    
        const fetchedUser = await handleFetchUser();
    
        if (fetchedUser) {
            if (fetchedUser.cpf === cpf) {
                if (newPassword === confirmNewPassword) {
                    try {
                        // Enviar a nova senha diretamente para o endpoint new-password
                        await axios.post(`http://localhost:8000/auth/new-password`, { email, newPassword });
                        
                        // Exibir mensagem de sucesso
                        alert('Senha redefinida com sucesso!');
                        
                        // Redirecionar para a página de login após o alerta
                        navigate('/login');
                    } catch (error) {
                        setErrors(prevErrors => ({ ...prevErrors, submit: 'Erro ao redefinir senha. Tente novamente.' }));
                    }
                } else {
                    setErrors(prevErrors => ({ ...prevErrors, confirmNewPassword: 'As senhas não conferem.' }));
                }
            } else {
                setErrors(prevErrors => ({ ...prevErrors, cpf: 'CPF não confere com o email fornecido.' }));
            }
        } else {
            setErrors(prevErrors => ({ ...prevErrors, fetch: 'Usuário não encontrado.' }));
        }
    
        setLoading(false);
    };

    return (
        <div className={style.resetPasswordContainer}>
            <div className={style.container}>
                <h1>Redefinir Senha</h1>
                <p>Caso queira trocar sua senha ou tenha esquecido, preencha os dados abaixo para poder trocá-la.</p>
                <form onSubmit={handleSubmit} className={style.form}>
                    <div className={style.formGroup}>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={errors.email ? style.errorInput : ''}
                            required
                        />
                        {errors.email && <p className={style.errorMessage}>{errors.email}</p>}
                    </div>
                    <div className={style.formGroup}>
                        <label htmlFor="cpf">CPF</label>
                        <input
                            type="text"
                            id="cpf"
                            value={cpf}
                            onChange={(e) => setCpf(e.target.value)}
                            className={errors.cpf ? style.errorInput : ''}
                            required
                        />
                        {errors.cpf && <p className={style.errorMessage}>{errors.cpf}</p>}
                    </div>
                    <div className={style.formGroup}>
                        <label htmlFor="newPassword">Nova Senha</label>
                        <input
                            type="password"
                            id="newPassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className={errors.newPassword ? style.errorInput : ''}
                            required
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
                            required
                        />
                        {errors.confirmNewPassword && <p className={style.errorMessage}>{errors.confirmNewPassword}</p>}
                    </div>
                    {errors.fetch && <p className={style.errorMessage}>{errors.fetch}</p>}
                    {errors.submit && <p className={style.errorMessage}>{errors.submit}</p>}
                    <button type="submit" className={style.submitButton} disabled={loading}>
                        {loading ? 'Processando...' : 'Redefinir Senha'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ResetPassword;
