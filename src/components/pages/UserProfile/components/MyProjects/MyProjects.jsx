import React, { useEffect, useState } from 'react';
import axios from 'axios';
import style from './MyProjects.module.css';

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

    return (
        <div className={style.modalOverlay}>
            <div className={style.modalContent}>
                <button className={style.closeButton} onClick={onClose}>&times;</button>
                <h2>Meus Projetos</h2>
                <ul className={style.projectList}>
                    {projects.map(project => (
                        <li key={project.id} className={style.projectListItem}>
                            {project.title}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default MyProjects;
