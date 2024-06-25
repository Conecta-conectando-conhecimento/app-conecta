import React, { useEffect, useState } from 'react';
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import style from "./FeedUsuario.module.css";
import Navbar from '../../navbar/Navbar';
import CardUser from '../../CardUser/CardUser';
import { apiUrl } from '../../../controllers/api';

function FeedUsuario() {
    const { signout } = useAuth();
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 20; // Quantidade de usuários por página

    useEffect(() => {
        fetch(`${apiUrl}/user/all`)	
            .then(response => response.json())
            .then(data => {
                if (data.status && Array.isArray(data.data)) {
                    setUsers(data.data);
                } else {
                    console.error('API response is not as expected:', data);
                    setUsers([]);
                }
            })
            .catch(error => {
                console.error('Error fetching users:', error);
                setUsers([]);
            });
    }, []);

    // Calcula o índice inicial e final dos usuários para a página atual
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(users.length / usersPerPage);

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

    // Divide currentUsers into two columns dynamically
    const halfIndex = Math.ceil(currentUsers.length / 2);
    const firstColumnUsers = currentUsers.slice(0, halfIndex);
    const secondColumnUsers = currentUsers.slice(halfIndex);

    return (
        <div>
            <Navbar />
            <div className={style.bodyFeed}>

                <div className={style.container}>
                    <div className={style.pagination}>
                        <button onClick={handlePreviousPage}>Anterior</button>
                        {renderPagination()}
                        <button onClick={handleNextPage}>Próxima</button>
                    </div>
                    <div className={style.bodyCardsFeed}>
                        <div className={style.cardsContainer}>
                            <div className={style.column}>
                                {firstColumnUsers.length > 0 ? (
                                    firstColumnUsers.map(user => (
                                        <CardUser
                                            key={user.id}
                                            userName={user.user_name}
                                            campus={user.campus}
                                            userId={user.id}
                                            fotoUrl={user.user_image_path}
                                            textoAreaInteresse={user.textoAreaInteresse}
                                            textoSobre={user.sobre}
                                            showAddToProjectButton={false}
                                        />
                                    ))
                                ) : (
                                    <p>No users found</p>
                                )}
                            </div>
                            <div className={style.column}>
                                {secondColumnUsers.length > 0 ? (
                                    secondColumnUsers.map(user => (
                                        <CardUser
                                            key={user.id}
                                            userName={user.user_name}
                                            campus={user.campus}
                                            userId={user.id}
                                            fotoUrl={user.user_image_path}
                                            textoAreaInteresse={user.textoAreaInteresse}
                                            textoSobre={user.sobre}
                                            showAddToProjectButton={false}
                                        />
                                    ))
                                ) : (
                                    <p>No users found</p>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className={style.pagination}>
                        <button onClick={handlePreviousPage}>Anterior</button>
                        {renderPagination()}
                        <button onClick={handleNextPage}>Próxima</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FeedUsuario;
