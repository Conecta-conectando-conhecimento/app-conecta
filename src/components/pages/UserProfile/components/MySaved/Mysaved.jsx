import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../../../../CardProject'; // Certifique-se de que o caminho para o Card está correto
import styles from './MySaved.module.css';

const MySaved = ({ show, userId, onClose }) => {
    const [savedProjects, setSavedProjects] = useState([]);

    useEffect(() => {
        if (show) {
            fetchSavedProjects();
        }
    }, [show]);

    const fetchSavedProjects = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/favorite/user/${userId}`);
            setSavedProjects(response.data.data); // Ajuste conforme a estrutura da resposta do backend
        } catch (error) {
            console.error('Erro ao buscar projetos salvos:', error);
        }
    };

    if (!show) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <button className={styles.closeButton} onClick={onClose}>X</button>
                <h2>Projetos Salvos</h2>
                <div className={styles.projectsList}>
                    {savedProjects && savedProjects.length > 0 ? (
                        savedProjects.map((project) => (
                            <Card
                                key={project.id}
                                projetoNome={project.project.title} // Acesse o título do projeto salvo
                                texto={project.project.introduction.replace(/(<([^>]+)>)/gi, "")} // Remove tags HTML
                                projetoId={project.project.id} // ID do projeto salvo
                            />
                        ))
                    ) : (
                        <p>Nenhum projeto salvo encontrado.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MySaved;
