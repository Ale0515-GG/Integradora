import React from 'react';
import './App.css'; // Importa el archivo CSS aquí

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Inicio from './Screens/Inicio/Inicio';
import Admin from './Screens/Administrador/Administrador/Admin';
import Apro from './Screens/Administrador/AprobacionHorarios/Apro';
import IngreSuAd from './Screens/SupAdmin/ingresoSupAdmin/IngreSuAd';
import Noti from './Screens/Empleado/Notificaciones/Noti';



function App() {
  return (
    <div className=''>
      <Router>
        <Routes>
          <Route path="/Inicio" element={<Inicio />}></Route>
          <Route path="/Admin" element={<Admin />}></Route>
          <Route path="/Apro" element={<Apro />}></Route>
          <Route path="/IngreSuAd" element={<IngreSuAd />}></Route>
          <Route path="/Noti" element={<Noti />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
