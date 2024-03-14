import React from 'react';
import './App.css'; // Importa el archivo CSS aquí

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Inicio from './Screens/Inicio/Inicio';
import Admin from './Screens/Administrador/Administrador/Admin';

import Apro from './Screens/Administrador/AprobacionHorarios/Apro';

import Aprobacion from './Screens/Administrador/AprobacionHorarios/Aprobacion'
import LogeoEm from './Screens/Empleado/LogeoE/LogeoEm';

import IngreSuAd from './Screens/SupAdmin/ingresoSupAdmin/IngreSuAd';
function App() {
  return (
    <div className=''>
      <Router>
        <Routes>
          <Route path="/Inicio" element={<Inicio />}></Route>
          <Route path="/Admin" element={<Admin />}></Route>

          <Route path="/Apro" element={<Apro />}></Route>

          <Route path="/Aprobaciones" element={<Aprobacion />}></Route>
          <Route path="/LogeoEm" element={<LogeoEm />}></Route>

          <Route path="/IngreSuAd" element={<IngreSuAd />}></Route>
        
        </Routes>
      </Router>
    </div>
  );
}

export default App;
