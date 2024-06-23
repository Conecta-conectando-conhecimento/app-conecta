import React from 'react';
import { RiGraduationCapLine } from "react-icons/ri";
import style from "./CardUser.module.css";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from 'react-router-dom';

const CardFormacaoEquipe = ({ userName, campus, userId, fotoUrl, textoAreaInteresse, textoSobre }) => {
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
                        <button className={`${style.commonButton} ${style.enviarConvite}`}>Enviar convite</button>
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
                        <p className={style.textoSubtitulo}>{textoSobre}</p>
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

export default CardFormacaoEquipe;
