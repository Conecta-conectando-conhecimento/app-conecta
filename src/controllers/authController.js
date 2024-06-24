import axios from 'axios';
import useAuth from '../hooks/useAuth'; // Importe o hook useAuth

const API_URL = 'https://api-conecta-numi3q7l7-api-conecta.vercel.app';

const AuthController = {
  registerUser: async (userData) => {
    try {
      const headers = {
        Authorization: `Bearer rx2MCEpi0tHffGn`,
        'Content-Type': 'application/json',
      };

      const response = await axios.post(`${API_URL}/auth/register`, userData, { headers });
      return response.data;
    } catch (error) {
      console.error('Error ao tentar registrar usuário:', error);
      throw new Error('Failed to register user.', error);
    }
  },

  loginUser: async ({ email, password, signin }) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, { email, password });
        
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
