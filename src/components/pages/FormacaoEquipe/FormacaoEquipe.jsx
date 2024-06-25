import Navbar from '../../navbar/Navbar';
import style from './FormacaoEquipe.module.css';
import axios from "axios";
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CardUser from '../../CardUser/CardUser';
import { apiUrl } from '../../../controllers/api';

const FormacaoEquipe = () => {

    const { projectId } = useParams();
    const [interestAreas, setInterestAreas] = useState([]);
    const [users, setUsers] = useState([]);
    const [tamanhoEquipe, setTamanhoEquipe] = useState('');
    const [areaInteresse, setAreaInteresse] = useState('');

    useEffect(() => {
        requestInterestAreas();
    }, []);

    const requestInterestAreas = async () => {
        try {
            const response = await axios.get(`${apiUrl}/interestArea/all`);
            setInterestAreas(response.data.data);
        } catch (error) {
            console.error('Erro ao obter áreas de interesse:', error.message);
        }
    }

    const formTeam = async () => {
        try {
            // Fazendo a primeira requisição para obter os usuários com base na área de interesse e limite
            const response = await axios.get(`${apiUrl}/userAreas/all?interestAreaId=${areaInteresse}&limit=${tamanhoEquipe}`);
            const users = response.data.data;

            // Inicializando a lista de usuários escolhidos
            const chosenUsers = [];

            // Fazendo uma nova requisição para cada usuário obtido na pesquisa anterior
            for (let user of users) {
                try {
                    const userResponse = await axios.get(`${apiUrl}/user/${user.user_id}`); 
                    chosenUsers.push(userResponse.data.data);
                } catch (userError) {
                    console.error(`Erro ao obter dados do usuário ${user.userId}:`, userError);
                }
            }

            setUsers(chosenUsers);
            return chosenUsers;
        } catch (error) {
            console.error('Erro ao obter usuários:', error);
            return [];
        }
    };

    const addUserToTeam = async (userId) => {
        try {
            const response = await axios.post(`${apiUrl}/participants/create`,
                {
                    project_id: projectId,
                    user_id: userId
                }
            );
            console.log(`Participante adicionado com sucesso: ${response.data.data}`)
        } catch (error) {
            console.error(`Erro ao adicionar participante: ${error.message}`);
        }
    }


    return (
        <div className={style.bodyFormacaoEquipe}>
            <Navbar />
            <div className={style.container}>
                <h1>Formação de Equipe</h1>
                <h2>Que característica você deseja na sua equipe?</h2>
                <form id="formularioFormacaoEquipe" className={style.form}>
                    <label className={style.label}>Tamanho ideal da equipe</label>
                    <select
                        id="tamanhoEquipe"
                        className={style.select}
                        value={tamanhoEquipe}
                        onChange={(e) => setTamanhoEquipe(e.target.value)}
                    >
                        <option value={null}>Selecione</option>
                        <option value="1">1 pessoa</option>
                        <option value="2">2 pessoas</option>
                        <option value="3">3 pessoas</option>
                        <option value="4">4 pessoas</option>
                        <option value="5">5 pessoas</option>
                    </select>
                    <label className={style.label}>Área de interesse</label>
                    <select
                        id="areaInteresse"
                        className={style.select}
                        value={areaInteresse}
                        onChange={(e) => setAreaInteresse(e.target.value)}
                    >
                        <option value={null}>Selecione</option>
                        {Array.isArray(interestAreas) && interestAreas.length > 0 ? (
                            interestAreas.map((item) => (
                                <option key={item.id} value={item.id}>{item.name}</option>
                            ))
                        ) : (
                            <option value="erro">nenhuma área de interesse encontrada.</option>
                        )}
                    </select>

                    <div className={style.divBotao}>
                        <input
                            type="button"
                            value="Submeter"
                            className={style.submit}
                            onClick={() => formTeam()}
                        ></input>
                        <input type="button" value="Resetar" className={style.reset} onClick={() => {
                            setTamanhoEquipe('');
                            setAreaInteresse('');
                        }}></input>
                    </div>
                </form>
                <div className={style.results}>
                    <div className={style.cardContainer}>
                        {Array.isArray(users) && users.length > 0 ? (
                            users.map((item) => (
                                <CardUser
                                    userName={item.name}
                                    campus={item.campus}
                                    userId={item.id}
                                    fotoUrl={item.user_image_path}
                                    textoAreaInteresse="Tecnologia"
                                    textoSobre={item.sobre}
                                    onAddToProject={() => addUserToTeam(item.id)}
                                />
                            ))
                        ) : (
                            <p>Nenhum usuário encontrado.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FormacaoEquipe;