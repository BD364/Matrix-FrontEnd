import React from 'react';
import './homepage.css';
import Navbar from '../Navbar/Navbar';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <header className='hero-section'>
        <h1>MATRIX</h1>
        <h2>Precast Concrete</h2>
        <p>
          We offer a comprehensive range of precast concrete solutions designed
          to meet the diverse needs of the Kenyan construction industry.
        </p>
      </header>
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        className='image-carousel'
      >
        <div>
          <img src='/src/assets/CONCRETE IMG 1.JPEG' alt='Concrete Image 1' />
        </div>
        <div>
          <img src='/src/assets/CONCRETE IMG 2.JPEG' alt='Concrete Image 2' />
        </div>
        <div>
          <img src='/src/assets/CONCRETE IMG 3.JPEG' alt='Concrete Image 3' />
        </div>
      </Carousel>
    </div>
  );
};

export default HomePage;
