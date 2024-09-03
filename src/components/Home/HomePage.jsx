import React from 'react';
import { useNavigate } from 'react-router-dom';
import './homepage.css';
import Navbar from '../Navbar/Navbar';
import { ArrowIcon } from '../Icons';

const HomePage = () => {
  const navigate = useNavigate();

  const handleBeamblocks = () => {
    navigate('/beamblocks');
  };

  const handleHollowBlocks = () => {
    navigate('/hollowblocks');
  };

  return (
    <div className='min-h-screen bg-gray-100'>
      <Navbar className='w-full fixed top-0 z-10' />

      <header className='w-full h-[75vh] relative'>
        <div
          className='absolute inset-0 bg-cover bg-center'
          style={{ backgroundImage: 'url(/assets/images/block4.jpg)' }}
        >
          <div className='absolute inset-0 bg-black opacity-50'></div>
        </div>

        <div className='relative text-white text-center py-20 px-6'>
          <h1
            className='text-7xl font-extrabold mb-8'
            style={{ color: '#ffcb03' }}
          >
            MATRIX
          </h1>
          <h2 className='text-4xl font-bold mb-8'>Precast Concrete</h2>
          <p className='text-2xl font-semibold'>
            We offer a comprehensive range of precast concrete solutions
            designed to meet the diverse <br />
            needs of the Kenyan construction industry.
          </p>
        </div>
      </header>

      <div className='main-content container mx-auto px-4 py-16'>
        <h3 className='text-center text-5xl font-bold mb-10 text-gray-900 relative'>
          Our Products & Services
          <span className='block mt-2 w-24 h-1 bg-[#ffcb03] mx-auto'></span>
        </h3>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5'>
          <div
            className='bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 cursor-pointer'
            onClick={handleBeamblocks}
          >
            <img
              src='/assets/images/beam1.jpg'
              alt='Beam & Block System'
              className='w-full h-60 sm:h-72 md:h-80 object-cover'
            />
            <div className='p-4'>
              <h3 className='text-2xl font-semibold mb-2'>
                Beam & Block System
              </h3>
              <p className='text-gray-700 mb-4'>
                Beam and block is a robust solution for cost-effective suspended
                floors.
              </p>
              <div className='flex items-center text-blue-500'>
                <p className='mr-2'>View More</p>
                <ArrowIcon className='h-6 w-6' />
              </div>
            </div>
          </div>

          <div className='bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 cursor-pointer' onClick={handleHollowBlocks}>
            <img
              src='/assets/images/block3.jpg'
              alt='Beam & Block System'
              className='w-full h-60 sm:h-72 md:h-80 object-cover'
            />
            <div className='p-4'>
              <h3 className='text-2xl font-semibold mb-2'>
                Hollow Concrete Blocks
              </h3>
              <p className='text-gray-700 mb-4'>
                Concrete blocks are used to build domestic and commercial
                buildings due to their strength, their versatility, and their
                typically lower price point compared to brick.
              </p>
              <div className='flex items-center text-blue-500'>
                <p className='mr-2'>View More</p>
                <ArrowIcon className='h-6 w-6' />
              </div>
            </div>
          </div>

          <div className='bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 cursor-pointer'>
            <img
              src='/assets/images/block4.jpg'
              alt='Beam & Block System'
              className='w-full h-60 sm:h-72 md:h-80 object-cover'
            />
            <div className='p-4'>
              <h3 className='text-2xl font-semibold mb-2'>Paving Blocks</h3>
              <p className='text-gray-700 mb-4'>
                An effect that suits perfectly for design accents. The deceived
                game between light and shadow seems to transform surfaces into
                three-dimensional objects. 3D paving with its illusionary effect
                attracts every viewer.
              </p>
              <div className='flex items-center text-blue-500'>
                <p className='mr-2'>View More</p>
                <ArrowIcon className='h-6 w-6' />
              </div>
            </div>
          </div>

          <div className='bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 cursor-pointer'>
            <img
              src='/assets/images/beam5.jpg'
              alt='Beam & Block System'
              className='w-full h-60 sm:h-72 md:h-80 object-cover'
            />
            <div className='p-4'>
              <h3 className='text-2xl font-semibold mb-2'>
                Road Kerb & Accessories
              </h3>
              <p className='text-gray-700 mb-4'>
                Well-designed road kerbs can increase the value of adjacent
                properties by improving the overall look and feel of the area.
              </p>
              <div className='flex items-center text-blue-500'>
                <p className='mr-2'>View More</p>
                <ArrowIcon className='h-6 w-6' />
              </div>
            </div>
          </div>

          <div className='bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 cursor-pointer'>
            <img
              src='/assets/images/services.jpg'
              alt='Beam & Block System'
              className='w-full h-60 sm:h-72 md:h-80 object-cover'
            />
            <div className='p-4'>
              <h3 className='text-2xl font-semibold mb-2'>Services</h3>
              <p className='text-gray-700 mb-4'>
                Any building is a highly complex machine. It has many subsystems
                and interlocking parts, all working as part of a single system.
              </p>
              <div className='flex items-center text-blue-500'>
                <p className='mr-2'>View More</p>
                <ArrowIcon className='h-6 w-6' />
              </div>
            </div>
          </div>

          <div className='bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 cursor-pointer'>
            <img
              src='/assets/images/gallery.jpg'
              alt='Beam & Block System'
              className='w-full h-60 sm:h-72 md:h-80 object-cover'
            />
            <div className='p-4'>
              <h3 className='text-2xl font-semibold mb-2'>Gallery</h3>
              <p className='text-gray-700 mb-4'>
                Any building is a highly complex machine. It has many subsystems
                and interlocking parts, all working as part of a single system.
              </p>
              <div className='flex items-center text-blue-500'>
                <p className='mr-2'>View More</p>
                <ArrowIcon className='h-6 w-6' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
