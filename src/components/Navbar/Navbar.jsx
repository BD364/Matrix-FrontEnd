import React, { useState } from 'react';
import './navbar.css';
import { FaInstagram, FaTwitter, FaWhatsapp, FaFacebook } from 'react-icons/fa';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import Login from '../Login/Login';
import { Link } from 'react-router-dom';
import Modal from '../Modal';

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    setIsModalOpen(false);
    navigate('/');
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const navigateToHome = () => {
    navigate('/');
  }

  return (
    <nav className='navbar'>
      <div className='logo'>
        <img
          className='logoImage'
          src='/src/assets/Matrixlogo.jpeg'
          alt='Matrix Precast Concrete'
          onClick={navigateToHome}
        />
      </div>

      <ul className='nav-links'>
        <li>
          <Link to='/beamblocks' className='hover:text-yellow-400'>
            Beam & Block
          </Link>
        </li>
        <li>
          <a href='/hollow-blocks' className='hover:text-yellow-400'>
            Hollow Blocks
          </a>
        </li>
        <li>
          <a href='/paving-blocks' className='hover:text-yellow-400'>
            Paving Blocks
          </a>
        </li>
        <li>
          <a href='/road-kerb' className='hover:text-yellow-400'>
            Road Kerb & Accessories
          </a>
        </li>
        <li>
          <a href='/services' className='hover:text-yellow-400'>
            Services
          </a>
        </li>
        <li>
          <a href='/gallery' className='hover:text-yellow-400'>
            Gallery
          </a>
        </li>
        <li>
          <a href='/downloads' className='hover:text-yellow-400'>
            Downloads
          </a>
        </li>
      </ul>

      <div className='navbar-end'>
        <div className='social-icons'>
          <a
            href='https://www.instagram.com'
            target='_blank'
            rel='noopener noreferrer'
          >
            <FaInstagram />
          </a>
          <a
            href='https://www.twitter.com'
            target='_blank'
            rel='noopener noreferrer'
          >
            <FaTwitter />
          </a>
          <a
            href='https://www.whatsapp.com'
            target='_blank'
            rel='noopener noreferrer'
          >
            <FaWhatsapp />
          </a>
          <a
            href='https://www.facebook.com'
            target='_blank'
            rel='noopener noreferrer'
          >
            <FaFacebook />
          </a>
        </div>
        <div>
          <Link to='/'></Link>
          <button className='sign-in' onClick={openModal}>
            Sign In
          </button>
        </div>

        <div className='navbarMenu'>
          {toggleMenu ? (
            <RiCloseLine
              color='#fff'
              size={27}
              onClick={() => setToggleMenu(false)}
            />
          ) : (
            <RiMenu3Line
              color='#fff'
              size={27}
              onClick={() => setToggleMenu(true)}
            />
          )}
        </div>
      </div>

      {toggleMenu && (
        <div className='navbarMenuContainerToggle scale-up-center'>
          <div className='navbarMenuContainerLinks'>
            <ul className='nav-links-toggle'>
              <li>
                <a href='/beam-block'>Beam & Block</a>
              </li>
              <li>
                <a href='/hollow-blocks'>Hollow Blocks</a>
              </li>
              <li>
                <a href='/paving-blocks'>Paving Blocks</a>
              </li>
              <li>
                <a href='/road-kerb'>Road Kerb & Accessories</a>
              </li>
              <li>
                <a href='/services'>Services</a>
              </li>
              <li>
                <a href='/gallery'>Gallery</a>
              </li>
              <li>
                <a href='/downloads'>Downloads</a>
              </li>
            </ul>
            <div className='social-icons-toggle'>
              <a
                href='https://www.instagram.com'
                target='_blank'
                rel='noopener noreferrer'
              >
                <FaInstagram />
              </a>
              <a
                href='https://www.twitter.com'
                target='_blank'
                rel='noopener noreferrer'
              >
                <FaTwitter />
              </a>
              <a
                href='https://www.whatsapp.com'
                target='_blank'
                rel='noopener noreferrer'
              >
                <FaWhatsapp />
              </a>
              <a
                href='https://www.facebook.com'
                target='_blank'
                rel='noopener noreferrer'
              >
                <FaFacebook />
              </a>
            </div>
            <div>
              <Link to='/'></Link>
              <button className='sign-in-toogle' onClick={openModal}>
                Sign In
              </button>
            </div>
          </div>
        </div>
      )}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <Login onSuccess={handleLoginSuccess} />
      </Modal>
    </nav>
  );
};

export default Navbar;
