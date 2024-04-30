import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './FeedProjetos.module.css';
import Navbar from '../../Navbar';
import Card from '../../CardProject';
import axios from 'axios';

const API_URL = 'http://localhost:8000/project/all';
const TOKEN = 'rx2MCEpi0tHffGn';
const ITEMS_PER_PAGE = 10;

function FeedProjetos() {
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchProjects = async () => {
        try {
            const response = await axios.get(API_URL, {
                headers: { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json' },
                params: { page: currentPage, limit: ITEMS_PER_PAGE },
            });
            setProjects(response.data.data);
        } catch (error) {
            console.error('Erro ao buscar os dados:', error);
        }
    };

    const fetchTotalCount = async () => {
        try {
            const totalCountResponse = await axios.get(API_URL, {
                headers: { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json' },
                params: { limit: 90000 }, // Valor alto para obter a contagem total
            });
            const totalCount = totalCountResponse.data.data.length;
            const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);
            setTotalPages(totalPages);
            setCurrentPage(1);
        } catch (error) {
            console.error('Erro ao buscar a contagem total:', error);
        }
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };
    

    const renderPagination = () => {
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <button key={i} onClick={() => handlePageChange(i)} className={currentPage === i ? `${style.activePage} activePage` : ''}>
                    {i}
                </button>
            );
        }
    
        return pages;
    };
       

    useEffect(() => {
        fetchTotalCount();
    }, []);

    useEffect(() => {
        fetchProjects();
    }, [currentPage]);

    return (
        <div className={style.bodyFeed}>
            <div className={style.container}>
                <Navbar />
                <div className={style.bodyCardsFeed}>
                    <div className={style.pagination}>
                        <button onClick={handlePreviousPage}>Anterior</button>
                        {renderPagination()}

                        <button onClick={handleNextPage}>Próxima</button>
                    </div>
                    <div>
                        {projects.map((item) => (
                            <Card key={item.id} projetoId={item.id} projetoNome={item.title} texto={item.about} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FeedProjetos;
