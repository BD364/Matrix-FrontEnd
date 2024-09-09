import React, { useState } from 'react';
import { useAuth } from '../../AuthContext';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Navbar from '../Navbar/Navbar';
import Api from '../../utils/Api';
import Footer from '../Footer/Footer';


const CreateRoadKerb = () => {
  const { token, api } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [imageFile, setImageFile] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const onSubmit = async (data) => {
    if (!token || !api) {
      setMessage('Authentication or API setup is missing.');
      return;
    }

    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('price', data.price);
    formData.append('description', data.description);
    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      const { data } = await Api.api.post(Api.END_POINTS.CREATEROADKERB, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage('Road Kerb created successfully! Redirecting to home page...');
      setTimeout(() => navigate('/roadkerbs'), 2000);
    } catch (error) {
      setMessage(
        'Error creating road kerb: ' +
          (error.response ? error.response.data.message : error.message)
      );
    }
  };

  return (
    <div className='min-h-screen bg-gray-100'>
      <Navbar className='w-full fixed top-0 left-0 z-50 bg-white shadow-md' />

      <div className='max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-16'>
        <h2 className='text-3xl font-semibold mb-6 text-center'>
          Create New Road Kerb
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} encType='multipart/form-data'>
          <div className='mb-4'>
            <input
              type='text'
              {...register('title', { required: 'Title is required' })}
              placeholder='Road Kerb Title'
              className='w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            {errors.title && (
              <p className='text-red-500'>{errors.title.message}</p>
            )}
          </div>

          <div className='mb-4 relative'>
            <input
              type='file'
              id='file-upload'
              onChange={handleImageChange}
              className='absolute inset-0 opacity-0 cursor-pointer'
            />
            <label
              htmlFor='file-upload'
              className='block w-full p-3 border border-gray-300 rounded-md bg-gray-100 text-blue-500 text-center cursor-pointer hover:bg-gray-200'
            >
              Choose file
            </label>
          </div>

          <div className='mb-4'>
            <input
              type='number'
              {...register('price', { required: 'Price is required' })}
              placeholder='Price'
              className='w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            {errors.price && (
              <p className='text-red-500'>{errors.price.message}</p>
            )}
          </div>

          <div className='mb-4'>
            <textarea
              {...register('description')}
              placeholder='Description'
              className='w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          <button
            type='submit'
            className='w-full py-3 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 transition-colors'
          >
            Create Road Kerb
          </button>
        </form>
        {message && <p className='mt-4 text-center text-green-500'>{message}</p>}
      </div>
      <Footer/>
    </div>
  );
};

export default CreateRoadKerb;
