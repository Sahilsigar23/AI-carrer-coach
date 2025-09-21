import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 
  (import.meta.env.PROD ? import.meta.env.VITE_BACKEND_URL || 'https://your-backend-url.onrender.com' : 'http://localhost:5000');

const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    console.log('API Request:', config.method?.toUpperCase(), config.baseURL + config.url, config.data);
    return config;
});

api.interceptors.response.use(
    (response) => {
        console.log('API Response:', response.status, response.config.url, response.data);
        return response;
    },
    (error) => {
        console.error('API Error:', error.response?.status, error.config?.url, error.response?.data);
        return Promise.reject(error);
    }
);

export const auth = {
    register: (data) => api.post('/api/auth/register', data),
    login: (data) => api.post('/api/auth/login', data),
    me: () => api.get('/api/auth/me'),
};

export const profile = {
    get: () => api.get('/api/profile'),
    update: (data) => api.post('/api/profile', data),
};

export const progress = {
    get: () => api.get('/api/progress'),
    create: (data) => api.post('/api/progress', data),
    update: (id, data) => api.put(`/api/progress/${id}`, data),
    delete: (id) => api.delete(`/api/progress/${id}`),
};

export const ai = {
    recommendations: (profileData) => api.post('/api/ai/recommendations', profileData),
    skillGap: (data) => api.post('/api/ai/skill-gap', data),
    roadmap: (data) => api.post('/api/ai/roadmap', data),
    skillGapRoadmap: (data) => api.post('/api/ai/skill-gap-roadmap', data),
    resumeAnalyze: (file) => {
        const form = new FormData();
        form.append('resume', file);
        return api.post('/api/ai/resume-analyze', form, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    },
};

export const chat = {
    sendMessage: (message) => api.post('/api/chat', { message }),
};

export const pdf = {
    downloadRoadmap: (data) => api.post('/api/pdf/roadmap', data, { responseType: 'blob' }),
};

export default api;
