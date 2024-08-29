import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [refreshToken, setRefreshToken] = useState(
    localStorage.getItem('refreshToken') || null
  );

  const api = axios.create({
    baseURL: 'http://localhost:5000/',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  api.interceptors.request.use(
    (config) => {
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (
        error.response &&
        error.response.status === 401 &&
        refreshToken &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;

        try {
          const refreshResponse = await axios.post(
            'http://localhost:5000/refresh',
            { refresh_token: refreshToken }
          );

          const newAccessToken = refreshResponse.data.access_token;
          setToken(newAccessToken);
          localStorage.setItem('token', newAccessToken);

          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

          return api(originalRequest);
        } catch (refreshError) {
          console.error(
            'Error refreshing token:',
            refreshError.response
              ? refreshError.response.data
              : refreshError.message
          );
          localStorage.removeItem('token');
          localStorage.removeItem('refreshToken');
        }
      }

      return Promise.reject(error);
    }
  );

  const register = async (formData) => {
    try {
      const response = await api.post('/register', formData);
      console.log('Registered successfully:', response.data);
    } catch (error) {
      console.error(
        'Error registering:',
        error.response ? error.response.data : error.message
      );
    }
  };

  const login = async (credentials) => {
    try {
      const response = await api.post('/login', credentials);
      setToken(response.data.access_token);
      setRefreshToken(response.data.refresh_token);
      localStorage.setItem('token', response.data.access_token);
      localStorage.setItem('refreshToken', response.data.refresh_token);
      console.log('Login successful:', response.data);
    } catch (error) {
      console.error(
        'Error logging in:',
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <AuthContext.Provider value={{ register, login, token, api }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
