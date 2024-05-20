import style from "./UserProfile.module.css";
import Navbar from "../../Navbar";
import { Link, useNavigate } from "react-router-dom";
import { BiLogoLinkedinSquare, BiLogoInstagram } from "react-icons/bi";
import { CgMail } from "react-icons/cg";
import { RiGraduationCapLine } from "react-icons/ri";
import { MdOutlineEdit } from "react-icons/md";
import styled from "styled-components";


const campus = 'Asa Norte'

const sobreUserProfile = ''


const UserProfile = () => {

    const navigate = useNavigate();

    function downloadFile() {
        var fileUrl = "../assets/Curriculo.jpg";
        // ver como vai fazer pra puxar no banco o arquivo do curriculo
        var link = document.createElement('a');

        link.href = fileUrl;
        link.download = 'Curriculo.jpg';

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }


    return (
        <>
            <Navbar />
            <div style={style.pageStyle}>
                <div className={style.bodyUserProfile}>
                    <div className={style.capaUserProfile}>
                        <div className={style.capaNome}>
                            <div className={style.fotoDePerfil}>
                                <img src="/assets/userProfile_fotoDePerfil.jpg" alt="Foto de Perfil" />
                            </div>
                            <div className={style.nomeDePerfil}>
                                <p>Maria_Fernanda</p>
                            </div>
                        </div>

                        <div className={style.divbtnEditProfile}>
                            <Link to="/editprofile">
                                <button className={style.btnEditProfile} type="button" onClick={() => navigate("/editprofile")}>
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
                                <p>{campus}</p>
                                
                            </div>
                            <Link to="/PaginaMeusProjetos">
                                <button className={style.btnMeusProjetos} type="button">
                                    Meus projetos
                                </button>
                            </Link>
                            
                            {/*Descobrir como colocar um pdf pra baixar no pc dos outros kkkk */}
                            <button className={style.btnUploadCurriculo} onClick={(e) => downloadFile()}>Download Arquivo</button>
                        </div>
                        <div className={style.coluna2UserProfile}>
                            <div>
                                <label htmlFor="sobre">Sobre</label>
                                <div className={style.retanguloCinza}>
                                    <p>{sobreUserProfile}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default UserProfile;