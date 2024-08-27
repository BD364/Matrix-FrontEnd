import React from 'react';
import './homepage.css';
import Navbar from '../Navbar/Navbar';

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
      {/* Add other sections here */}
    </div>
  );
};

export default HomePage;
