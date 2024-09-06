import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import Navbar from '../Navbar/Navbar';
import { Edit, Plus } from '../Icons';
import Api from '../../utils/Api';

const PavingBlockList = () => {
  const [pavingBlocks, setPavingBlocks] = useState([]);
  const [selectedPavingBlock, setSelectedPavingBlock] = useState(null);
  const [message, setMessage] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPavingBlocks = async () => {
      try {
        const { data } = await Api.api.get(Api.END_POINTS.PAVINGBLOCKS);
        setPavingBlocks(data.pavingblocks);
      } catch (error) {
        setMessage(
          'Error fetching paving blocks: ' + (error.message || 'Unknown error')
        );
      }
    };

    fetchPavingBlocks();
  }, []);

  const handleImageClick = (pavingBlock) => {
    setSelectedPavingBlock(pavingBlock);
  };

  const handleCloseModal = () => {
    setSelectedPavingBlock(null);
  };

  const handleEditClick = (id) => {
    navigate(`/update/pavingblock/${id}`);
  };

  const handleAddClick = () => {
    navigate('/create/pavingblock');
  };

  return (
    <div className='min-h-screen bg-gray-100'>
      <Navbar />
      <header className='w-full h-[75vh] relative'>
        <div
          className='absolute inset-0 bg-cover bg-center'
          style={{ backgroundImage: 'url(assets/images/block4.jpg)' }}
        >
          <div className='absolute inset-0 bg-black opacity-50'></div>
        </div>

        <div className='relative text-white text-center py-20 px-6'>
          <h2 className='text-5xl font-bold mb-8' style={{ color: '#ffcb03' }}>
            Paving Blocks
          </h2>
          <p className='text-2xl font-semibold'>
            Browse our collection of Paving Blocks!
          </p>
        </div>
      </header>

      {message && (
        <p className='text-center text-red-600 font-semibold mb-4'>{message}</p>
      )}

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4'>
        {pavingBlocks.length > 0 ? (
          pavingBlocks.map((pavingBlock) => (
            <div
              key={pavingBlock.id}
              className='relative group cursor-pointer overflow-hidden rounded-lg'
              onClick={() => handleImageClick(pavingBlock)}
            >
              <img
                src={`${Api.BASE_URL}${pavingBlock.image_url}`}
                alt={pavingBlock.title}
                className='w-full h-64 object-cover transition-transform transform group-hover:scale-105'
              />
              <div className='absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity'>
                <h3 className='text-white text-2xl font-semibold'>
                  {pavingBlock.title}
                </h3>
              </div>
            </div>
          ))
        ) : (
          <p className='text-center text-lg text-gray-700 col-span-full'>
            No Paving Blocks available
          </p>
        )}
      </div>

      {selectedPavingBlock && (
        <div className='fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white rounded-lg shadow-xl overflow-hidden w-full xl:w-2/3 relative flex'>
            <img
              src={`${Api.BASE_URL}${selectedPavingBlock.image_url}`}
              alt={selectedPavingBlock.title}
              className='w-full lg:w-1/2 h-full object-cover'
            />
            <div className='flex flex-col flex-1 p-6 lg:p-12 bg-gray-50 relative'>
              <button
                className='absolute top-4 right-4 w-12 h-12 flex items-center justify-center rounded-full bg-gray-200 text-gray-800 text-3xl font-bold hover:bg-gray-300 hover:text-gray-600 transition-all duration-300'
                onClick={handleCloseModal}
                aria-label='Close modal'
              >
                &times;
              </button>
              <Edit
                className='absolute top-4 right-20 w-12 h-12 p-2 flex items-center justify-center rounded-full bg-gray-200 text-blue-500 text-3xl cursor-pointer hover:bg-gray-300 hover:text-blue-400 transition-all duration-300'
                onClick={() => handleEditClick(selectedPavingBlock.id)}
                title='Edit Paving Block'
              />
              <div className='mt-16'>
                <h2 className='text-3xl font-bold text-gray-800 mb-4'>
                  {selectedPavingBlock.title}
                </h2>
                <p className='text-base text-gray-600 mb-6'>
                  {selectedPavingBlock.description}
                </p>
                <p className='text-xl font-semibold text-gray-800'>
                  Price: ${selectedPavingBlock.price}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={handleAddClick}
        className='fixed bottom-10 right-10 bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center'
        aria-label='Add Paving Block'
      >
        <Plus className='w-8 h-8 stroke-white hover:stroke-yellow-500' />
      </button>
    </div>
  );
};

export default PavingBlockList;
