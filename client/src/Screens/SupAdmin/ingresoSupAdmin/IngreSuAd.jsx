import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './css/ingreSuAd.css';

function IngreSuAd() {
  const [usuario, setUsuario] = useState('');
  const [acceso, setAcceso] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!usuario || !acceso) {
        setError('Por favor, ingresa el usuario y la contraseña.');
        return;
      }

      const response = await axios.post(`http://localhost:3001/usuarios/login`, {
        usuario: usuario,
        acceso: acceso,
      });

      const data = response.data;

      if (response.status === 200) {
        console.log('Inicio de sesión exitoso:', data);
        switch (data.tipoUsuario) {
          case 'Super Administrador':
            navigate('/AgregarAreas');
            break;
          case 'Administrador':
            navigate('/AgregarSedes');
            break;
          case 'Empleado':
            navigate('/Inicio');
            break;
          case 'Root': 
            navigate('/NavegacionEmpleado');
            break;
          default:
            console.log('Tipo de usuario desconocido');
            break;
        }
      } else {
        if (response.status === 401 && data.message === "Usuario no encontrado") {
          setError('El usuario ingresado no existe.');
        } else {
          setError('Contraseña incorrecta. Por favor, inténtalo de nuevo.');
        }
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      if (error.response) {
        // Error de respuesta del servidor
        setError(error.response.data.message || 'Error al iniciar sesión. Por favor, inténtalo de nuevo más tarde.');
      } else if (error.request) {
        // Error de comunicación con el servidor
        setError('Error de comunicación con el servidor. Por favor, inténtalo de nuevo más tarde.');
      } else {
        // Error en el cliente
        setError('Error inesperado. Por favor, inténtalo de nuevo más tarde.');
      }
    }
  };

  const handleInicioClick = () => {
    navigate('/');
  };

  return (
    <div className="v130_80">
      <form onSubmit={handleSubmit}>
        <div className="v130_89"></div>
        <div className="v143_42"></div>
        <div className="v281_26"></div>

        <span className="v281_27">Iniciar Sesión</span>

        <div className="v281_29">Ingresar Contraseña:</div>
        <label>
          <input
            className="v281_34"
            type="password"
            value={acceso}
            onChange={(e) => setAcceso(e.target.value)}
          />
        </label>

        <span className="v281_30">Ingresar Usuario:</span>
        <label>
          <input
            className="v281_35"
            type="text"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />
        </label>

        <div className="v281_31" onClick={handleInicioClick}>Cancelar</div>

        <div className="v281_36"></div>
        <div className="v281_37"></div>
        <button className="v281_38" type="submit">Ingresar</button>
        <div className="v281_25">{error && <div>{error}</div>}</div>
      </form>
    </div>
  );
}

export default IngreSuAd;
