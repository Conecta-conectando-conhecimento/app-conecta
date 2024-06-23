// UserProfile.js
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from '../../navbar/Navbar';
import EditModal from './components/EditModal/EditModal';
import MyProjects from './components/MyProjects/MyProjects';
import { BiLogoLinkedinSquare, BiLogoInstagram } from "react-icons/bi";
import { CgMail } from "react-icons/cg";
import { RiGraduationCapLine } from "react-icons/ri";
import { MdOutlineEdit } from "react-icons/md";
import style from "./UserProfile.module.css";

// Funções de formatação de data
const formatDateToDDMMYYYY = (dateString) => {
    if (!dateString) return '';
    let date;
    if (dateString.includes('T')) {
        date = new Date(dateString);
    } else {
        const [year, month, day] = dateString.split('-');
        date = new Date(year, month - 1, day);
    }
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};

const formatDateToYYYYMMDD = (dateString) => {
    if (!dateString) return '';
    const [day, month, year] = dateString.split('/');
    return `${year}-${month}-${day}`;
};

const UserProfile = () => {
    const { userId } = useParams();
    const [user, setUser] = useState({
        id: '',
        email: '',
        cpf: '',
        name: '',
        user_name: '',
        birthday: '',
        password: '',
        campus: '',
        sobre: '',
        linkedin: '',
        instagram: '',
        user_image_path: ''
    });
    const [showEditModal, setShowEditModal] = useState(false);
    const [showProjectsModal, setShowProjectsModal] = useState(false);

    useEffect(() => {
        requestDataUser();
    }, []);

    const requestDataUser = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/user/${userId}`);
            const userData = response.data.data;
            
            userData.birthday = formatDateToDDMMYYYY(userData.birthday);

            setUser(userData);
            console.log('Dados do usuário recebidos:', userData);
        } catch (error) {
            console.error('Erro ao obter dados do usuário:', error.message);
        }
    };

    const handleEditButtonClick = () => {
        setShowEditModal(true);
    };

    const handleCloseEditModal = () => {
        setShowEditModal(false);
    };

    const handleProjectsButtonClick = () => {
        setShowProjectsModal(true);
    };

    const handleCloseProjectsModal = () => {
        setShowProjectsModal(false);
    };

    const handleSave = async (updatedUser) => {
        try {
            updatedUser.birthday = formatDateToYYYYMMDD(updatedUser.birthday);

            console.log('Dados enviados:', updatedUser);
            const response = await axios.put(`http://localhost:8000/user/update/${userId}`, updatedUser);
            console.log('Resposta do servidor:', response.data);
            if (response.data.status) {
                requestDataUser();
                setShowEditModal(false);
            } else {
                console.error('Erro ao atualizar usuário:', response.data.error);
            }
        } catch (error) {
            console.error('Erro ao salvar dados do usuário:', error.message);
        }
    };

    return (
        <div className={style.pageStyle}>
            <Navbar />
            <div className={style.bodyUserProfile}>
                <div className={style.capaUserProfile}>
                    <div className={style.capaNome}>
                        <div className={style.fotoDePerfil}>
                            <img src={user.user_image_path} alt="Foto de Perfil" />
                        </div>
                        <div className={style.nomeDePerfil}>
                            <p>{user.name ? user.name : 'Carregando...'}</p>
                        </div>
                    </div>
                    <div className={style.divbtnEditProfile}>
                        <button className={style.btnEditProfile} type="button" onClick={handleEditButtonClick}>
                            <MdOutlineEdit size={'3em'} />
                        </button>
                    </div>
                </div>
                <div className={style.blocoConteudo}>
                    <div className={style.coluna1UserProfile}>
                        <div className={style.linhaDeRedirecionamentoExterno}>
                            <a href={user.linkedin || "#"}>
                                <button className={style.btnLinkedIn} type="button">
                                    <BiLogoLinkedinSquare size={'2.5em'} />
                                </button>
                            </a>
                            <a href={user.instagram || "#"}>
                                <button className={style.btnInstagram} type="button">
                                    <BiLogoInstagram size={'2.5em'} />
                                </button>
                            </a>
                            <a href={`mailto:${user.email}`} >
                                <button className={style.btnGMail} type="button">
                                    <CgMail size={'2.5em'} />
                                </button>
                            </a>
                        </div>
                        <div className={style.Campus}>
                            <RiGraduationCapLine size={'2em'} />
                            <p>{user.campus ? user.campus : 'Carregando...'}</p>
                        </div>
                        <button className={style.btnMeusProjetos} type="button" onClick={handleProjectsButtonClick}>
                            Projetos
                        </button>
                    </div>
                    <div className={style.coluna2UserProfile}>
                        <div>
                            <label htmlFor="sobre">Sobre</label>
                            <div className={style.retanguloCinza}>
                                <p dangerouslySetInnerHTML={{ __html: user.sobre || 'Carregando...' }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <EditModal 
                show={showEditModal} 
                user={user} 
                onClose={handleCloseEditModal} 
                onSave={handleSave} 
            />
            <MyProjects 
                show={showProjectsModal} 
                userId={userId} 
                onClose={handleCloseProjectsModal} 
            />
        </div>
    );
};

export default UserProfile;
