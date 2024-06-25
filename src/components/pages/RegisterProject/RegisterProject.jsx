import style from './RegisterProject.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../navbar/Navbar';
import useAuth from "../../../hooks/useAuth.jsx";

const RegisterProject = () => {
    const [nomeProjeto, setNomeProjeto] = useState(""); 
    const [areaInteresse, setAreaInteresse] = useState(""); 
    const [numParticipantes, setNumParticipantes] = useState(""); 
    const [introduction, setIntroduction] = useState(""); 
    const { user } = useAuth();

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const projectData = {
            title: nomeProjeto,
            introduction: introduction,
            max_participants: numParticipantes,
            user_id: user.userId,
            about: 'Carregando...', // Definindo o valor padrão para 'about'
        };

        try {
            const response = await fetch('http://localhost:8000/project/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(projectData),
            });

            if (response.ok) {
                const responseData = await response.json(); // Obter os dados da resposta

                const projectId = responseData.project_id; // Assumindo que o ID do projeto está no campo 'project_id'

                console.log('ID do Projeto Criado:', projectId); // Logar o ID do projeto no console

                alert('Projeto cadastrado com sucesso!');

                // Redirecionar para o perfil do usuário com o ID do projeto recém-criado
                navigate(`/userprofile/${user.userId}?project_id=${projectId}`);
            } else {
                const errorData = await response.json();
                alert('Erro ao cadastrar projeto: ' + errorData.message);
            }
        } catch (error) {
            alert('Erro ao cadastrar projeto: ' + error.message);
        }
    };

    return (
        <>
            <Navbar />
            <div className={style.Corpo}>
                <div className={style.DivImgTelaCadastro}>
                    <img className={style.imgTelaCadastro} src="../public/assets/cadastro projeto img.jpg" alt="ideia" />
                    <form className={style.FormProject} onSubmit={handleSubmit}>
                        <h1 className={style.Titulo}>Cadastre seu Projeto!</h1>
                        <div className={style.ImputGroup}>
                            <div className={style.ImputBox}>
                                <label htmlFor="nomeProjeto">Nome do Projeto</label>
                                <input type="text"
                                    name='nomeProjeto'
                                    placeholder='Nome do Projeto'
                                    onChange={(e) => setNomeProjeto(e.target.value)}
                                    required
                                />
                            </div>

                            <div className={style.ImputBox}>
                                <label htmlFor="areaInteresse">Área de Interesse</label>
                                <input type="text"
                                    name='areaInteresse'
                                    placeholder='Ex. Enfermagem'
                                    onChange={(e) => setAreaInteresse(e.target.value)}
                                    required
                                />
                            </div>

                            <div className={style.ImputBox}>
                                <label htmlFor="numParticipantes">Número de Participantes</label>
                                <input type="number"
                                    min="1"
                                    name='numParticipantes'
                                    placeholder='Número de Participantes'
                                    onChange={(e) => setNumParticipantes(e.target.value)}
                                    required
                                />
                            </div>

                            <div className={style.ImputBox}>
                                <label htmlFor="introducao">Introdução do Projeto</label>
                                <textarea
                                    rows="4"
                                    cols="50"
                                    name='introducao'
                                    placeholder='Introduza o seu projeto'
                                    onChange={(e) => setIntroduction(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <input
                            className={style.btnCadastrar1}
                            type="submit"
                            value={"Cadastrar"}
                        />
                    </form>
                </div>
            </div>
        </>
    );
}

export default RegisterProject;
