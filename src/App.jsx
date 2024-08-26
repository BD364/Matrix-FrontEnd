import React from 'react';
import { AuthProvider } from './AuthContext.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/Home/HomePage.jsx';
import ImageCarousel from './components/ImageCarousel';
import BeamBlock from './components/BeamBlock';
import HollowBlocks from './components/HollowBlocks';
import PavingBlocks from './components/PavingBlocks';
import RoadKerb from './components/RoadKerbAccessories'; 
import Services from './components/Services';
import Gallery from './components/Gallery';
import Downloads from './components/Downloads';
import SignUp from './components/SignUp';
import Register from './components/Register/Register.jsx';
import Login from './components/Login/Login.jsx';
import CreatePost from './components/Create/CreatePost.jsx';
import UpdatePost from './components/UpdatePost/UpdatePost.jsx';
import './index.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/create' element={<CreatePost />} />
          <Route path='/update/:postId' element={<UpdatePost />} />
          <Route path='/beam-block' element={<BeamBlock />} />
          <Route path='/hollow-blocks' element={<HollowBlocks />} />
          <Route path='/paving-blocks' element={<PavingBlocks />} />
          <Route path='/road-kerb' element={<RoadKerb />} />
          <Route path='/services' element={<Services />} />
          <Route path='/gallery' element={<Gallery />} />
          <Route path='/downloads' element={<Downloads />} />
          <Route path='/sign-up' element={<SignUp />} />
        </Routes>
        <ImageCarousel />
      </Router>
    </AuthProvider>
  );
}

export default App;
