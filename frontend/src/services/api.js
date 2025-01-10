import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Interceptor para adjuntar el token JWT a cada solicitud.
 */
api.interceptors.request.use(
  (config) => {
    const user = localStorage.getItem('user');
    const token = user ? JSON.parse(user).access_token : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;