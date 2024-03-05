import React from 'react';
import './App.css'; // Importa el archivo CSS aquí

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Inicio from './Screens/Inicio/Inicio';


function App() {
  return (
    <div className=''>
      <Router>
        <Routes>
          <Route path="/Inicio" element={<Inicio />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
