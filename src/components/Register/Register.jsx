import React, { useState } from 'react';
import { useAuth } from '../../AuthContext';
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(formData);
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
        />
        <input
          type='email'
          name='email'
          value={formData.email}
          onChange={handleChange}
          placeholder='Email'
          className='input'
        />
        <input
          type='text'
          name='phone_number'
          value={formData.phone_number}
          onChange={handleChange}
          placeholder='Phone Number'
          className='input'
        />
        <input
          type='password'
          name='password'
          value={formData.password}
          onChange={handleChange}
          placeholder='Password'
          className='input'
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
    </div>
  );
};

export default Register;
