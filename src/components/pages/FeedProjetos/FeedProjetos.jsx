import React, { useEffect, useRef } from 'react';
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import style from "./FeedProjetos.module.css";
import { VscMortarBoard } from "react-icons/vsc";
import Navbar from '../../Navbar';

function FeedProjetos() {
    const { signout } = useAuth();
    const navigate = useNavigate();
    const carouselRef = useRef(null);

    let scrollInterval = null;
    let projetoNome = "Promovendo a Conscientização e a Prevenção de Doenças";
    let texto = "Este projeto visa promover a conscientização e a prevenção de doenças por meio de ações de educação em saúde. Serão realizadas palestras, oficinas, distribuição de materiais informativos e campanhas de conscientização, abordando temas como alimentação saudável, exercícios físicos, prevenção de doenças infecciosas, saúde mental, entre outros. O projeto busca melhorar a qualidade de vida da população, incentivando o autocuidado e comportamentos saudáveis, e será avaliado para embasar futuras iniciativas.";
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
        window.addEventListener('mouseup', () => {
            clearInterval(scrollInterval);
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
                        <div className={style.informacoesTexto}>
                            <p className={style.projetoNome}>{projetoNome}</p>
                            <p className={style.texto}>{texto}</p>
                        </div>
                        <div className={style.colunaImagemPerfilBotaoVerMais}>
                            <button id="verMais" className={style.botaoVerMais}>Ver mais +</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FeedProjetos;
