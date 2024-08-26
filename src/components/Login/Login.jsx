import React, { useState } from 'react';
import { useAuth } from '../../AuthContext';
import api from '../../api';
import './login.css';
const Login = () => {
  const { login } = useAuth();
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/login', credentials);
      const token = response.data.access_token;
  
      if (token) {
        localStorage.setItem('token', token);
        console.log('Token stored:', token);
      }
    } catch (error) {
      console.error('Error logging in:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
        <input
          type='email'
          name='email'
          value={credentials.email}
          onChange={handleChange}
          placeholder='Email'
          className='input'
        />
        <input
          type='password'
          name='password'
          value={credentials.password}
          onChange={handleChange}
          placeholder='Password'
          className='input'
        />
        <button type='submit'>Login</button>
      </form>
    </div>
  );
};

export default Login;
