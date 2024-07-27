// src/services/api.js

import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8082/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to include the auth token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export const userService = {
    login: (credentials) => api.post('/auth/login', credentials),
    signup: (userData) => api.post('/auth/signup', userData),
    logout: () => api.post('/auth/logout'),
    // Add other user-related API calls
};

export const mcqService = {
    getMCQs: () => api.get('/mcqs'),
    createMCQ: (mcqData) => api.post('/mcqs', mcqData),
    updateMCQ: (id, mcqData) => api.put(`/mcqs/${id}`, mcqData),
    deleteMCQ: (id) => api.delete(`/mcqs/${id}`),
};

export const gameService = {
    createGame: () => api.post('/games'),
    joinGame: (gameId) => api.post(`/games/${gameId}/join`),
    getGamesList: () => api.get('/games'),
    submitAnswer: (gameId, answerId) => api.post(`/games/${gameId}/submit`, { answerId }),
    getGameResults: (gameId) => api.get(`/games/${gameId}/results`),
};

export const lobbyService = {
    getLobbyStatus: () => api.get('/lobby'),
    // Add other lobby-related API calls
};