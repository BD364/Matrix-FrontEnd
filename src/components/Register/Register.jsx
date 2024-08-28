import React, { useState } from 'react';
import { useAuth } from '../../AuthContext';
import { useNavigate } from 'react-router-dom';
import './register.css';

const Register = () => {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone_number: '',
    password: '',
    is_admin: false,
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData);
      setMessage('Registration successful! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000); 
    } catch (error) {
      setMessage('Error registering: ' + (error.response ? error.response.data : error.message));
    }
  };

  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='username'
          value={formData.username}
          onChange={handleChange}
          placeholder='Username'
          className='input'
          required
        />
        <input
          type='email'
          name='email'
          value={formData.email}
          onChange={handleChange}
          placeholder='Email'
          className='input'
          required
        />
        <input
          type='text'
          name='phone_number'
          value={formData.phone_number}
          onChange={handleChange}
          placeholder='Phone Number'
          className='input'
          required
        />
        <input
          type='password'
          name='password'
          value={formData.password}
          onChange={handleChange}
          placeholder='Password'
          className='input'
          required
        />
        <div className='checkbox-container'>
          <input
            type='checkbox'
            name='is_admin'
            checked={formData.is_admin}
            onChange={handleChange}
          />
          <label>Admin</label>
        </div>
        <button type='submit'>Register</button>
      </form>
      <p>{message}</p> 
      <button onClick={() => navigate('/login')} className='login-button'>
        Already have an account? Login
      </button>
    </div>
  );
};

export default Register;
