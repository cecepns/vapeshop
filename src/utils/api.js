import axios from 'axios';

// const API_BASE_URL = 'https://api-inventory.isavralabel.com/vapeshop/api';
const API_BASE_URL = 'https://api-inventory.isavralabel.com/vapeshop/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Interceptor untuk menambahkan token ke setiap request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Products API
export const productsAPI = {
  getAll: (page = 1, limit = 10) => api.get(`/products?page=${page}&limit=${limit}`),
  getById: (id) => api.get(`/products/${id}`),
  create: (formData) => api.post('/products', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  update: (id, formData) => api.put(`/products/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  delete: (id) => api.delete(`/products/${id}`)
};

// Settings API
export const settingsAPI = {
  get: () => api.get('/settings'),
  update: (data) => api.put('/settings', data)
};

// Auth API
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  verify: () => api.get('/auth/verify')
};

// Contact API
export const contactAPI = {
  submit: (data) => api.post('/contact', data)
};

// Categories API
export const categoriesAPI = {
  getAll: () => api.get('/categories'),
  create: (data) => api.post('/categories', data),
  update: (id, data) => api.put(`/categories/${id}`, data),
  delete: (id) => api.delete(`/categories/${id}`)
};

export default api;