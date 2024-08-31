import React, { createContext, useState, useContext } from 'react';
import Api from './utils/Api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [refreshToken, setRefreshToken] = useState(
    localStorage.getItem('refreshToken') || null
  );

  const register = async (formData) => {
    try {
      const response = await Api.api.post(Api.END_POINTS.REGISTER, formData);
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
      const response = await Api.api.post(Api.END_POINTS.LOGIN, credentials);
      setToken(response.data.access_token);
      setRefreshToken(response.data.refresh_token);
      localStorage.setItem('token', response.data.access_token);
      localStorage.setItem('refreshToken', response.data.refresh_token);
      // console.log('Access:', response.data.access_token);
      // console.log('Refresh:', response.data.refresh_token);
    } catch (error) {
      console.error(
        'Error logging in:',
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <AuthContext.Provider value={{ register, login, token, api: Api.api }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
