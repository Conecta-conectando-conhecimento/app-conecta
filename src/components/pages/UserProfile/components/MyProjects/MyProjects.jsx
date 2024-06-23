import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../../../../CardProject';
import styles from './MyProjects.module.css';

const MyProjects = ({ show, userId, onClose, isOwner }) => {
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
            const participantResponse = await axios.get(`http://localhost:8000/participant-view/user/${userId}`);
            const projectIds = participantResponse.data.data.map(project => project.project_id); // Obtem os IDs dos projetos participados

            const favoriteResponse = await axios.get(`http://localhost:8000/favorite/user/${userId}`);
            const savedProjectIds = favoriteResponse.data.data.map(project => project.project_id); // Obtem os IDs dos projetos salvos

            // Mesclar e remover duplicatas
            const allProjectIds = Array.from(new Set([...projectIds, ...savedProjectIds]));
            console.log('IDs de todos os projetos:', allProjectIds);

            const projectDetailsPromises = allProjectIds.map(projectId => fetchProjectDetails(projectId));
            const projectDetails = await Promise.all(projectDetailsPromises);

            setProjects(projectDetails.filter(project => project)); // Filtra projetos que não foram carregados corretamente

        } catch (error) {
            console.error('Erro ao obter IDs dos projetos do usuário:', error.message);
        }
    };

    if (!show) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <button className={styles.closeButton} onClick={onClose}>X</button>
                <h2>Meus Projetos</h2>
                <div className={styles.projectsList}>
                    {/* Card de criação de projeto */}
                    {isOwner && (
                        <Card
                            projetoNome="Deseja criar um projeto?"
                            texto="Comece um novo projeto! Estamos aqui para apoiar e fazer seu projeto prosperar, vamos começar agora?"
                            projetoId={null}
                            userId={userId}
                            isCreationCard={true} // Flag indicando que é um card de criação
                        />
                    )}
                    {/* Lista de projetos do usuário */}
                    {projects && projects.length > 0 ? (
                        projects.map((project) => (
                            <Card
                                key={project.id}
                                projetoNome={project.title}
                                texto={project.introduction.replace(/(<([^>]+)>)/gi, "")} // Remove tags HTML
                                projetoId={project.id}
                                userId={userId} // Passando o userId para o componente Card
                                isCreationCard={false} // Flag indicando que não é um card de criação
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
