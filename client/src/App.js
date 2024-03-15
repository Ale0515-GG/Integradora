import React from 'react';
import './App.css'; // Importa el archivo CSS aquí
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Inicio from './Screens/Inicio/Inicio';
import Admin from './Screens/Administrador/Administrador/Admin';
import Aprobacion from './Screens/Administrador/AprobacionHorarios/Aprobacion'
import IngreSuAd from './Screens/SupAdmin/ingresoSupAdmin/IngreSuAd';
import Noti from './Screens/Empleado/notificaciones/Notificaciones';
import Contratos from './Screens/Administrador/Contratos/Contratos'
import SubAdmi1 from './Screens/SupAdmin/SupAdm1/SubAdmi1';
import SubAdmin2 from './Screens/SupAdmin/SupAdmi2/SubAdmin2';
import AprobacionS from './Screens/Administrador/AprobacionSolicitudes/AproSoli'
import AgregarSede from './Screens/SupAdmin/AgregarSedes/AgregarSede';


import SubAdmi1 from './Screens/SupAdmin/SupAdm1/SubAdmi1';
import SubAdmin2 from './Screens/SupAdmin/SupAdmi2/SubAdmin2';
import AprobacionS from './Screens/Administrador/AprobacionSolicitudes/AproSoli'

function App() {
  return (
    <div className=''>
      <Router>
        <Routes>

          <Route path="/AgregarSede" element={<AgregarSede />}></Route>
          <Route path="/Inicio" element={<Inicio />}></Route>
          <Route path="/Admin" element={<Admin />}></Route>
          <Route path="/AproS" element={<AprobacionS />}></Route>
          <Route path="/Apro" element={<Aprobacion />}></Route>
          <Route path="/IngreSuAd" element={<IngreSuAd />}></Route>
          <Route path="/Noti" element={<Noti />}></Route>
          <Route path="/Contratos" element={<Contratos/>}></Route>

          <Route path="/SubAdmi1" element={<SubAdmi1/>}></Route>
          <Route path="/SubAdmin2" element={<SubAdmin2/>}></Route>
        
        </Routes>
      </Router>
    </div>
  );
}

export default App;
