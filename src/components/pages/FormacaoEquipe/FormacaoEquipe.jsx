import Navbar from '../../navbar/Navbar';
import style from './FormacaoEquipe.module.css';
import axios from "axios";
import { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';

const FormacaoEquipe = () => {

    const { projectId } = useParams();
    const [interestAreas, setInterestAreas] = useState([]);

    useEffect(() => {
        requestInterestAreas();
    }, []);

    const requestInterestAreas = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/interestArea/all`);
            setInterestAreas(response.data.data);
        } catch (error) {
            console.error('Erro ao obter áreas de interesse:', error.message);
        }
    }

    const formTeam = async () => {

        // Fazer um get (no endpoint da tabela User_Areas) passando a quantidade de 
            // usuários(o endpoint deve ter um limit) e a área de interesse escolhida.
            // Retornar a quantidade de usuários conforme o limit e a área de interesse escolhida

        // Fazer um get para cada usuário obtido na pesquisa anterior, 
            //montar a lista de usuários escolhidos e listas na tela

    }


    return (
        <div className={style.bodyFormacaoEquipe}>
            <Navbar />
            <div className={style.container}>
                <h1>Formação de Equipe</h1>
                <h2>Que característica você deseja na sua equipe?</h2>
                <form id="formularioFormacaoEquipe" className={style.form}>
                    <label className={style.label}>Tamanho ideal da equipe</label>
                    <select id="tamanhoEquipe" className={style.select}>
                        <option value="1">1 pessoa</option>
                        <option value="2">2 pessoas</option>
                        <option value="3">3 pessoas</option>
                        <option value="4">4 pessoas</option>
                        <option value="5">5 pessoas</option>
                    </select>
                    <label className={style.label}>Área de interesse</label>
                    <select id="areaInteresse" className={style.select}>
                        {Array.isArray(interestAreas) && interestAreas.length > 0 ? (
                            interestAreas.map((item) => (
                                <option key={item.id} value={item.name}>{item.name}</option>
                            ))
                        ) : (
                            <option value="erro">enhuma área de interesse encontrada.</option>
                        )}
                    </select>
                    <div className={style.divBotao}>
                        <input type="button" value="Submeter" className={style.submit} onClick={() => { }}></input>
                        <input type="button" value="Resetar" className={style.reset}></input>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default FormacaoEquipe;