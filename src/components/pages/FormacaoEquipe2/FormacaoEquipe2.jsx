import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './FormacaoEquipe2.module.css';
import Navbar from '../../Navbar';
import CardFormacaoEquipe from './components/CardFormacaoEquipe.jsx';

const FormacaoEquipe2 = () => {

    return (
        <div className={style.bodyFormacaoEquipe2}>
            <Navbar />
            <div className={style.container}>
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
                    fotoUrl="https://xhnrrtnynnrvpduxhkbp.supabase.co/storage/v1/object/public/projectfiles/images/Halycia.jpg" />
                    </div>
                </div>
            </div>
            );
}

            export default FormacaoEquipe2;