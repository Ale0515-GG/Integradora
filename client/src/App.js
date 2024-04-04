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
import VacaEmV from './Screens/Empleado/SolicitudVacacionesEmpleado/SoliEVaca.jsx';
import AgregarArea from './Screens/SupAdmin/AgregarAreas/AgregarArea.jsx';
import SolicitudH from './Screens/Administrador/Solicitudes de horarios/SoliHora.jsx';
import Diagrama from './Screens/Diagrama/Diagrama.jsx'; // Importa el componente del diagrama de Gantt

function App() {
  return (
    <div className="">
      <Router>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/IngreSuAd" element={<IngreSuAd />} />
          <Route path="/SubAdmi1" element={<SubAdmi1 />} />
          <Route path="/AgregarArea" element={<AgregarArea />} />
          <Route path="/SoliHEmple" element={<VEmpleadoH />} />
          <Route path="/AgregarSede" element={<AgregarSede />} />
          <Route path="/SolicitudesH" element={<SolicitudH />} />
          <Route path="/VaEmV" element={<VacaEmV />} />
          <Route path="/diagrama" element={<Diagrama />} /> {/* Agrega la ruta para el diagrama de Gantt */}
          <Route path="/Horarios" element={<Horarios />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
