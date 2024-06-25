import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BiBookmark, BiSolidBookmark } from 'react-icons/bi';
import axios from 'axios';
import style from "./pages/FeedProjetos/FeedProjetos.module.css";
import { apiUrl } from '../controllers/api';

const Card = ({ projetoNome, texto, projetoId, userId, isCreationCard }) => {
    const [isBookmarked, setIsBookmarked] = useState(false);

    useEffect(() => {
        if (isCreationCard) return; // Não verificar bookmark para card de criação

        if (!userId) {
            console.error('userId is undefined');
            return;
        }

        const checkIfBookmarked = async () => {
            try {
                const response = await axios.get(`${apiUrl}/favorite/user/${userId}`);
                const savedProjects = response.data.data; // Acessa o array dentro da chave 'data'
                if (Array.isArray(savedProjects)) {
                    const isSaved = savedProjects.some(project => project.project_id === projetoId);
                    setIsBookmarked(isSaved);
                } else {
                    console.error('A resposta não contém um array esperado:', response.data);
                }
            } catch (error) {
                console.error('Erro ao verificar se o projeto está salvo:', error.message);
            }
        };

        checkIfBookmarked();
    }, [projetoId, userId, isCreationCard]);

    const handleBookmarkClick = async () => {
        if (isCreationCard) return; // Não permitir bookmark para card de criação

        if (!userId) {
            console.error('userId is undefined');
            return;
        }

        try {
            if (isBookmarked) {
                // Remover dos favoritos
                await axios.delete(`${apiUrl}/favorite/delete`, {
                    data: { user_id: userId, project_id: projetoId } // Passa o userId no corpo da requisição
                });
                setIsBookmarked(false);
            } else {
                // Adicionar aos favoritos
                await axios.post(`${apiUrl}/favorite/create`, {
                    user_id: userId,
                    project_id: projetoId
                });
                setIsBookmarked(true);
            }
        } catch (error) {
            console.error('Erro ao salvar/remover o projeto:', error.message);
        }
    };

    return (
        <div className={style.card}>
            <div className={style.informacoesTexto}>
                <div className={style.bookmarkContainer}>
                    {!isCreationCard && (
                        <span onClick={handleBookmarkClick} title='Clique para adicionar ou remover dos favoritos'>
                            {isBookmarked ? <BiSolidBookmark /> : <BiBookmark />}
                        </span>
                    )}
                    <p className={style.projetoNome}>{projetoNome}</p>
                </div>
                <p className={style.texto}>{texto}</p>
            </div>
            <div className={style.colunaImagemPerfilBotaoVerMais}>
                <Link to={isCreationCard ? "/registerproject" : `/visualizacaoprojeto/${projetoId}`} className={style.linkNaoSublinhado}>
                    <button id="verMais" className={style.botaoVerMais}>Ver mais +</button>
                </Link>
            </div>
        </div>
    );
}

export default Card;
