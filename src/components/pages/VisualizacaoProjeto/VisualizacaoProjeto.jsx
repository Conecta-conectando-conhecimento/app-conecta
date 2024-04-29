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
        console.log(projectId)
        requestDataProject();
        checkUserProjectRelation();
    }, [projectId]);

    const requestDataProject = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/project/${projectId} `);
            console.log('Dados do projeto:', response.data);
            setProject(response.data); // Use a função setProject para atualizar o estado
        } catch (error) {
            console.error('Erro ao obter dados do projeto:', error.message);
            if (error.response && error.response.status === 404) {
                setProjectExists(false);
            }
        }
    };

    const checkUserProjectRelation = async () => {
        if (!user || !user.userId) {
            console.error("ID do usuário não encontrado.");
            return;
        }

        try {
            const response = await axios.get(`http://localhost:8000/participants/user/${user.userId}`);
            console.log(response.data.data.project_id);
            if (response.data.data.project_id === projectId) {
                isUserParticipant(true);
            } else {
                isUserParticipant(false);
            }
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
                        <h2>Título do Projeto</h2>
                    </div>
                    <div className={styles.gridLayout}>
                        <div className={styles.column}>
                            <div className={styles.row}>
                                <h3>Sobre o projeto</h3>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum fugit obcaecati ipsam cum minima, quam ut ullam sint natus, possimus facilis harum voluptatibus dolorum maiores veniam quis excepturi! Rem, beatae. Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde nobis neque suscipit dolore. Eum, necessitatibus? Asperiores consequuntur laudantium tenetur excepturi eos nobis ex, iste accusantium velit in similique recusandae. Doloremque!</p>
                            </div>
                            <div className={styles.row}>
                                <ModalSolicitacao />
                            </div>
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
