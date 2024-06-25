import axios from 'axios';
import { apiUrl } from './api';


const ProjectController = {
    getAll: async (accessToken, page, limit) => {
        const headers = {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        };
    
        try {
            const response = await axios.get(`${apiUrl}/project/all`, { 
                headers,
                params: { page, limit },
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching projects:', error);
            throw new Error('Failed to fetch projects.');
        }
    },

    getById: async (accessToken, projectId) => {
        const headers = {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        };

        try {
            const response = await axios.get(`${apiUrl}/project/${projectId}`, { headers });
            return response.data;
        } catch (error) {
            console.error('Error fetching project by ID:', error);
            throw new Error('Failed to fetch project by ID.');
        }
    },

    create: async (accessToken, projectData) => {
        const headers = {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        };

        try {
            const response = await axios.post(`${apiUrl}/project/create`, projectData, { headers });
            return response.data;
        } catch (error) {
            console.error('Error creating project:', error);
            throw new Error('Failed to create project.');
        }
    },

    update: async (accessToken, projectId, updatedData) => {
        const headers = {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        };

        try {
            const response = await axios.put(`${apiUrl}/project/update/${projectId}`, updatedData, { headers });
            return response.data;
        } catch (error) {
            console.error('Error updating project:', error);
            throw new Error('Failed to update project.');
        }
    },

    exclude: async (accessToken, projectId) => {
        const headers = {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        };

        try {
            const response = await axios.delete(`${apiUrl}/project/delete/${projectId}`, { headers });
            return response.data;
        } catch (error) {
            console.error('Error deleting project:', error);
            throw new Error('Failed to delete project.');
        }
    },
};

export default ProjectController;
