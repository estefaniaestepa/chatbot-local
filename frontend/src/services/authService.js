import api from './api';

/**
 * Realiza una solicitud para registrar un nuevo usuario.
 * @param {string} username - Nombre de usuario.
 * @param {string} email - Correo electrónico.
 * @param {string} password - Contraseña.
 * @returns {Promise<Object>} Respuesta de la API.
 */
export const register = async (username, email, password) => {
  try {
    const response = await api.post('/auth/register', {
      username,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

/**
 * Realiza una solicitud para iniciar sesión.
 * @param {string} email - Correo electrónico.
 * @param {string} password - Contraseña.
 * @returns {Promise<Object>} Respuesta con el token JWT.
 */
export const login = async (email, password) => {
  try {
    const response = await api.post('/auth/login', {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

/**
 * Verifica si un token JWT es válido.
 * @param {string} token - Token JWT.
 * @returns {Promise<Object>} Respuesta de la API.
 */
export const verifyToken = async (token) => {
  try {
    const response = await api.get('/auth/verify-token', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

/**
 * Cierra sesión (elimina el token localmente).
 */
export const logout = () => {
  localStorage.removeItem('user');
};