import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Certifique-se de importar Link
import style from './MyProjects.module.css';
import Card from '../../../../CardProject';

const MyProjects = ({ show, onClose, userId }) => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        if (show) {
            fetchProjects();
        }
    }, [show]);

    const fetchProjects = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/user/${userId}/projects`);
            setProjects(response.data.projects);
        } catch (error) {
            console.error('Erro ao obter projetos do usuário:', error.message);
        }
    };

    if (!show) {
        return null;
    }

    // IDs dos projetos a serem filtrados
    const projectIds = [1, 26, 50, 18, 19];

    // Filtra os projetos com os IDs desejados
    const filteredProjects = projects.filter(proj => projectIds.includes(proj.id));

    return (
        <div className={style.modalOverlay}>
            <div className={style.modalContent}>
                <button className={style.closeButton} onClick={onClose}>&times;</button>
                <h2>Meus Projetos</h2>
                <div className={style.projectList}>
                    {/* Mapeia os projetos filtrados e renderiza um card para cada um */}
                    {filteredProjects.map(project => (
                        <div className={style.card} key={project.id}>
                            <div className={style.informacoesTexto}>
                                <p className={style.projetoNome}>{project.name}</p>
                                <p className={style.texto}>{project.description}</p>
                            </div>
                            <div className={style.colunaImagemPerfilBotaoVerMais}>
                                {/* Adicione o link para o projeto ou detalhes adicionais */}
                                <Link to={`/project/${project.id}`} className={style.linkNaoSublinhado}>
                                    <button className={style.botaoVerMais}>Ver mais +</button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MyProjects;
