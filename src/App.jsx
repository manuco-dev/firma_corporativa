import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';




import Header from './Layout/Header';
import PiePag from './Layout/PiePag';

import Plantilla1 from './components/documentaciones/Plantilla1';
import Plantilla2 from './components/documentaciones/Plantilla2';
import Plantilla3 from './components/documentaciones/Plantilla3';
import Plantilla4 from './components/documentaciones/Plantilla4';
import Plantilla5 from './components/documentaciones/Plantilla5';
import Plantilla6 from './components/documentaciones/Plantilla6';
import Plantilla7 from './components/documentaciones/Plantilla7';
import Plantilla8 from './components/documentaciones/Plantilla8';
import Plantilla9 from './components/documentaciones/Plantilla9';
import Plantilla10 from './components/documentaciones/Plantilla10';
import Plantilla11 from './components/documentaciones/Plantilla11';
import Plantilla12 from './components/documentaciones/Plantilla12';
import Plantilla13 from './components/documentaciones/Plantilla13';
import Plantilla14 from './components/documentaciones/Plantilla14';
import Plantilla15 from './components/documentaciones/Plantilla15';






import FirmaInput from './components/firma/FirmaInput';

import FeedBack from './components/documentaciones/Feedback';




const App = () => {
  return (
    <Router>
      <Header />
      <PiePag />
      <Routes>
        <Route path="/firma-corp" element={<FirmaInput />} />
        <Route path="/plantilla1" element={< Plantilla1 />} />
        <Route path="/plantilla2" element={< Plantilla2 />} />
        <Route path="/plantilla3" element={< Plantilla3 />} />
        <Route path="/plantilla4" element={< Plantilla4 />} />
        <Route path="/plantilla5" element={< Plantilla5 />} />
        <Route path="/plantilla6" element={< Plantilla6 />} />
        <Route path="/plantilla7" element={< Plantilla7 />} />
        <Route path="/plantilla8" element={< Plantilla8 />} />
        <Route path="/plantilla9" element={< Plantilla9 />} />
        <Route path="/plantilla10" element={< Plantilla10 />} />
        <Route path="/plantilla11" element={< Plantilla11 />} />
        <Route path="/plantilla12" element={< Plantilla12 />} />
        <Route path="/plantilla13" element={< Plantilla13 />} />
        <Route path="/plantilla14" element={< Plantilla14 />} />
        <Route path="/plantilla15" element={< Plantilla15 />} />
        <Route path="/feedback" element={< FeedBack />} />
      </Routes>
    </Router>
  );
};

export default App;

