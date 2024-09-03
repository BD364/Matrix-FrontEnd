import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import Navbar from '../Navbar/Navbar';
import { Edit, Plus } from '../Icons';
import Api from '../../utils/Api';

const BeamBlockList = () => {
  const [beamBlocks, setBeamBlocks] = useState([]);
  const [selectedBeamBlock, setSelectedBeamBlock] = useState(null);
  const [message, setMessage] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBeamBlocks = async () => {
      try {
        const { data } = await Api.api.get(Api.END_POINTS.BEAMBLOCKS);
        // console.log(data);
        setBeamBlocks(data.beamblocks);
      } catch (error) {
        setMessage(
          'Error fetching beamblocks: ' + (error.message || 'Unknown error')
        );
      }
    };

    fetchBeamBlocks();
  }, []);

  const handleImageClick = (beamBlock) => {
    setSelectedBeamBlock(beamBlock);
  };

  const handleCloseModal = () => {
    setSelectedBeamBlock(null);
  };

  const handleEditClick = (id) => {
    navigate(`/update/beamblock/${id}`);
  };

  const handleAddClick = () => {
    navigate('/create/beamblock');
  };

  return (
    <div className='min-h-screen bg-gray-100'>
      <Navbar />
      <header className='w-full h-[75vh] relative'>
        <div
          className='absolute inset-0 bg-cover bg-center'
          style={{ backgroundImage: 'url(/assets/images/beam1.jpg)' }}
        >
          <div className='absolute inset-0 bg-black opacity-50'></div>
        </div>

        <div className='relative text-white text-center py-20 px-6'>
          <h2 className='text-5xl font-bold mb-8' style={{ color: '#ffcb03' }}>
            Beam & Blocks
          </h2>
          <p className='text-2xl font-semibold'>
            Welcome to our collection of BeamBlocks! BeamBlocks are a unique and{' '}
            <br />
            essential part of our inventory, each offering distinctive features
            and characteristics.
          </p>
        </div>
      </header>

      {message && (
        <p className='text-center text-red-600 font-semibold mb-4'>{message}</p>
      )}

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4'>
        {beamBlocks.length > 0 ? (
          beamBlocks.map((beamBlock) => (
            <div
              key={beamBlock.id}
              className='relative group cursor-pointer overflow-hidden rounded-lg'
              onClick={() => handleImageClick(beamBlock)}
            >
              <img
                src={`${Api.BASE_URL}/${beamBlock.image_url}`}
                alt={beamBlock.title}
                className='w-full h-64 object-cover transition-transform transform group-hover:scale-105'
              />
              <div className='absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity'>
                <h3 className='text-white text-2xl font-semibold'>
                  {beamBlock.title}
                </h3>
              </div>
            </div>
          ))
        ) : (
          <p className='text-center text-lg text-gray-700 col-span-full'>
            No BeamBlocks available
          </p>
        )}
      </div>

      {selectedBeamBlock && (
        <div className='fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white rounded-lg shadow-xl overflow-hidden w-full xl:w-2/3 relative flex'>
            <img
              src={`${Api.BASE_URL}/${selectedBeamBlock.image_url}`}
              alt={selectedBeamBlock.title}
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
                onClick={() => handleEditClick(selectedBeamBlock.id)}
                title='Edit BeamBlock'
              />
              <div className='mt-16'>
                <h2 className='text-3xl font-bold text-gray-800 mb-4'>
                  {selectedBeamBlock.title}
                </h2>
                <p className='text-lg text-gray-700 mb-4'>
                  {selectedBeamBlock.content}
                </p>
                <p className='text-base text-gray-600 mb-6'>
                  {selectedBeamBlock.description}
                </p>
                <p className='text-xl font-semibold text-gray-800'>
                  Price: ${selectedBeamBlock.price}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={handleAddClick}
        className='fixed bottom-10 right-10 bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center'
        aria-label='Add BeamBlock'
      >
        <Plus className='w-8 h-8 stroke-white hover:stroke-yellow-500' />
      </button>
    </div>
  );
};

export default BeamBlockList;
