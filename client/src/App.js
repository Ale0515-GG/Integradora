import React from 'react';

import './App.css'; // Importa el archivo CSS aquí
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Inicio from './Screens/Inicio/Inicio';
import Admin from './Screens/Administrador/Administrador/Admin';
import Aprobacion from './Screens/Administrador/AprobacionHorarios/Aprobacion';
import IngreSuAd from './Screens/SupAdmin/ingresoSupAdmin/IngreSuAd';
import SubAdmi1 from './Screens/SupAdmin/SupAdm1/SubAdmi1';
import SubAdmin2 from './Screens/SupAdmin/SupAdmi2/SubAdmin2';
import AprobacionS from './Screens/Administrador/AprobacionSolicitudes/AproSoli';
import AgregarSede from './Screens/SupAdmin/AgregarSedes/AgregarSede';
import Notificaciones from './Screens/Empleado/notificaciones/Notificaciones';
import Horarios from './Screens/Administrador/horarios/horarios'
import ActividadesAuto from './Screens/Automatizacion/ActividadesAutomatizacion.jsx';



function App() {
  return (
    <div className=''>
      <Router>
        <Routes>
          <Route path="/Inicio" element={<Inicio />}></Route>
          <Route path="/Admin" element={<Admin />}></Route>
          <Route path="/AproS" element={<AprobacionS />}></Route>
          <Route path="/Apro" element={<Aprobacion />}></Route>
          <Route path="/IngreSuAd" element={<IngreSuAd />}></Route>
          <Route path="/SubAdmi1" element={<SubAdmi1 />}></Route>
          <Route path="/SubAdmin2" element={<SubAdmin2 />}></Route>
          <Route path='/AgregarSede'element={<AgregarSede/>}></Route>
          <Route path= '/Notificaciones' element={<Notificaciones/>}></Route>
          <Route path='/Horarios' element={<Horarios />}></Route>
          <Route path="/actividades" element={<ActividadesAuto />} />

        </Routes> 
      </Router>
    </div>
  );
}

export default App;
