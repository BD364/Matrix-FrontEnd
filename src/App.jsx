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
import CreatePavingBlock from './components/CreatePavingBlock/CreatePavingBlock.jsx';
import PavingBlockList from './components/PavingBlocksList/PavingBlocksList.jsx';
import PavingBlockDetail from './components/SinglePavingBlock/SinglePavingBlock.jsx';
import UpdatePavingBlock from './components/UpdatePavingBlock/UpdatePavingBlock.jsx';
import CreateRoadKerb from './components/CreateRoadKerb/CreateRoadKerb.jsx';
import RoadKerbList from './components/RoadKerbList/RoadKerbList.jsx';
import RoadKerbDetail from './components/SingleRoadKerb/SingleRoadKerb.jsx';
import UpdateRoadKerb from './components/UpdateRoadKerb/UpdateRoadKerb.jsx';
import CreateGallery from './components/CreateGallery/CreateGallery.jsx';
import GalleryList from './components/GalleryList/GalleryList.jsx';
import GalleryDetail from './components/SingleGallery/SingleGallery.jsx';
import UpdateGallery from './components/UpdateGallery/UpdateGallery.jsx';
import Footer from './components/Footer/Footer.jsx';
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
          <Route path='/create/pavingblock' element={<CreatePavingBlock />} />
          <Route path='/pavingblocks' element={<PavingBlockList />} />
          <Route path='/pavingblock/:postId' element={<PavingBlockDetail />} />
          <Route
            path='/update/pavingblock/:postId'
            element={<UpdatePavingBlock />}
          />
          <Route path='/create/roadkerb' element={<CreateRoadKerb />} />
          <Route path='/roadkerbs' element={<RoadKerbList />} />
          <Route path='/roadkerb/:postId' element={<RoadKerbDetail />} />
          <Route path='/update/roadkerb/:postId' element={<UpdateRoadKerb />} />

          <Route path='/create/gallery' element={<CreateGallery />} />
          <Route path='/gallery' element={<GalleryList />} />
          <Route path='/gallery/:postId' element={<GalleryDetail />} />
          <Route path='/update/gallery/:postId' element={<UpdateGallery />} />
          <Route path='/footer' element={<Footer />} />
        </Routes>
        {/* <Footer /> */}
      </Router>
    </AuthProvider>
  );
}

export default App;
