import React from 'react';
import { RiGraduationCapLine } from "react-icons/ri";
import style from "./CardUser.module.css";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from 'react-router-dom';

const CardUser = ({ userName, campus, userId, fotoUrl, textoAreaInteresse, textoSobre, onAddToProject }) => {
    // Garantir que textoSobre seja uma string
    const sobre = textoSobre || '';
    const maxChars = 300;
    const isLongText = sobre.length > maxChars;
    const displayedText = isLongText ? sobre.substring(0, maxChars) + '...' : sobre;

    const handleAddToProject = () => {
        const button = event.target; // obtém o botão que foi clicado
        button.disabled = true; // desativa o botão
        button.textContent = 'Adicionado'; // muda o texto do botão
        onAddToProject(userId);
    }

    return (
        <div className={style.card}>
            <div className={style.informacao}>
                <div className={style.topo}>
                    <img className={style.fotoPerfil} src={fotoUrl} alt="foto-perfil" />
                    <div className={style.informacoesPerfil}>
                        <h2 className={style.userName}>{userName}</h2>
                        <div className={style.campus}>
                            <RiGraduationCapLine size={'1.5em'} />
                            <p className={style.campusChar}>{campus}</p>
                        </div>
                    </div>
                    <div className={style.button}>
                        <button id="btnAddToProject" className={style.commonButton} onClick={() => handleAddToProject()}>Adicionar ao projeto</button>
                        <Link to={`/userprofile/${userId}`}>
                            <button id="verPerfil" className={`${style.commonButton} ${style.verPerfil}`}>Ver perfil</button>
                        </Link>
                    </div>
                </div>
                <div className={style.skill}>
                    <div className={style.informacoesTexto}>
                        <div className={style.subtitulo}>
                            <IoIosArrowDown size={'1rem'} className={style.ioios} />
                            <p>Sobre</p>
                        </div>
                        <p className={style.textoSubtitulo} dangerouslySetInnerHTML={{ __html: displayedText }}></p>
                        {isLongText && (
                            <Link to={`/userprofile/${userId}`} className={style.verMaisLink}>
                                Ver mais...
                            </Link>
                        )}
                    </div>
                    <div className={style.informacoesTexto}>
                        <div className={style.subtitulo}>
                            <IoIosArrowDown size={'1rem'} className={style.ioios} />
                            <p>Área de interesse</p>
                        </div>
                        <p className={style.textoSubtitulo}>{textoAreaInteresse}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CardUser;
