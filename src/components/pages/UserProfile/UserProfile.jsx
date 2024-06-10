import style from "./UserProfile.module.css";
import Navbar from "../../Navbar";
import { Link, useNavigate } from "react-router-dom";
import { BiLogoLinkedinSquare, BiLogoInstagram } from "react-icons/bi";
import { CgMail } from "react-icons/cg";
import { RiGraduationCapLine } from "react-icons/ri";
import { MdOutlineEdit } from "react-icons/md";
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";

const UserProfile = () => {

    const { userId } = useParams();
    const [user, setUser] = useState({})

    useEffect(() => {
        requestDataUser();
    }, [])

    const requestDataUser = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/user/${userId}`);
            setUser(response.data.data);
            console.log(response.data.data)
        } catch (error) {
            console.error('Erro ao obter dados do projeto:', error.message);
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
                        <Link to="/editprofile">
                            <button className={style.btnEditProfile} type="button" >
                                <MdOutlineEdit size={'3em'} />
                            </button>
                        </Link>
                    </div>

                </div>
                <div className={style.blocoConteudo}>
                    <div className={style.coluna1UserProfile}>

                        <div className={style.linhaDeRedirecionamentoExterno}>
                            <a href="/url linkedin ou api?">
                                <button className={style.btnLinkedIn} type="button">
                                    <BiLogoLinkedinSquare size={'2.5em'} />
                                </button>
                            </a>
                            <a href="/url linkedin ou api?">
                                <button className={style.btnInstagram} type="button">
                                    <BiLogoInstagram size={'2.5em'} />
                                </button>
                            </a>
                            <a href="/url linkedin ou api?">
                                <button className={style.btnGMail} type="button">
                                    <CgMail size={'2.5em'} />
                                </button>
                            </a>
                        </div>
                        <div className={style.Campus}>
                            <RiGraduationCapLine size={'2em'} />
                            <p>{user.campus ? user.campus : 'Carregando...'}</p>

                        </div>
                        <Link to="/PaginaMeusProjetos">
                            <button className={style.btnMeusProjetos} type="button">
                                Projetos
                            </button>
                        </Link>

                    </div>
                    <div className={style.coluna2UserProfile}>
                        <div>
                            <label htmlFor="sobre">Sobre</label>
                            <div className={style.retanguloCinza}>
                                <p>{user.sobre ? user.sobre : 'Carregando...'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}
export default UserProfile;