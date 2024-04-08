import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './IngreSuAd.css';

const IngreSuAd = () => {
  const [usuario, setUsuario] = useState('');
  const [acceso, setAcceso] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
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
          <input className="v281_34"
            type="password"
            value={acceso}
            onChange={(e) => setAcceso(e.target.value)}
          />
        </label>

        <span className="v281_30">Ingresar Usuario:</span>
        <label>
          <input className="v281_35"
            type="text"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />
        </label>

        <div className="v281_31" onClick={handleInicioClick}>Cancelar</div>
       
        <div className="v281_36"></div>
        <div className="v281_37"></div>
        <div className="v281_38" onClick={handleSubmit}>Ingresar</div>
        <div className="v281_25">{error && <div>{error}</div>}</div>
      </form>
    </div>
  );
};

export default IngreSuAd;
