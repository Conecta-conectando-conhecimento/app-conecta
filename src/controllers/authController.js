import axios from 'axios';
import useAuth from '../hooks/useAuth'; // Importe o hook useAuth
import { apiUrl } from './api';

const AuthController = {
  registerUser: async (userData) => {
    try {
      const headers = {
        Authorization: `Bearer rx2MCEpi0tHffGn`,
        'Content-Type': 'application/json',
      };

      const response = await axios.post(`${apiUrl}/auth/register`, userData, { headers });
      return response.data;
    } catch (error) {
      console.error('Error ao tentar registrar usuário:', error);
      throw new Error('Failed to register user.', error);
    }
  },

  loginUser: async ({ email, password, signin }) => {
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, { email, password });
        
      const { token, email: userEmail, userName, userId } = response.data; 
      signin(userEmail, token, userName, userId); 
      return response.data;
    } catch (error) {
      console.error('Error logging in:', error);
      throw new Error('Failed to log in.');
    }
  },
};

export default AuthController;
