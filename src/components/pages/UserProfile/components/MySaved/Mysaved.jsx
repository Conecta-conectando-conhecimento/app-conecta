import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../../../../CardProject';
import styles from './Mysaved.module.css';
import { apiUrl } from '../../../../../../controllers/api';

const MySaved = ({ show, userId, onClose }) => {
    const [savedProjects, setSavedProjects] = useState([]);

    useEffect(() => {
        if (show) {
            fetchSavedProjects();
        }
    }, [show]);

    const fetchSavedProjects = async () => {
        try {
            const response = await axios.get(`${apiUrl}/favorite/user/${userId}`);
            const savedProjectsData = response.data.data; // Acessa a propriedade data da resposta
            setSavedProjects(savedProjectsData);
        } catch (error) {
            console.error('Erro ao buscar projetos salvos:', error.message);
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
                                key={project.project_id}
                                projetoNome={project.project.title} // Acessa a propriedade title do projeto
                                texto={project.project.introduction.replace(/(<([^>]+)>)/gi, "")} // Remove tags HTML
                                projetoId={project.project_id} // Acessa o id do projeto
                                userId={userId} // Passa o userId como prop
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
