import Navbar from "../../Navbar.jsx";
import styles from "../EditProject/EditProject.module.css";
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from "axios";
import useAuth from "../../../hooks/useAuth.jsx";
import { useNavigate } from "react-router-dom";

const EditProject = () => {
    const { projectId } = useParams();
    const [project, setProject] = useState(null);
    const [projectExists, setProjectExists] = useState(true);
    const { user } = useAuth();
    const [userParticipant, isUserParticipant] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        requestDataProject();
        if (user && user.userId) {
            checkUserProjectRelation();
        }
    }, [projectId, user]);

    const requestDataProject = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/project/${projectId}`);
            setProject(response.data.data);
        } catch (error) {
            console.error('Erro ao obter dados do projeto:', error.message);
            if (error.response && error.response.status === 404) {
                setProjectExists(false);
            }
        }
    };

    const checkUserProjectRelation = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/participants/user/${user.userId}`);
            response.data.data.forEach(item => {
                if (item.project_id === projectId) {
                    isUserParticipant(true);
                }
            });
        } catch (error) {
            console.error("Erro ao verificar a relação do usuário com o projeto:", error.message);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProject(prevProject => ({
            ...prevProject,
            [name]: value
        }));
    };

    const handleSave = async () => {
        try {
            await axios.put(`http://localhost:8000/project/update/${projectId}`, project);
            navigate(`/visualizacaoprojeto/${projectId}`);
        } catch (error) {
            console.error('Erro ao atualizar projeto:', error.message);
        }
    };

    return (
        <div>
            <Navbar />
            {projectExists ? (
                <div className={styles.container}>
                    <div className={styles.projectTitle}>
                        <h2>
                            <input
                                type="text"
                                name="title"
                                value={project?.title || ''}
                                onChange={handleInputChange}
                                placeholder="Carregando..."
                            />
                        </h2>
                    </div>

                    <div className={styles.column}>
                        <div className={styles.row}>
                            <h3>Sobre o projeto</h3>
                            <textarea
                                name="about"
                                value={project?.about || ''}
                                onChange={handleInputChange}
                                placeholder="Carregando..."
                            />
                        </div>
                    </div>
                    <div className={styles.gridLayout}>
                        <div className={styles.column}>
                            {/* Conteúdo adicional pode ser adicionado aqui */}
                        </div>
                        <div className={styles.column}>
                            <div className={styles.row}>
                                <h3>Participantes</h3>
                                <div className={styles.participantList}>
                                    {/* Lista de participantes */}
                                    <p>Editar lista de participantes (em desenvolvimento)</p>
                                </div>
                                <h3>Arquivos</h3>
                                <div className={styles.fileList}>
                                    {/* Lista de arquivos */}
                                    <p>Nenhum arquivo adicionado</p>
                                </div>
                            </div>
                        </div>
                        <div className={styles.column}>
                            <div className={styles.row}>
                                <h3>Atividades</h3>
                                <div className={styles.activityText}>
                                    {/* Texto das atividades */}
                                    <p>Nenhuma atividade concluída</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button onClick={handleSave} className={styles.saveButton}>Salvar</button>
                </div>
            ) : (
                <p className={styles.projectExist}>Opa, parece que você tentou acessar um projeto que não existe</p>
            )}
        </div>
    );
};

export default EditProject;
