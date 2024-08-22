import React from "react";
import { FaInstagram, FaTwitter, FaWhatsapp, FaFacebook } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src="/src/assets/Matrixlogo.jpeg" alt="Matrix Precast Concrete" />
      </div>
      <ul className="nav-links">
        <li>
          <a href="/beam-block">Beam & Block</a>
        </li>
        <li>
          <a href="/hollow-blocks">Hollow Blocks</a>
        </li>
        <li>
          <a href="/paving-blocks">Paving Blocks</a>
        </li>
        <li>
          <a href="/road-kerb">Road Kerb & Accessories</a>
        </li>
        <li>
          <a href="/services">Services</a>
        </li>
        <li>
          <a href="/gallery">Gallery</a>
        </li>
        <li>
          <a href="/downloads">Downloads</a>
        </li>
      </ul>
      <div className="social-icons">
        <a
          href="https://www.instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram />
        </a>
        <a
          href="https://www.twitter.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaTwitter />
        </a>
        <a
          href="https://www.whatsapp.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaWhatsapp />
        </a>
        <a
          href="https://www.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebook />
        </a>
      </div>
      <div className="sign-in">
        <button>Sign In</button>
      </div>
    </nav>
  );
};

export default Navbar;
