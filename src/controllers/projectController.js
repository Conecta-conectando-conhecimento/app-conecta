import axios from 'axios';

const API_URL = 'http://localhost:8000/project';

const ProjectController = {
    getAll: async (accessToken, page, limit) => {
        const headers = {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        };
    
        try {
            const response = await axios.get('http://localhost:8000/project/all', { // Ajuste da rota
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
            const response = await axios.get(`${API_URL}/${projectId}`, { headers });
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
            const response = await axios.post(`${API_URL}/create`, projectData, { headers });
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
            const response = await axios.put(`${API_URL}/update/${projectId}`, updatedData, { headers });
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
            const response = await axios.delete(`${API_URL}/delete/${projectId}`, { headers });
            return response.data;
        } catch (error) {
            console.error('Error deleting project:', error);
            throw new Error('Failed to delete project.');
        }
    },
};

export default ProjectController;
