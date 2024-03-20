import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import './css/main.css';

const Administradores = () => {
  const [administradores, setAdministradores] = useState([]);
  const [nuevoAdmin, setNuevoAdmin] = useState({
    nombreempleado: '',
    apellidoP: '',
    apellidoM: '',
    correo: '',
    acceso: '',
    rol: '',
    sede: '',
    area: '',
    sexo: '',
    cumpleanos: '',
    tipoTurno: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await Axios.get("http://localhost:3001/administradores");
      setAdministradores(response.data.data);
    } catch (error) {
      console.error('Error al obtener los administradores:', error.message);
    }
  };

  const agregarAdministrador = async () => {
    try {
      await Axios.post("http://localhost:3001/administradores/create", nuevoAdmin);
      setNuevoAdmin({
        nombreempleado: '',
        apellidoP: '',
        apellidoM: '',
        correo: '',
        acceso: '',
        rol: '',
        sede: '',
        area: '',
        sexo: '',
        cumpleanos: '',
        tipoTurno: ''
      });
      fetchData(); // Actualizar la lista de administradores después de agregar uno nuevo
    } catch (error) {
      console.error('Error al agregar el administrador:', error.message);
    }
  };

  const eliminarAdministrador = async (correo) => {
    try {
      await Axios.delete(`http://localhost:3001/administradores/delete/${correo}`);
      fetchData(); // Actualizar la lista de administradores después de eliminar uno
    } catch (error) {
      console.error('Error al eliminar el administrador:', error.message);
    }
  };

  const modificarAdministrador = async (correo, nuevoAdminData) => {
    try {
      await Axios.put(`http://localhost:3001/administradores/update/${correo}`, nuevoAdminData);
      fetchData(); // Actualizar la lista de administradores después de modificar uno
    } catch (error) {
      console.error('Error al modificar el administrador:', error.message);
    }
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
          <input type="text" value={nuevoAdmin.nombreempleado} onChange={(e) => setNuevoAdmin({ ...nuevoAdmin, nombreempleado: e.target.value })} />
        </label>
        </div>
        <br />
        <div className="form-group">
        <label className='name'>
          Apellido Paterno:
          <input type="text" value={nuevoAdmin.apellidoP} onChange={(e) => setNuevoAdmin({ ...nuevoAdmin, apellidoP: e.target.value })} />
        </label>
        </div>
        <br />
        <div className="form-group">
        <label className='name'>
          Apellido Materno:
          <input type="text" value={nuevoAdmin.apellidoM} onChange={(e) => setNuevoAdmin({ ...nuevoAdmin, apellidoM: e.target.value })} />
        </label>
        </div>
        <br />
        <div className="form-group">
        <label className='name'>
          Correo:
          <input type="email" value={nuevoAdmin.correo} onChange={(e) => setNuevoAdmin({ ...nuevoAdmin, correo: e.target.value })} />
        </label>
        </div>
        <br />
        <div className="form-group">
        <label className='name'>
          Acceso:
          <input type="text" value={nuevoAdmin.acceso} onChange={(e) => setNuevoAdmin({ ...nuevoAdmin, acceso: e.target.value })} />
        </label>
        </div>
        <br />
        <div className="form-group">
        <label className='name'>
          Rol:
          <input type="text" value={nuevoAdmin.rol} onChange={(e) => setNuevoAdmin({ ...nuevoAdmin, rol: e.target.value })} />
        </label>
        </div>
        <br />
        <div className="form-group">
        <label className='name'>
          Sede:
          <input type="text" value={nuevoAdmin.sede} onChange={(e) => setNuevoAdmin({ ...nuevoAdmin, sede: e.target.value })} />
        </label>
        </div>
        <br />
        <div className="form-group">
        <label className='name'>
          Área:
          <input type="text" value={nuevoAdmin.area} onChange={(e) => setNuevoAdmin({ ...nuevoAdmin, area: e.target.value })} />
        </label>
        </div>
        <br />
        <div className="form-group">
        <label className='name'>
          Sexo:
          <input type="text" value={nuevoAdmin.sexo} onChange={(e) => setNuevoAdmin({ ...nuevoAdmin, sexo: e.target.value })} />
        </label>
        </div>
        <br />
        <div className="form-group">
        <label className='name'>
          Cumpleaños:
          <input type="text" value={nuevoAdmin.cumpleanos} onChange={(e) => setNuevoAdmin({ ...nuevoAdmin, cumpleanos: e.target.value })} />
        </label>
        </div>
        <br />
        <div className="form-group">
        <label className='name'>
          Tipo de Turno:
          <input type="text" value={nuevoAdmin.tipoTurno} onChange={(e) => setNuevoAdmin({ ...nuevoAdmin, tipoTurno: e.target.value })} />
        </label>
        </div>
        <br />
        </div>
        <button className="button agregar"  type="submit">Agregar Administrador</button>

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
            {administradores.map((admin, index) => (
              <tr key={index}>
                <td>{admin.nombreempleado}</td>
                <td>{admin.apellidoP}</td>
                <td>{admin.apellidoM}</td>
                <td>{admin.correo}</td>
                <td>{admin.acceso}</td>
                <td>{admin.rol}</td>
                <td>{admin.sede}</td>
                <td>{admin.area}</td>
                <td>{admin.sexo}</td>
                <td>{admin.cumpleanos}</td>
                <td>{admin.tipoTurno}</td>
                <td>
                  <button className="button eliminar" onClick={() => eliminarAdministrador(admin.correo)}>Eliminar</button>
                  <button className="button modificar" onClick={() => modificarAdministrador(admin.correo, { nombreempleado: '' })}>Modificar</button>
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
