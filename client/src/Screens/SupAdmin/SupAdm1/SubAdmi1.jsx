import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import './css/main.css';

const Administradores = () => {
  const [administradores, setAdministradores] = useState([]);
  const [nuevoAdmin, setNuevoAdmin] = useState({
    nombreempleado: '',
    tipoUsuario: '',
    acceso: '',
    apellidoP: '',
    apellidoM: '',
    correo: '',
    rol: '',
    sede: '',
    area: '',
    sexo: false,
    cumpleanos: '',
    tipoTurno: 0
  });
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await Axios.get("http://localhost:3001/usuarios");
      setAdministradores(response.data.data);
    } catch (error) {
      console.error('Error al obtener los administradores:', error.message);
    }
  };

  const agregarAdministrador = async () => {
    // Validar que ningún campo esté vacío
    const camposVacios = Object.values(nuevoAdmin).some(value => value === '');
    if (camposVacios) {
      setError('Por favor completa todos los campos.');
      return;
    }

    try {
      await Axios.post("http://localhost:3001/usuarios/create", nuevoAdmin);
      setNuevoAdmin({
        nombreempleado: '',
        tipoUsuario: '',
        acceso: '',
        apellidoP: '',
        apellidoM: '',
        correo: '',
        rol: '',
        sede: '',
        area: '',
        sexo: false,
        cumpleanos: '',
        tipoTurno: 0
      });
      fetchData(); // Actualizar la lista de administradores después de agregar uno nuevo
      setError(''); // Limpiar mensaje de error después de agregar
    } catch (error) {
      console.error('Error al agregar el administrador:', error.message);
    }
  };

  const eliminarAdministrador = async (id) => {
    try {
      await Axios.delete(`http://localhost:3001/usuarios/delete/${id}`);
      fetchData(); // Actualizar la lista de administradores después de eliminar uno
    } catch (error) {
      console.error('Error al eliminar el administrador:', error.message);
    }
  };

  const modificarAdministrador = async (id, nuevoAdminData) => {
    try {
      await Axios.put(`http://localhost:3001/usuarios/update/${id}`, nuevoAdminData);
      fetchData(); // Actualizar la lista de administradores después de modificar uno
    } catch (error) {
      console.error('Error al modificar el administrador:', error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoAdmin({ ...nuevoAdmin, [name]: value });
  };

  return (
    <div className="container">
      <div className="header">
        <Link to="/IngreSuAd" className="logo"></Link>
        <h1 className='title'>Control de Administradores</h1>
      </div>
      <div className='tabla'>
        <h2 className='row-agregar'>Agregar Administrador</h2>
        <form onSubmit={(e) => { e.preventDefault(); agregarAdministrador(); }}>
          <div className='form-grid'>
            <div className="form-group">
              <label className='name'>
                Nombre:
                <input type="text" name="nombreempleado" value={nuevoAdmin.nombreempleado} onChange={handleInputChange} />
              </label>
            </div>
            <div className="form-group">
              <label className='name'>
                Tipo de Usuario:
                <input type="text" name="tipoUsuario" value={nuevoAdmin.tipoUsuario} onChange={handleInputChange} />
              </label>
            </div>
            <div className="form-group">
              <label className='name'>
                Acceso:
                <input type="text" name="acceso" value={nuevoAdmin.acceso} onChange={handleInputChange} />
              </label>
            </div>
            <div className="form-group">
              <label className='name'>
                Apellido Paterno:
                <input type="text" name="apellidoP" value={nuevoAdmin.apellidoP} onChange={handleInputChange} />
              </label>
            </div>
            <div className="form-group">
              <label className='name'>
                Apellido Materno:
                <input type="text" name="apellidoM" value={nuevoAdmin.apellidoM} onChange={handleInputChange} />
              </label>
            </div>
            <div className="form-group">
              <label className='name'>
                Correo:
                <input type="email" name="correo" value={nuevoAdmin.correo} onChange={handleInputChange} />
              </label>
            </div>
            <div className="form-group">
              <label className='name'>
                Rol:
                <input type="text" name="rol" value={nuevoAdmin.rol} onChange={handleInputChange} />
              </label>
            </div>
            <div className="form-group">
              <label className='name'>
                Sede:
                <input type="text" name="sede" value={nuevoAdmin.sede} onChange={handleInputChange} />
              </label>
            </div>
            <div className="form-group">
              <label className='name'>
                Área:
                <input type="text" name="area" value={nuevoAdmin.area} onChange={handleInputChange} />
              </label>
            </div>
            <div className="group-s">
              <label className='selected'>
                Sexo:
                <select name="sexo" value={nuevoAdmin.sexo} onChange={handleInputChange}>
                  <option value={true}>M</option>
                  <option value={false}>F</option>
                </select>
              </label>
            </div>
            <div className="form-group">
              <label className='name'>
                Cumpleaños:
                <input type="date" name="cumpleanos" value={nuevoAdmin.cumpleanos} onChange={handleInputChange} />
              </label>
            </div>
            <div className="form-group">
              <label className='name'>
                Tipo de Turno:
                <input type="number" name="tipoTurno" value={nuevoAdmin.tipoTurno} onChange={handleInputChange} />
              </label>
            </div>
          </div>
          <button className="button agregar" type="submit">Agregar Administrador</button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
      </div>
      <div className='table'>
        <h2 className='row'>Lista de Administradores</h2>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido Paterno</th>
              <th>Apellido Materno</th>
              <th>Correo</th>
              <th>Acceso</th>
              <th>Rol</th>
              <th>Sede</th>
              <th>Área</th>
              <th>Sexo</th>
              <th>Cumpleaños</th>
              <th>Tipo de Turno</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {administradores.map((admin) => (
              <tr key={admin._id}>
                <td>{admin.nombreempleado}</td>
                <td>{admin.apellidoP}</td>
                <td>{admin.apellidoM}</td>
                <td>{admin.correo}</td>
                <td>{admin.acceso}</td>
                <td>{admin.rol}</td>
                <td>{admin.sede}</td>
                <td>{admin.area}</td>
                <td>{admin.sexo ? 'Masculino' : 'Femenino'}</td>
                <td>{admin.cumpleanos}</td>
                <td>{admin.tipoTurno}</td>
                <td>
                  <button className="button eliminar" onClick={() => eliminarAdministrador(admin._id)}>Eliminar</button>
                  <button className="button modificar" onClick={() => modificarAdministrador(admin._id, { nombreempleado: '' })}>Modificar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Administradores;
