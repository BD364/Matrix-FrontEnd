import React, { useState } from 'react';
import { useAuth } from '../../AuthContext';
import { useForm } from 'react-hook-form';

const Login = ({ onSuccess }) => {
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await login(data);
      setMessage('Successfully signed in!');
      setTimeout(() => {
        setMessage('');
        setIsLoading(false);
        onSuccess();
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
    <div className='w-full'>
      <h1 className='text-3xl font-bold text-center text-gray-800 mb-2'>
        Log in
      </h1>
      <h2 className='text-lg font-semibold text-center text-gray-600 mb-6'>
        Access your account
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        <div>
          <input
            type='email'
            {...register('email', { required: 'Email is required' })}
            placeholder='Email'
            className='w-full p-3 bg-gray-50 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500'
          />
          {errors.email && (
            <p className='text-red-500 text-sm mt-1'>
              {errors.email.message}
            </p>
          )}
        </div>
        <div className='relative'>
          <input
            type={showPassword ? 'text' : 'password'}
            {...register('password', { required: 'Password is required' })}
            placeholder='Password'
            className='w-full p-3 bg-gray-50 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500'
          />
          <button
            type='button'
            className='absolute inset-y-0 right-0 pr-3 flex items-center'
            onClick={() => setShowPassword(!showPassword)}
          >
            <svg
              className={`w-5 h-5 ${showPassword ? 'text-blue-500' : 'text-gray-500'}`}
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              aria-hidden='true'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d={`M12 8.25a3.75 3.75 0 1 0 0 7.5m0-7.5A9.75 9.75 0 1 0 12 21.75a9.75 9.75 0 0 0 0-13.5z`}
              />
            </svg>
          </button>
          {errors.password && (
            <p className='text-red-500 text-sm mt-1'>
              {errors.password.message}
            </p>
          )}
        </div>
        <button
          type='submit'
          className={`w-full py-3 text-white font-semibold rounded-lg transition-colors ${
            isLoading ? 'bg-gray-600' : 'bg-blue-500 hover:bg-blue-600'
          }`}
          disabled={isLoading}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      {message && (
        <p className='text-center text-green-500 mt-4'>{message}</p>
      )}
    </div>
  );
};

export default Login;
