import React, { useState } from 'react';
import style from './SearchUser.module.css';
import axios from 'axios';
import { apiUrl } from '../../../../../controllers/api';

function SearchUser({ onUserSelect }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = async () => {
    
    // Requisição ao banco de dados
    try {
        const response = await axios.get(`${apiUrl}/user/name/${searchTerm}`);
        setUsers(response.data.data);
    } catch (error) {
        console.error('Erro ao obter dados de usuários:', error.message);
        if (error.response && error.response.status === 404) {
        }
    }
  };

  return (
    <div className={style.searchUser}>
      <div className={style.searchInputContainer}>
        <input
          type="text"
          className={style.input}
          placeholder="Buscar usuário pelo nome"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button type="button" className={style.searchButton} onClick={handleSearch}>Buscar</button>
      </div>
      <div className={style.userResults}>
        {users.map((user, index) => (
          <div key={index} className={style.userResult} onClick={() => onUserSelect(user)}>
            {user.name}
            <br/>
            {user.email}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchUser;
