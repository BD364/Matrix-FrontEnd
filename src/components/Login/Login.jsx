import React, { useState } from 'react';
import { useAuth } from '../../AuthContext';
import { useNavigate } from 'react-router-dom';
import './login.css';

const Login = () => {
  const { login } = useAuth();
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(credentials);
      setMessage('Successfully signed in!');
      setTimeout(() => {
        setMessage('');
        setIsLoading(false);
        closeModal();
        navigate('/');
      }, 2000);
    } catch (error) {
      setMessage(
        'Error logging in: ' +
          (error.response ? error.response.data : error.message)
      );
      setIsLoading(false);
    }
  };

  return (
    <div className='login-modal'>
      <form onSubmit={handleSubmit}>
        <input
          type='email'
          name='email'
          value={credentials.email}
          onChange={handleChange}
          placeholder='Email'
          className='login-input'
          autoComplete='off'
          required
        />
        <input
          type='password'
          name='password'
          value={credentials.password}
          onChange={handleChange}
          placeholder='Password'
          className='login-input'
          autoComplete='off'
          required
        />
        <button type='submit' className='login-button' disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      {message && <p className='login-message'>{message}</p>}
    </div>
  );
};

export default Login;
