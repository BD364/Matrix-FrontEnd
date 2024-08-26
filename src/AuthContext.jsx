import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

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

  const register = async (formData) => {
    try {
      const response = await api.post('/register', formData);
      console.log('Registration successful:', response.data);
    } catch (error) {
      console.error('Error registering:', error.response ? error.response.data : error.message);
    }
  };

  const login = async (credentials) => {
    try {
      const response = await api.post('/login', credentials);
      setToken(response.data.access_token);
      console.log('Login successful:', response.data);
    } catch (error) {
      console.error('Error logging in:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ register, login, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
