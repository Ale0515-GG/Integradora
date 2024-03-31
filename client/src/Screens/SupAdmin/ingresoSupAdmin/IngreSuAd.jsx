import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 


const IngreSuAd = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validaciones
    if (username.trim() === '') {
      setError('Por favor ingresa un usuario');
      return;
    }

    if (password.trim() === '') {
      setError('Por favor ingresa una contraseña');
      return;
    }

    navigate('/SubAdmi1');
  };

  return (
    <div className="v281_42">
      <form onSubmit={handleSubmit}>
        <div className="v281_43">Iniciar Sesión</div>
        <div className="v281_44">
          <label>
            Ingresar Usuario:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
        </div>
        <div className="v281_45">
          <label>
            Ingresar Contraseña:
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>
        <div className="v281_46">
          <label>
            <input
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />{' '}
            Mostrar Contraseña
          </label>
        </div>
        {error && <div className="error">{error}</div>}
        <div className="v281_51">
          <button type="submit">Ingresar</button>
          <button type="button">Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default IngreSuAd;
