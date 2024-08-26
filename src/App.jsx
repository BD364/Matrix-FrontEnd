import React from "react";
import Navbar from "./components/Navbar/Navbar.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage.jsx";
import ImageCarousel from "./components/ImageCarousel";
import BeamBlock from "./components/BeamBlock";
import HollowBlocks from "./components/HollowBlocks";
import PavingBlocks from "./components/PavingBlocks";
import RoadKerb from "./components/RoadKerbAccessories"; // Updated import
import Services from "./components/Services";
import Gallery from "./components/Gallery";
import Downloads from "./components/Downloads";
import SignUp from "./components/SignUp";
import "./index.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/beam-block" element={<BeamBlock />} />
        <Route path="/hollow-blocks" element={<HollowBlocks />} />
        <Route path="/paving-blocks" element={<PavingBlocks />} />
        <Route path="/road-kerb" element={<RoadKerb />} />
        <Route path="/services" element={<Services />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/downloads" element={<Downloads />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
      <ImageCarousel />
    </Router>
  );
}

export default App;
