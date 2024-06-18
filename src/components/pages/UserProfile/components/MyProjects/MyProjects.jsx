import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../../../../CardProject';
import styles from './MyProjects.module.css';

const MyProjects = ({ show, userId, onClose }) => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        if (show) {
            fetchProjects();
        }
    }, [show]);

    const fetchProjectDetails = async (projectId) => {
        try {
            const response = await axios.get(`http://localhost:8000/project/${projectId}`);
            return response.data.data;
        } catch (error) {
            console.error(`Erro ao obter detalhes do projeto ${projectId}:`, error.message);
            return null;
        }
    };

    const fetchProjects = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/participants/user/${userId}`);
            console.log('Projetos recebidos:', response.data);

            const projectDetailsPromises = response.data.data.map(project =>
                fetchProjectDetails(project.project_id)
            );

            const projectDetails = await Promise.all(projectDetailsPromises);
            setProjects(projectDetails.filter(project => project)); // Filtrar projetos que não foram carregados corretamente

        } catch (error) {
            console.error('Erro ao obter projetos:', error.message);
        }
    };

    if (!show) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <button className={styles.closeButton} onClick={onClose}>X</button>
                <h2>Meus Projetos</h2>
                <div className={styles.projectsList}>
                    {projects && projects.length > 0 ? (
                        projects.map((project) => (
                            <Card
                                key={project.id}
                                projetoNome={project.title}
                                texto={project.introduction.replace(/(<([^>]+)>)/gi, "")} // Remove tags HTML
                                projetoId={project.id}
                            />
                        ))
                    ) : (
                        <p>Nenhum projeto encontrado.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyProjects;
