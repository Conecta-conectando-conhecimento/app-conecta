import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './FormacaoEquipe2.module.css';
import Navbar from '../../Navbar';
import CardFormacaoEquipe from './components/CardFormacaoEquipe.jsx';

function FormacaoEquipe2() {
    // const navigate = useNavigate();
    // const [perfil, setPerfil] = useState([]);
    // const [currentPage, setCurrentPage] = useState(1);
    // const [totalPages, setTotalPages] = useState(1);
    // const { user } = useAuth();
    // const ITEMS_PER_PAGE = 10;

    // const fetchPerfil = async () => {
    //     try {
    //         const { data } = await ProjectController.getAll(user.token, currentPage, ITEMS_PER_PAGE);
    //         setProjects(data);
    //     } catch (error) {
    //         console.error('Erro ao buscar os dados:', error);
    //     }
    // };

    // const fetchTotalCount = async () => {
    //     try {
    //         const totalCountResponse = await ProjectController.getAll(user.token, 1, 90000); // Usando a controller getAll para obter a contagem total
    //         const totalCount = totalCountResponse.data.length; // Ajuste para pegar o comprimento direto do array
    //         const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);
    //         setTotalPages(totalPages);
    //         setCurrentPage(1);
    //     } catch (error) {
    //         console.error('Erro ao buscar a contagem total:', error);
    //     }
    // };


    // const handlePageChange = (pageNumber) => {
    //     setCurrentPage(pageNumber);
    // };

    // const handlePreviousPage = () => {
    //     if (currentPage > 1) {
    //         setCurrentPage((prevPage) => prevPage - 1);
    //     }
    // };

    // const handleNextPage = () => {
    //     if (currentPage < totalPages) {
    //         setCurrentPage((prevPage) => prevPage + 1);
    //     }
    // };

    // const renderPagination = () => {
    //     const pages = [];
    //     for (let i = 1; i <= totalPages; i++) {
    //         pages.push(
    //             <button key={i} onClick={() => handlePageChange(i)} className={currentPage === i ? `${style.activePage} activePage` : ''}>
    //                 {i}
    //             </button>
    //         );
    //     }

    //     return pages;
    // };

    // useEffect(() => {
    //     fetchTotalCount();
    // }, []);

    // useEffect(() => {
    //     fetchPerfil();
    // }, [currentPage]);

    // // Função para remover as tags HTML de uma string
    // const stripHtml = (html) => {
    //     const div = document.createElement('div');
    //     div.innerHTML = html;
    //     return div.textContent || div.innerText || '';
    // };

    return (
        <div className={style.bodyFormacaoEquipe2}>
            <Navbar />
            <div className={style.container}>
                <div className={style.titulo}>
                    <h1>Formação de Equipe</h1>
                    <p>Veja como estes perfis correspondem às suas preferências:</p>
                </div>
                <div className={style.bodyCards}>
                    {/*<div className={style.pagination}>
                        <button onClick={handlePreviousPage}>Anterior</button>
                        {renderPagination()}
                        <button onClick={handleNextPage}>Próxima</button>
                    </div>
                   <div>
                        {projects.map((item) => (
                            <Card key={item.id} projetoId={item.id} projetoNome={stripHtml(item.title)} texto={stripHtml(item.introduction)} />
                        ))} 
                    </div>*/}
                    <CardFormacaoEquipe
                        userName="Halycia"
                        campus="Asa norte"
                        projetoId="1"
                        fotoUrl="https://xhnrrtnynnrvpduxhkbp.supabase.co/storage/v1/object/public/projectfiles/images/Halycia.jpg"
                        textoAreaInteresse="Enfermagem"
                        textoSobre="Gosto de enfermagem" />

                </div>
            </div>
        </div>
    );
}

export default FormacaoEquipe2;