import axios from 'axios';
import apiJSON from '../config/config.json'

const api_url = apiJSON.api_url;

const handleLogout = () => {
  localStorage.clear();
  window.location.reload();
};

export const getToken = async (user, pass) => {
  try {
    const response = await axios.post(
      `${api_url}api/token/`,
      {
        username: user,
        password: pass,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true
      }
    );

    const token = response.data;
    return token;
  } catch (error) {
    console.error('Error al obtener el token:', error);
    return null;
  }
};

export const refreshToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) return null;

  try {
    const response = await axios.post(
      `${api_url}api/token/refresh/`,
      { 
        refresh: refreshToken 
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true
      }
    );

    const data = response.data;
    localStorage.setItem('token', data.access);
    localStorage.setItem('refreshToken', data.refresh);
    return data;
  } catch (error) {
    console.error('Error al refrescar el token:', error);

    if (error.response?.status === 401) {
      console.warn('Token inválido. Cerrando sesión.');
      handleLogout();
    }

    return null;
  }
}

export const logout = async () => {

  const refreshToken = localStorage.getItem('refreshToken');
  const token = localStorage.getItem('token');

  try {
    await axios.post(
      `${api_url}api/logout/`,
      { refresh: refreshToken },
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        withCredentials: true
      }
    );
    handleLogout()
  }
  catch (error) {
    console.error('Error al cerrar sesión:', error);
    handleLogout();
  }
}


export const getMessages = async ({ limit = 200, offset = 0, filters = {} } = {}) => {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const response = await axios.get(
      `${api_url}api/message/`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        params:{
          limit,
          offset, 
          ...filters
        },
        withCredentials: true
      }
    );

    return response.data;

  } catch (error) {
    console.error('Error al obtener los mensajes:', error);
    return null;
  }
}