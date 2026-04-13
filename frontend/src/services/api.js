import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export const authAPI = {
  register: (userData) =>
    api.post('/auth/register', userData).then(res => res.data),

  login: (credentials) =>
    api.post('/auth/login', credentials).then(res => res.data),

  logout: () =>
    api.get('/auth/logout').then(res => res.data),

  checkAuth: () =>
    api.get('/auth/check').then(res => res.data),
};

export const tasksAPI = {
  getAll: () =>
    api.get('/notes').then(res => res.data),

  create: (taskData) =>
    api.post('/notes', taskData).then(res => res.data),

  update: (id, taskData) =>
    api.put(`/notes/${id}`, taskData).then(res => res.data),

  delete: (id) =>
    api.delete(`/notes/${id}`).then(res => res.data),
};
