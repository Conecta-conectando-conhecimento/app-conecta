import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";
import useAuth from "../../../hooks/useAuth.jsx";
import Navbar from "../../Navbar";
import AcaoParticipacaoProjeto from "./components/AcaoParticipacaoProjeto/index.jsx";
import EditModal from "./components/EditModal/EditModal";
import EditCharacteristicsModal from "./components/EditCharacteristicsModal/EditCharacteristicsModal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import styles from "../VisualizacaoProjeto/VisualizacaoProjeto.module.css";
import CardParticipante from "./components/CardParticipante/CardParticipante.jsx";
import CardArquivo from './components/CardArquivo/CardArquivo.jsx';
import ModalArquivo from './components/CardArquivo/ModalArquivo.jsx';

const VisualizacaoProjeto = () => {
    const { projectId } = useParams();
    const [project, setProject] = useState(null);
    const [participantes, setParticipantes] = useState(null);
    const [projectFiles, setProjectFiles] = useState(null);
    const [projectExists, setProjectExists] = useState(true);
    const [userIsAdmin, setUserIsAdmin] = useState(false);
    const { user } = useAuth();
    const [userParticipant, isUserParticipant] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalArquivoVisible, setModalArquivoVisible] = useState(false);
    const [currentField, setCurrentField] = useState('');
    const [currentValue, setCurrentValue] = useState('');
    const [characteristicsModalVisible, setCharacteristicsModalVisible] = useState(false);

    const [currentFile, setCurrentFile] = useState(null);

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
        try {
            const responseParticipantes = await axios.get(`http://localhost:8000/participant-view/project/${projectId}`);
            const participantsData = responseParticipantes.data.data;
            setParticipantes(participantsData);

            if (user && user.userId) {
                const userParticipantData = participantsData.find(participant => participant.user_id == user.userId);
                if (userParticipantData) {
                    setUserIsAdmin(userParticipantData.is_admin);
                }
            }
        } catch (error) {
            console.error("Erro ao obter participante do projeto:", error.message);
        }

        try {
            const responseFiles = await axios.get(`http://localhost:8000/projectfiles/project/${projectId}`);
            setProjectFiles(responseFiles.data.data);
        } catch (error) {
            console.error('Erro ao obter dados do projeto:', error.message);
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

    const openModalArquivo = (name, id, url) => {
        setCurrentFile({ id: id, name: name, url: url });
        setModalArquivoVisible(true);
    };

    const openModal = (field, value, useSimpleEditor = false) => {
        setCurrentField(field);
        setCurrentValue(value);
        setModalVisible(true);
    };

    const openCharacteristicsModal = () => {
        setCurrentField('characteristics');
        setCurrentValue({
            status: project.status,
            max_participants: project.max_participants,
            interest_area: project.interest_area
        });
        setCharacteristicsModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setCharacteristicsModalVisible(false);
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

    const handleSaveCharacteristics = async (value) => {
        try {
            const updatedProject = {
                ...project,
                status: value.status,
                max_participants: value.max_participants,
                interest_area: value.interest_area
            };
            await axios.put(`http://localhost:8000/project/update/${projectId}`, updatedProject);
            setProject(updatedProject);
            closeModal();
        } catch (error) {
            console.error('Erro ao atualizar as características do projeto:', error.message);
        }
    };

    const handleUpdateArquivo = async (newName) => {

        const updatedFile = {
            name: newName,
            file_url: currentFile.url
        };

        try {
            await axios.put(`http://localhost:8000/projectfiles/update/${currentFile.id}`, updatedFile);
            await requestDataProject();
        } catch (error) {
            console.error('Erro ao atualizar o arquivo:', error.message);
        }

    }

    return (
        <div className={styles.bodyVisualizacaoProjeto}>
            <Navbar />
            {projectExists ? (
                <div>
                    <div className={styles.container}>
                        {/*Título do Projeto*/}
                        <div className={styles.projectTitle}>
                            <h2>
                                <span dangerouslySetInnerHTML={{ __html: project?.title || 'Carregando...' }} />
                                {isEditing && (
                                    <FontAwesomeIcon
                                        icon={faPencilAlt}
                                        className={styles.pencilIcon}
                                        onClick={() => openModal('title', project?.title)}
                                    />
                                )}
                            </h2>
                        </div>

                        <div className={styles.gridLayout}>
                            {/* Começo Primeira Coluna da página */}
                            <div className={styles.column}>
                                {/*Botões de ações do Projeto */}
                                <AcaoParticipacaoProjeto isOwner={userParticipant} projectId={projectId} setIsEditing={setIsEditing} />

                                {/*Características do Projeto */}
                                <h3>
                                    Características do Projeto
                                    {isEditing && (
                                        <FontAwesomeIcon
                                            icon={faPencilAlt}
                                            className={styles.pencilIcon}
                                            onClick={openCharacteristicsModal}
                                        />
                                    )}
                                </h3>
                                <div className={styles.featureList}>
                                    <p>
                                        * Projeto: {project ? (
                                            project.status === true ? (
                                                'Aberto'
                                            ) : (
                                                'Fechado'
                                            )
                                        ) : (
                                            'Carregando...'
                                        )}
                                    </p>

                                    <p>* Número máximo de participantes: {project?.max_participants ? (
                                        <span dangerouslySetInnerHTML={{ __html: project.max_participants }} />
                                    ) : 'Carregando...'}</p>

                                    <p>* Áreas de Interesse: {project?.interest_area ? (
                                        <span dangerouslySetInnerHTML={{ __html: project.interest_area }} />
                                    ) : 'Carregando...'}</p>

                                    <p>
                                        * Criado: {project?.created_at ? (
                                            new Date(project.created_at).toLocaleDateString('pt-BR', {
                                                day: '2-digit',
                                                month: '2-digit',
                                                year: 'numeric',
                                            })
                                        ) : 'Carregando...'}
                                    </p>
                                </div>

                                {/*Participantes do Projeto */}
                                <h3>
                                    Participantes
                                    {isEditing && <FontAwesomeIcon icon={faPencilAlt} className={styles.pencilIcon} />}
                                </h3>
                                <div className={styles.participantList}>
                                    {Array.isArray(participantes) && participantes.length > 0 ? (
                                        participantes.map((item) => (
                                            <CardParticipante
                                                key={item.participant_id}
                                                id={item.user_id}
                                                nome={item.user_name}
                                                faculdade="CEUB - Asa norte"
                                                fotoUrl={item.user_image_url}
                                            />
                                        ))
                                    ) : (
                                        <p>Nenhum participante encontrado.</p> // Ou qualquer mensagem de feedback apropriada
                                    )}
                                </div>


                                {/*Atividades do Projeto */}
                                <h3>
                                    Atividades
                                    {isEditing && (
                                        <FontAwesomeIcon
                                            icon={faPencilAlt}
                                            className={styles.pencilIcon}
                                            onClick={() => openModal('activities', project?.activities)}
                                        />
                                    )}
                                </h3>
                                <div className={styles.activityText}>
                                    <p>{project?.activities ? (
                                        <span dangerouslySetInnerHTML={{ __html: project.activities }} />
                                    ) : 'Carregando...'}</p>
                                </div>

                                {/*Arquivos do Projeto */}
                                <h3>
                                    Arquivos
                                </h3>
                                <div className={styles.fileList}>
                                    {Array.isArray(projectFiles) && projectFiles.length > 0 ? (
                                        projectFiles.map((item) => (
                                            <CardArquivo
                                                key={item.id} // Adicione uma key para ajudar o React a identificar os elementos
                                                nome={item.name}
                                                url={item.file_url}
                                                isAdmin={userIsAdmin}
                                                isEditing={isEditing}
                                                action={() => openModalArquivo(item.name, item.id, item.url)} // Usando uma função de callback
                                            />
                                        ))
                                    ) : (
                                        <p>Nenhum arquivo encontrado.</p>
                                    )}

                                </div>
                            </div>

                            {/* Começo Segunda Coluna da página */}
                            <div className={styles.column}>

                                {/*Introduçaõ do Projeto*/}
                                <h3>
                                    Introdução do projeto
                                    {isEditing && (
                                        <FontAwesomeIcon
                                            icon={faPencilAlt}
                                            className={styles.pencilIcon}
                                            onClick={() => openModal('introduction', project?.introduction, true)}
                                        />
                                    )}
                                </h3>
                                <p>
                                    {project?.introduction ? (
                                        <span dangerouslySetInnerHTML={{ __html: project.introduction }} />
                                    ) : 'Carregando...'}
                                </p>

                                {/*Sobre o Projeto*/}
                                <h3>
                                    Sobre o projeto
                                    {isEditing && (
                                        <FontAwesomeIcon
                                            icon={faPencilAlt}
                                            className={styles.pencilIcon}
                                            onClick={() => openModal('about', project?.about)}
                                        />
                                    )}
                                </h3>
                                <p>
                                    {project?.about ? (
                                        <span dangerouslySetInnerHTML={{ __html: project.about }} />
                                    ) : 'Carregando...'}
                                </p>
                            </div>

                        </div>

                    </div>
                    <br />
                    {modalVisible && (
                        <EditModal
                            field={currentField}
                            value={currentValue}
                            onClose={closeModal}
                            onSave={handleSave}
                        />
                    )}
                    {characteristicsModalVisible && (
                        <EditCharacteristicsModal
                            field={currentField}
                            value={currentValue}
                            onClose={closeModal}
                            onSave={handleSaveCharacteristics}
                        />
                    )}
                    {modalArquivoVisible && (
                        <ModalArquivo
                            isOpen={modalArquivoVisible}
                            onClose={() => setModalArquivoVisible(false)}
                            onUpdate={handleUpdateArquivo}
                            initialName={currentFile.name}
                        />
                    )}

                </div>
            ) : (
                <div className={styles.bodyVisualizacaoProjeto}>
                    <div className={styles.container}>
                        <p>Projeto não encontrado.</p>


                    </div>

                </div>
            )}
        </div>
    );
};

export default VisualizacaoProjeto;
