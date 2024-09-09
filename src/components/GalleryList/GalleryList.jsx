import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import Navbar from '../Navbar/Navbar';
import Api from '../../utils/Api';
import { Edit, Plus } from '../Icons';
import Footer from '../Footer/Footer';


const GalleryList = () => {
  const [galleries, setGalleries] = useState([]);
  const [selectedGallery, setSelectedGallery] = useState(null);
  const [message, setMessage] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGalleries = async () => {
      try {
        const { data } = await Api.api.get(Api.END_POINTS.GALLERIES);
        setGalleries(data.galleries);
      } catch (error) {
        setMessage(
          'Error fetching galleries: ' + (error.message || 'Unknown error')
        );
      }
    };

    fetchGalleries();
  }, []);

  const handleImageClick = (gallery) => {
    setSelectedGallery(gallery);
  };

  const handleCloseModal = () => {
    setSelectedGallery(null);
  };

  const handleAddClick = () => {
    navigate('/create/gallery');
  };

  const handleUpdateClick = () => {
    if (selectedGallery) {
      navigate(`/update/gallery/${selectedGallery.id}`);
    }
  };

  return (
    <div className='min-h-screen bg-gray-100'>
      <Navbar />
      <header className='w-full h-[75vh] relative'>
        <div
          className='absolute inset-0 bg-cover bg-center'
          style={{ backgroundImage: 'url(assets/images/gallery.jpg)' }}
        >
          <div className='absolute inset-0 bg-black opacity-50'></div>
        </div>

        <div className='relative text-white text-center py-20 px-6'>
          <h2 className='text-5xl font-bold mb-8' style={{ color: '#ffcb03' }}>
            Gallery
          </h2>
          <p className='text-2xl font-semibold'>
            Browse through our curated gallery collection!
          </p>
        </div>
      </header>

      {message && (
        <p className='text-center text-red-600 font-semibold mb-4'>{message}</p>
      )}

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4'>
        {galleries.length > 0 ? (
          galleries.map((gallery) => (
            <div
              key={gallery.id}
              className='relative group cursor-pointer overflow-hidden rounded-lg'
              onClick={() => handleImageClick(gallery)}
            >
              <img
                src={`${Api.BASE_URL}${gallery.image_url}`}
                alt={gallery.title}
                className='w-full h-64 object-cover transition-transform transform group-hover:scale-105'
              />
            </div>
          ))
        ) : (
          <p className='text-center text-lg text-gray-700 col-span-full'>
            No Galleries available
          </p>
        )}
      </div>

      {selectedGallery && (
        <div className='fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white rounded-lg shadow-xl overflow-hidden w-full xl:w-2/3 relative flex'>
            <img
              src={`${Api.BASE_URL}${selectedGallery.image_url}`}
              alt={selectedGallery.title}
              className='w-full lg:w-1/2 h-full object-cover'
            />
            <div className='flex flex-col flex-1 p-6 lg:p-12 bg-gray-50 relative'>
              <button
                className='absolute top-4 right-20 w-12 h-12 flex items-center justify-center rounded-full bg-gray-200 text-gray-800 text-3xl font-bold hover:bg-gray-300 hover:text-gray-600 transition-all duration-300'
                onClick={handleUpdateClick}
                aria-label='Edit Gallery'
              >
                <Edit />
              </button>
              <button
                className='absolute top-4 right-4 w-12 h-12 flex items-center justify-center rounded-full bg-gray-200 text-gray-800 text-3xl font-bold hover:bg-gray-300 hover:text-gray-600 transition-all duration-300'
                onClick={handleCloseModal}
                aria-label='Close modal'
              >
                &times;
              </button>
              <div className='mt-16'>
                <h2 className='text-3xl font-bold text-gray-800 mb-4'>
                  {selectedGallery.title}
                </h2>
              </div>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={handleAddClick}
        className='fixed bottom-10 right-10 bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center'
        aria-label='Add Gallery'
      >
        <Plus />
      </button>
      <Footer/>
    </div>
  );
};

export default GalleryList;
