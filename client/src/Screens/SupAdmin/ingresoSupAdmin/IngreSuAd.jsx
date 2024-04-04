// IngreSuAd.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
 // Asegúrate de que la ruta sea correcta
 import './IngreSuAd.css'




const IngreSuAd = () => {
  const [usuario, setUsuario] = useState('');
  const [acceso, setAcceso] = useState('');
  const [ setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const existeUsuario = await axios.post('http://localhost:3001/usuarios/verificarUsuario', { usuario });
      if (!existeUsuario.data.success) {
        setError('El usuario no existe');
        return;
      }

      const response = await axios.post('http://localhost:3001/usuarios/login', { usuario, acceso });
      if (response.data.success) {
        navigate('/SubAdmi1');
      } else {
        setError('Credenciales incorrectas');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setError('Error al iniciar sesión. Por favor, inténtalo de nuevo.');
    }
  };

  return (

    <div class="v130_80">
    <form onSubmit={handleSubmit}>
    <div class="v130_81"></div>
    <div class="v130_89"></div>
    <div class="v143_42"></div>
    <div class="v281_26"></div><span class="v281_27">Iniciar Sesión</span><span class="v281_28">Mostrar
        Contraseña</span>
        <span class="v281_29"><label>
            Ingresar Contraseña:
            <input
              type="password"
              value={acceso}
              onChange={(e) => setAcceso(e.target.value)}
            />
          </label>
        </span>
        <span class="v281_30">
          <label>
            Ingresar Usuario:
            <input
              type="text"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
            />
          </label>
        </span>
    <div class="v281_33"></div>
    <div class="v281_34"></div>
    <div class="v281_35"></div>
    <div class="v281_36"></div>
    <div class="v281_37"></div>

    </form>
</div>
  );
};

export default IngreSuAd;
