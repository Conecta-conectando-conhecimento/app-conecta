import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";
import useAuth from "../../../hooks/useAuth.jsx";
import Navbar from "../../Navbar";
import ModalSolicitacao from "./components/ModalSolicitacao/ModalSolicitacao";
import AcaoParticipacaoProjeto from "./components/AcaoParticipacaoProjeto/index.jsx";
import EditModal from "./components/EditModal/EditModal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import styles from "../VisualizacaoProjeto/VisualizacaoProjeto.module.css";

const VisualizacaoProjeto = () => {
    const { projectId } = useParams();
    const [project, setProject] = useState(null);
    const [projectExists, setProjectExists] = useState(true);
    const { user } = useAuth();
    const [userParticipant, isUserParticipant] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [currentField, setCurrentField] = useState('');
    const [currentValue, setCurrentValue] = useState('');

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
                if (item.project_id == projectId) {
                    isUserParticipant(true);
                }
            });
        } catch (error) {
            console.error("Erro ao verificar a relação do usuário com o projeto:", error.message);
        }
    };

    const openModal = (field, value) => {
        setCurrentField(field);
        setCurrentValue(value);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const handleSave = async (field, value) => {
        try {
            const updatedProject = { ...project, [field]: value };
            await axios.put(`http://localhost:8000/project/update/${projectId}`, updatedProject);
            setProject(updatedProject);
            closeModal();
        } catch (error) {
            console.error('Erro ao atualizar o projeto:', error.message);
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
                            {isEditing && (
                                <FontAwesomeIcon
                                    icon={faPencilAlt}
                                    className={styles.pencilIcon}
                                    onClick={() => openModal('title', project.title)}
                                />
                            )}
                        </h2>
                    </div>

                    <div className={styles.column}>
                        <div className={styles.row}>
                            <h3>
                                Sobre o projeto
                                {isEditing && (
                                    <FontAwesomeIcon
                                        icon={faPencilAlt}
                                        className={styles.pencilIcon}
                                        onClick={() => openModal('about', project.about)}
                                    />
                                )}
                            </h3>
                            <p>
                                {project && project.about ? project.about : 'Carregando...'}
                            </p>
                        </div>
                    </div>

                    <div className={styles.gridLayout}>
                        <div className={styles.column}>
                            <AcaoParticipacaoProjeto isOwner={userParticipant} projectId={projectId} setIsEditing={setIsEditing}/>
                        </div>
                        <div className={styles.column}>
                            <div className={styles.row}>
                                <h3>
                                    Participantes
                                    {isEditing && <FontAwesomeIcon icon={faPencilAlt} className={styles.pencilIcon} />}
                                </h3>
                                <div className={styles.participantList}>
                                    {/* Lista de participantes */}
                                </div>
                                <h3>
                                    Arquivos
                                    {isEditing && <FontAwesomeIcon icon={faPencilAlt} className={styles.pencilIcon} />}
                                </h3>
                                <div className={styles.fileList}>
                                    {/* Lista de arquivos */}
                                    <p>Nenhum arquivo adicionado</p>
                                </div>
                            </div>
                        </div>
                        <div className={styles.column}>
                            <div className={styles.row}>
                                <h3>
                                    Atividades
                                    {isEditing && <FontAwesomeIcon icon={faPencilAlt} className={styles.pencilIcon} />}
                                </h3>
                                <div className={styles.activityText}>
                                    {/* Texto das atividades */}
                                    <p>Nenhuma atividade concluída</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {modalVisible && (
                        <EditModal 
                            field={currentField}
                            value={currentValue}
                            onClose={closeModal}
                            onSave={handleSave}
                        />
                    )}
                </div>
            ) : (
                <p className={styles.projectExist}>Opa, parece que você tentou acessar um projeto que não existe</p>
            )}
        </div>
    );
};

export default VisualizacaoProjeto;
