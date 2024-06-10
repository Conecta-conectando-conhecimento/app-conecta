import React from 'react';
import { RiGraduationCapLine } from "react-icons/ri";
import style from "./CardFormacaoEquipe.module.css";

const CardFormacaoEquipe = ({ userName, campus, userId, fotoUrl }) => {
    return (
        <div className={style.card}>
            <div className={style.topo}>
                <img className={style.fotoPerfil} src={fotoUrl} alt="foto-perfil" />
                <div className={style.informacoesPerfil}>
                    <h2 className={style.userName}>{userName}</h2>
                    <div className={style.campus}>
                        <RiGraduationCapLine size={'2em'} />
                        <p>{campus}</p>
                    </div>
                    <div className={style.button}>
                    </div>
                </div>
            </div>
            <div className={style.skill}>
                <button className={`${style.commonButton} ${style.enviarConvite}`}>Enviar convite</button>
                {/*<Link to={`/userprofile/${userId}`}>
                    <button id="verPerfil" className={style.verPerfil}>Ver perfil</button>
                </Link>*/}
            </div>
        </div>
    );
}

export default CardFormacaoEquipe;
