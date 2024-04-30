import Navbar from "../../Navbar";
import ModalSolicitacao from "./components/ModalSolicitacao/ModalSolicitacao";
import styles from "../VisualizacaoProjeto/VisualizacaoProjeto.module.css";
import AcaoParticipacaoProjeto from "./components/AcaoParticipacaoProjeto/index.jsx";
import { useParams } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useState } from "react";
import axios from "axios";
import useAuth from "../../../hooks/useAuth.jsx";

const VisualizacaoProjeto = () => {
    const { projectId } = useParams();
    const [project, setProject] = useState(null);
    const [projectExists, setProjectExists] = useState(true);
    const { user } = useAuth();
    const [userParticipant, isUserParticipant] = useState(false);

    useEffect(() => {
        requestDataProject();
        if (user && user.userId) {
            checkUserProjectRelation();
        }
    }, [projectId, user]);

    const requestDataProject = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/project/${projectId} `);
            setProject(response.data.data); // Use a função setProject para atualizar o estado
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
                if (item.project_id == projectId) {
                    isUserParticipant(true);
                }
            });
        } catch (error) {
            console.error("Erro ao verificar a relação do usuário com o projeto:", error.message);
        }
    };




    return (
        <div>
            <Navbar />
            {projectExists ? (
                <div className={styles.container}>
                    <div className={styles.projectTitle}>
                        <h2>
                            {project && project.title ? project.title : 'Carregando...'}
                        </h2>
                    </div>

                    <div className={styles.column}>
                        <div className={styles.row}>
                            <h3>Sobre o projeto</h3>
                            <p>
                                {project && project.about ? project.about : 'Carregando...'}
                            </p>
                        </div>

                    </div>
                    <div className={styles.gridLayout}>
                        <div className={styles.column}>
                            <AcaoParticipacaoProjeto isOwner={userParticipant} />
                        </div>
                        <div className={styles.column}>
                            <div className={styles.row}>
                                <h3>Participantes</h3>
                                <div className={styles.participantList}>
                                    {/* Lista de participantes */}
                                    {/*<img src={'/assets/Feed/FotoPerfilTelaTeste.png'} alt="FotoPerfil" />*/}
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
                </div>
            ) : (
                <p className={styles.projectExist}>Opa, parece que você tentou acessar um projeto que não existe</p>
            )};

        </div>
    );
};

export default VisualizacaoProjeto;
