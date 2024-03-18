import React, { useEffect, useRef } from 'react';
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import style from "./Feed.module.css";
import Navbar from '../../Navbar';

function Feed() {
    const { signout } = useAuth();
    const navigate = useNavigate();
    const carouselRef = useRef(null);

    let scrollInterval = null;

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
                <div className={style.secaoProjeto}>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non ad adipisci aliquid pariatur? Commodi expedita debitis consequuntur eligendi quisquam est veniam iste ipsa culpa voluptates eius, velit vero optio explicabo.</p>
                </div>
            </div>
        </div>
    );
}

export default Feed;
