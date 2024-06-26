import React from 'react';
import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Inicio from './Screens/Inicio/Inicio';
import IngreSuAd from './Screens/SupAdmin/ingresoSupAdmin/IngreSuAd';
import SubAdmi1 from './Screens/SupAdmin/SupAdm1/SubAdmi1';
import AgregarSede from './Screens/SupAdmin/AgregarSedes/AgregarSede';
import Horarios from './Screens/SupAdmin/Horarios/Horarios.jsx';
import VEmpleadoH from './Screens/Empleado/SolicitudHorarioEmple/SoliHoraE.jsx';
import AgregarArea from './Screens/SupAdmin/AgregarAreas/AgregarArea.jsx';
import SolicitudH from './Screens/Administrador/Solicitudes de horarios/SoliHora.jsx';
import Diagrama from './Screens/Diagrama/Diagrama.jsx'; 
import Contratos from './Screens/SupAdmin/Contratos/Contratos.jsx';
import Vacaciones from './Screens/Empleado/SolicitudVacacionesEmpleado/SoliEVaca.jsx'
import Notificaciones from './Screens/Empleado/notificaciones/Notificaciones.jsx';
import Actividades from './Screens/Actividades/Actividades.jsx'
import Empleado from './Screens/Empleado/NavegacionEmpleado.jsx';


function App() {
  return (
    <div className="">
      <Router>
        <Routes>
          <Route path="/login" element={<Inicio />} />
          <Route path="/IngreSuAd" element={<IngreSuAd />} />
          <Route path="/SubAdmi1" element={<SubAdmi1 />} />
          <Route path="/AgregarArea" element={<AgregarArea />} />
          <Route path="/SoliHEmple" element={<VEmpleadoH />} />
          <Route path="/AgregarSede" element={<AgregarSede />} />
          <Route path="/SolicitudesH" element={<SolicitudH />} />         
          <Route path="/activiti" element={<Actividades />} />
          <Route path="/diagrama" element={<Diagrama />} /> 
          <Route path="/Horarios" element={<Horarios />} />
          <Route path="/Contratos" element={<Contratos />}/>
          <Route path='/NavegacionEmpleado' element={<Empleado/>}/>
          <Route path="/Vacaciones" element={<Vacaciones />}/>
          <Route path="/" element={<Notificaciones />}/>
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
