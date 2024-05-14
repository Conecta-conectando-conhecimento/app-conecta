// controllers/UserController.js

import axios from 'axios';
import useAuth from '../hooks/useAuth'; // Importe o hook useAuth

const API_URL = 'http://localhost:8000/auth';
// Não é mais necessário definir ACCESS_TOKEN aqui

const UserController = {
  registerUser: async (userData) => {
    try {
      const { token } = useAuth(); // Obtenha o token do hook useAuth
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };
      
      const response = await axios.post(`${API_URL}/register`, userData, { headers });
      return response.data;
    } catch (error) {
      console.error('Error registering user:', error);
      throw new Error('Failed to register user.');
    }
  },

  loginUser: async ({ email, password, signin }) => {
    try {
      const response = await axios.post(`${API_URL}/login`, { email, password });
        
      const { token, email: userEmail, userName, userId } = response.data; 
      signin(userEmail, token, userName, userId); 
      return response.data;
    } catch (error) {
      console.error('Error logging in:', error);
      throw new Error('Failed to log in.');
    }
  },

  forgotPassword: async (email) => {
    try {
      const { token } = useAuth(); // Obtenha o token do hook useAuth
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };

      const response = await axios.post(`${API_URL}/forgot-password`, { email }, { headers });
      return response.data;
    } catch (error) {
      console.error('Error sending forgot password request:', error);
      throw new Error('Failed to send forgot password request.');
    }
  },

  resetPassword: async ({ email, newPassword, token }) => {
    try {
      const { token: userToken } = useAuth(); // Obtenha o token do hook useAuth
      const headers = {
        Authorization: `Bearer ${userToken}`,
        'Content-Type': 'application/json',
      };

      const response = await axios.post(`${API_URL}/reset-password`, { email, newPassword, token }, { headers });
      return response.data;
    } catch (error) {
      console.error('Error resetting password:', error);
      throw new Error('Failed to reset password.');
    }
  },
};

export default UserController;
