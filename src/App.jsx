import React from 'react';
import { AuthProvider } from './AuthContext.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/Home/HomePage.jsx';
import Register from './components/Register/Register.jsx';
import Login from './components/Login/Login.jsx';
import CreateBeamBlock from './components/Create/CreateBeamBlock.jsx';
import UpdateBeamBlock from './components/UpdateBeamBlock/UpdateBeamBlock.jsx';
import BeamBlockList from './components/BeamblocksList/BeamblocksList.jsx';
import BeamBlockDetail from './components/BeamblockDetail/BeamblockDetail.jsx';
import CreateHollowBlock from './components/CreateHollowBlock/CreateHollowBlock.jsx';
import HollowBlockList from './components/HollowBlocksList/HollowBlockslList.jsx';
import HollowBlockDetail from './components/SingleHollowBlock/HollowBlockDetail.jsx';
import UpdateHollowBlock from './components/UpdateHollowBlock/UpdateHollowBlock.jsx';
import './index.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/create/beamblock' element={<CreateBeamBlock />} />
          <Route
            path='/update/beamblock/:postId'
            element={<UpdateBeamBlock />}
          />
          <Route path='/beamblocks' element={<BeamBlockList />} />
          <Route path='/beamblock/:postId' element={<BeamBlockDetail />} />
          <Route path='/create/hollowblock' element={<CreateHollowBlock />} />
          <Route path='/hollowblocks' element={<HollowBlockList />} />
          <Route path='/hollowblock/:postId' element={<HollowBlockDetail />} />
          <Route
            path='/update/hollowblock/:postId'
            element={<UpdateHollowBlock />}
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
