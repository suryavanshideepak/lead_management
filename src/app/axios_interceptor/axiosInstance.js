import axios from 'axios';
import { logoutAction, setToken } from '../auth/authSlice';

const API = axios.create({
  baseURL: 'https://your-api.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

API.interceptors.request.use(
  async (config) => {
    const { store } = await import('../store'); 
    const token = store.getState().auth.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const { store } = await import('../store');
        const refreshToken = store.getState().auth.refreshToken;
        
        const response = await axios.post('https://your-api.com/api/auth/refresh', { refreshToken });

        if (response.data?.token) {
          store.dispatch(setToken(response.data.token));
          originalRequest.headers.Authorization = `Bearer ${response.data.token}`;
          return API(originalRequest); 
        }
      } catch (refreshError) {
        const { store } = await import('../store'); 
        store.dispatch(logoutAction()); 
      }
    }

    return Promise.reject(error);
  }
);

export default API;
