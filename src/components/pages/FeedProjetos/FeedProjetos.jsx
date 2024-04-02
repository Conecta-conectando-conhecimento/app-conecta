import React, { useEffect, useRef, useState } from 'react';
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import style from "./FeedProjetos.module.css";
import { VscMortarBoard } from "react-icons/vsc";
import Navbar from '../../Navbar';
import Card from '../../CardProject';

function FeedProjetos() {
    const { signout } = useAuth();
    const navigate = useNavigate();
    const carouselRef = useRef(null);

    const [projects, setProjects] = useState([]);

    let scrollInterval = null;
    let projetoNome = "Promovendo a Conscientização e a Prevenção de Doenças";
    let texto = "Este projeto visa promover a conscientização e a prevenção de doenças por meio de ações de educação em saúde. Serão realizadas palestras, oficinas, distribuição de materiais informativos e campanhas de conscientização, abordando temas como alimentação saudável, exercícios físicos, prevenção de doenças infecciosas, saúde mental, entre outros. O projeto busca melhorar a qualidade de vida da população, incentivando o autocuidado e comportamentos saudáveis, e será avaliado para embasar futuras iniciativas.";
    let userfaculdade = "Asa Norte";
    let atividadeOnline = "Online";

    useEffect(() => {
        const fetchData = async() => {
            const result = await fetch('https://localhost:8000/project/all')
            .then(response => response.json())
            .then(data => data)

            setProjects(result)
        }
        fetchData()
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
                    <div>
                        {projects.map(item => (
                            <Card key={item.id} projetoNome={item.title} texto={item.about} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FeedProjetos;
