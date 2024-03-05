import React from 'react';
import './App.css'; // Importa el archivo CSS aquí

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import SaAgregar from './Screens/Agregar/SA_Agregar';

import SAModificar from './Screens/Modificar/SA_Modificar';

function App() {
  return (
    <div className=''>
      <Router>
        <Routes>
          <Route path="/SA_Agregar" element={<SaAgregar />} />
          <Route path="/Inicio" element={<VerInicio />} />
          <Route path="/SA_Modificar" element={<SAModificar />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
