import React, { useState, useEffect } from 'react';
import { useAuth } from '../../AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Navbar from '../Navbar/Navbar';
import Api from '../../utils/Api';
import Footer from '../Footer/Footer';


const UpdatePavingBlock = () => {
  const { postId } = useParams();
  const { api, token } = useAuth();
  const [pavingBlockData, setPavingBlockData] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      price: '',
      description: '',
    },
  });

  useEffect(() => {
    const fetchPavingBlock = async () => {
      try {
        const { data } = await Api.api.get(
          Api.END_POINTS.SINGLEPAVINGBLOCK(postId),
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPavingBlockData(data);
        setValue('title', data.title);
        setValue('price', data.price);
        setValue('description', data.description);
      } catch (error) {
        console.error(
          'Error fetching paving block:',
          error.response ? error.response.data : error.message
        );
        setMessage('Error fetching paving block.');
      }
    };

    fetchPavingBlock();
  }, [postId, api, token, setValue]);

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('price', data.price);
    formData.append('description', data.description);
    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      const response = await Api.api.put(
        Api.END_POINTS.UPDATEPAVINGBLOCK(postId),
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      if (response?.data) {
        setPavingBlockData(response.data.pavingblock);
        setMessage('Paving block updated successfully! Redirecting...');
        setTimeout(() => navigate('/pavingblocks'), 2000);
      } else {
        setMessage('Unexpected response format.');
      }
    } catch (error) {
      setMessage(
        'Error updating paving block: ' +
          (error.response ? error.response.data : error.message)
      );
    }
  };

  return (
    <div className='bg-gray-100 min-h-screen '>
      <Navbar className='w-full fixed top-0 left-0 z-50 bg-white shadow-md' />
      <div className='pt-16 max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg'>
        <h2 className='text-2xl font-semibold mb-4'>Update Paving Block</h2>
        {message && <p className='mb-4 text-red-500'>{message}</p>}
        <form onSubmit={handleSubmit(onSubmit)} encType='multipart/form-data'>
          <div className='mb-4'>
            <input
              type='text'
              {...register('title', { required: 'Title is required' })}
              placeholder='Block Title'
              className='w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            {errors.title && (
              <p className='text-red-500'>{errors.title.message}</p>
            )}
          </div>
          <div className='mb-4'>
            <input
              type='number'
              {...register('price', { required: 'Price is required' })}
              placeholder='Block Price'
              className='w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            {errors.price && (
              <p className='text-red-500'>{errors.price.message}</p>
            )}
          </div>
          <div className='mb-4'>
            <textarea
              {...register('description')}
              placeholder='Block Description'
              className='w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>
          <div className='mb-4 relative'>
            <input
              type='file'
              id='file-upload'
              onChange={handleFileChange}
              className='absolute inset-0 opacity-0 cursor-pointer'
            />
            <label
              htmlFor='file-upload'
              className='block w-full p-3 border border-gray-300 rounded-md bg-gray-100 text-blue-500 text-center cursor-pointer hover:bg-gray-200'
            >
              Choose file
            </label>
          </div>
          <button
            type='submit'
            className='w-full py-3 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 transition-colors'
          >
            Update Paving Block
          </button>
        </form>
        {pavingBlockData?.image_url && (
          <div className='mt-6 text-center'>
            <h3 className='text-lg font-semibold mb-2'>Current Image:</h3>
            <img
              src={`${Api.BASE_URL}${pavingBlockData.image_url}`}
              alt='Current Paving Block'
              className='max-w-full h-auto rounded-md border border-gray-300'
            />
          </div>
        )}
      </div>
      <Footer/>
    </div>
  );
};

export default UpdatePavingBlock;
