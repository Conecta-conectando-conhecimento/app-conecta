import React, { useEffect, useState } from 'react';
import axios from 'axios';
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
        return '';
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
                <ul className={style.projectList}>
                    {filteredProjects.map(project => (
                        <Card 
                            key={project.id} 
                            projetoId={project.id} 
                            projetoNome={project.projetoNome} 
                            texto={project.texto} 
                        />
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default MyProjects;
