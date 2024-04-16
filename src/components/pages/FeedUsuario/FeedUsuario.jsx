import React, { useEffect, useRef } from 'react';
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import style from "./FeedUsuario.module.css";
import { VscMortarBoard } from "react-icons/vsc";
import Navbar from '../../Navbar';

function FeedUsuario() {
    const { signout } = useAuth();
    const navigate = useNavigate();
    const carouselRef = useRef(null);

    let scrollInterval = null;
    let userNome = "Genival Ramos de Oliveira";
    let texto = "Dedicado estudante de Medicina. Minha paixão pela área da saúde me impulsiona a buscar constantemente conhecimento e aprimorar minhas habilidades. Com uma postura atenciosa e empática, sou admirado por meus colegas de classe. Minha determinação e comprometimento são evidentes em minha rotina de estudos e participação ativa em estágios.";
    let userfaculdade = "Asa Norte";
    let atividadeOnline = "Online";

    useEffect(() => {
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const carousel = carouselRef.current;

        // Função para rolar para a esquerda
        const scrollLeft = () => {
            carousel.scrollLeft -= 10; // Altere o valor conforme necessário
        };

        // Função para rolar para a direita
        const scrollRight = () => {
            carousel.scrollLeft += 10; // Altere o valor conforme necessário
        };

        // Adicione evento de mousedown para o botão "Anterior"
        prevBtn.addEventListener('mousedown', () => {
            scrollInterval = setInterval(scrollLeft, 50); // Altere o valor do intervalo conforme necessário
        });

        // Adicione evento de mouseup para o botão "Anterior"
        prevBtn.addEventListener('mouseup', () => {
            clearInterval(scrollInterval);
        });

        // Adicione evento de mousedown para o botão "Próximo"
        nextBtn.addEventListener('mousedown', () => {
            scrollInterval = setInterval(scrollRight, 50); // Altere o valor do intervalo conforme necessário
        });

        // Adicione evento de mouseup para o botão "Próximo"
        nextBtn.addEventListener('mouseup', () => {
            clearInterval(scrollInterval);
        });

        // Limpar o intervalo se o mouse for solto fora do botão
        clearInterval(scrollInterval);
        window.addEventListener('mouseup', () => {
        });
    }, []);

    return (
        <div className={style.bodyFeed}>
            <div className={style.container}>
                <Navbar />
                <div className={style.sectionMain}>
                    <button id="prevBtn"><img src={"assets/Feed/botaoEsquerda.svg"} alt="" /></button>
                    <div className={style.circlesCarrousel} ref={carouselRef}>
                        <div className={style.carousel_slide}>
                            <img src={'/assets/Feed/CircleTI.png'} alt="alguma imagem" />
                        </div>
                        <div className={style.carousel_slide}>
                            <img src={'/assets/Feed/CircleTI.png'} alt="alguma imagem" />
                        </div>
                        <div className={style.carousel_slide}>
                            <img src={'/assets/Feed/CircleTI.png'} alt="alguma imagem" />
                        </div>
                        <div className={style.carousel_slide}>
                            <img src={'/assets/Feed/CircleTI.png'} alt="alguma imagem" />
                        </div>
                        <div className={style.carousel_slide}>
                            <img src={'/assets/Feed/CircleTI.png'} alt="alguma imagem" />
                        </div>
                        <div className={style.carousel_slide}>
                            <img src={'/assets/Feed/CircleTI.png'} alt="alguma imagem" />
                        </div>
                        <div className={style.carousel_slide}>
                            <img src={'/assets/Feed/CircleTI.png'} alt="alguma imagem" />
                        </div>
                        <div className={style.carousel_slide}>
                            <img src={'/assets/Feed/CircleTI.png'} alt="alguma imagem" />
                        </div>
                        <div className={style.carousel_slide}>
                            <img src={'/assets/Feed/CircleTI.png'} alt="alguma imagem" />
                        </div>
                    </div>
                    <button id="nextBtn"> <img src={"assets/Feed/botaoDireita.svg"} alt="" /> </button>
                </div>
                <div className={style.bodyCardsFeed}>
                    {/*espacamento entre cards */}
                    <div className={style.card}>
                        <div className={style.colunaImagemPerfilBotaoVerMais}>
                            <img className={style.imagemPerfil} src="../../../public/assets/maos.jpg" alt="foto-perfil" />
                            <button id="verMais" className={style.botaoVerMais}>Ver mais +</button>
                        </div>
                        <div className={style.informacoesTexto}>
                            <p className={style.userNome}>{userNome}</p>
                            <p className={style.texto}>{texto}</p>
                            <div className={style.faculdade}>
                                <p className={style.nomeFaculdade}><VscMortarBoard className={style.iconFaculdade}/>Ceub - {userfaculdade}</p>
                                <p>Atividade: {atividadeOnline}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FeedUsuario;
