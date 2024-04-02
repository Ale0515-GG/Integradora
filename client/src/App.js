import React from 'react';
import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import Inicio from './Screens/Inicio/Inicio';
import Admin from './Screens/Administrador/Administrador/Admin';
import Aprobacion from './Screens/Administrador/AprobacionHorarios/Aprobacion';
import IngreSuAd from './Screens/SupAdmin/ingresoSupAdmin/IngreSuAd';
import SubAdmi1 from './Screens/SupAdmin/SupAdm1/SubAdmi1';
import SubAdmin2 from './Screens/SupAdmin/SupAdmi2/SubAdmin2';
import AprobacionS from './Screens/Administrador/AprobacionSolicitudes/AproSoli';
import AgregarSede from './Screens/SupAdmin/AgregarSedes/AgregarSede';
import Diagrama from './Screens/Diagrama/Diagrama.jsx'
import Notificaciones from './Screens/Empleado/notificaciones/Notificaciones';
import Horarios from './Screens/SupAdmin/Horarios/Horarios.jsx';

import AgregarArea from './Screens/SupAdmin/AgregarAreas/AgregarArea.jsx'


import SolicitudH from './Screens/Administrador/Solicitudes de horarios/SoliHora.jsx'



function App() {
  return (
    <div className=''>
      <Router>
        <Routes>
          <Route path="/" element={<Inicio />}></Route>

          <Route path="/Admin" element={<Admin />}></Route>

          <Route path="/Admin" element={<Admin />}></Route> 

          <Route path="/AproS" element={<AprobacionS />}></Route> 
          <Route path="/Apro" element={<Aprobacion />}></Route>
          <Route path="/IngreSuAd" element={<IngreSuAd />}></Route>
          <Route path="/SubAdmi1" element={<SubAdmi1 />}></Route>
          <Route path="/SubAdmin2" element={<SubAdmin2 />}></Route>


          <Route path='/AgregarSede'element={<AgregarSede/>}></Route>
          <Route path='/AgregarArea'element={<AgregarArea/>}></Route>

          <Route path='/Notificaciones' element={<Notificaciones/>}></Route>

          <Route path='/AgregarSede'element={<AgregarSede/>}></Route>
          <Route path='/SolicitudesH'element={<SolicitudH/>}></Route>
          <Route path='/Notificaciones' element={<Notificaciones/>}></Route>8/8/8

          

          <Route path="/diagrama" element={<Diagrama />} />
          <Route path='/Horarios' element={<Horarios />}/>
        </Routes> 
      </Router>
    </div>
  );
}

export default App;
