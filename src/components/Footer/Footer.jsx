import React from 'react';

const Footer = () => {
  return (
    <footer className='bg-gray-900 text-gray-300 py-12'>
      <div className='container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8'>
        <div>
          <h3 className='text-xl font-bold text-white mb-4'>Matrix</h3>
          <p>
            We specialize in high-quality beam & block solutions for all your
            construction needs.
          </p>
        </div>

        <div>
          <h3 className='text-lg font-semibold text-white mb-4'>Quick Links</h3>
          <ul>
            <li>
              <a
                href='/'
                className='hover:text-white transition-colors duration-300'
              >
                Home
              </a>
            </li>
            <li>
              <a
                href='/about'
                className='hover:text-white transition-colors duration-300'
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href='/products'
                className='hover:text-white transition-colors duration-300'
              >
                Products
              </a>
            </li>
            <li>
              <a
                href='/contact'
                className='hover:text-white transition-colors duration-300'
              >
                Contact
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className='text-lg font-semibold text-white mb-4'>
            Our Services
          </h3>
          <ul>
            <li>
              <a
                href='/services/design'
                className='hover:text-white transition-colors duration-300'
              >
                Design & Consultation
              </a>
            </li>
            <li>
              <a
                href='/services/installation'
                className='hover:text-white transition-colors duration-300'
              >
                Installation Services
              </a>
            </li>
            <li>
              <a
                href='/services/delivery'
                className='hover:text-white transition-colors duration-300'
              >
                Delivery
              </a>
            </li>
            <li>
              <a
                href='/services/support'
                className='hover:text-white transition-colors duration-300'
              >
                Customer Support
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className='text-lg font-semibold text-white mb-4'>Contact Us</h3>
          <p className='mb-2'>Email: matrix@matrix.com</p>
          <p className='mb-2'>Phone: +254 123 4567</p>
          <p>Location: Moi Avenue, Nairobi, Kenya</p>
        </div>
      </div>

      <div className='mt-8 border-t border-gray-700 pt-6 text-center'>
        <p className='text-sm text-gray-400'>
          &copy; 2024 Matrix. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
