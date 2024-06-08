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


        <div className={style.pageStyle}>
            <Navbar />
            <div className={style.bodyUserProfile}>
                <div className={style.capaUserProfile}>
                    <div className={style.capaNome}>
                        <div className={style.fotoDePerfil}>
                            <img src="https://xhnrrtnynnrvpduxhkbp.supabase.co/storage/v1/object/public/projectfiles/images/Ana%20Luisa.jpg" alt="Foto de Perfil" />
                        </div>
                        <div className={style.nomeDePerfil}>
                            <p>Ana Luisa Bonjardim Barros</p>
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
                                Projetos
                            </button>
                        </Link>
    
                    </div>
                    <div className={style.coluna2UserProfile}>
                        <div>
                            <label htmlFor="sobre">Sobre</label>
                            <div className={style.retanguloCinza}>
                                <p>Bem-vindo ao meu perfil! Sou uma estudante universitária apaixonada por tecnologia e inovação,
                                    atualmente cursando Análise e Desenvolvimento de Sistemas. Aqui, neste espaço dinâmico e colaborativo,
                                    compartilho meu percurso acadêmico e minhas experiências em projetos de desenvolvimento de software.
                                </p>
                                <br />
                                <p>  Colaboração e Networking:
                                    Estou sempre aberta a oportunidades de colaboração e networking com colegas de curso e profissionais
                                     da área de tecnologia. Acredito que juntos podemos alcançar resultados ainda mais significativos e
                                      impulsionar o avanço da tecnologia.

                                </p>
                                <br />
                                <p>Fique à Vontade para Conectar e Explorar:
                                    Este espaço não é apenas sobre mim, mas também sobre a comunidade de estudantes e profissionais que
                                     compartilham interesses similares. Sinta-se à vontade para conectar-se comigo, explorar meus projetos
                                      e compartilhar suas próprias experiências e ideias. Juntos, podemos construir um ambiente de aprendizado
                                       e crescimento mútuo.
                                </p>
                                <br />
                                <p>Obrigada por visitar meu perfil. Estou animada para interagir e colaborar com você nesta jornada de descobertas
                                     e inovações tecnológicas!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}
export default UserProfile;