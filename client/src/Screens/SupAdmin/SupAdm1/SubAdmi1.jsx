import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import "./SubAdmi1.css";

const opcionesTipoUsuario = ["Root", "Administrador", "Super Administrador", "Empleado"];

const Administradores = () => {
  const [administradores, setAdministradores] = useState([]);
  const [error, setError] = useState('');
  const [nuevoAdmin, setNuevoAdmin] = useState({
    _id: '', // Campo oculto para almacenar el ID del usuario seleccionado
    nombreempleado: '',
    tipoUsuario: '',
    acceso: '',
    apellidoP: '',
    apellidoM: '',
    correo: '',
    rol: '',
    sede: '',
    area: '',
    sexo: true,
    cumpleanos: ''
  });
  const [sedes, setSedes] = useState([]);
  const [areasSede, setAreasSede] = useState([]);

  useEffect(() => {
    fetchData();
    fetchSedes();
  }, []);

  const fetchData = async () => {
    try {
      const response = await Axios.get("http://localhost:3001/usuarios");
      setAdministradores(response.data.data);
    } catch (error) {
      console.error('Error al obtener los usuarios:', error.message);
    }
  };

  const fetchSedes = async () => {
    try {
      const response = await Axios.get("http://localhost:3001/sedes");
      setSedes(response.data.data);
    } catch (error) {
      console.error('Error al obtener las sedes:', error.message);
    }
  };

  const agregarAdministrador = async () => {
    try {
      await Axios.post("http://localhost:3001/usuarios/create", nuevoAdmin);
      fetchData();
      setError('');
      setNuevoAdmin({
        nombreempleado: '',
        apellidoP: '',
        apellidoM: '',
        tipoUsuario: '',
        acceso: '',
        correo: '',
        rol: '',
        sede: '',
        area: '',
        sexo: true,
        cumpleanos: ''
      });
      alert('Usuario agregado correctamente');
    } catch (error) {
      console.error('Error al agregar el usuario:', error.message);
      setError('Error al agregar el usuario');
    }
  };

  const eliminarAdministrador = async (id) => {
    try {
      await Axios.delete(`http://localhost:3001/usuarios/delete/${id}`);
      fetchData();
      setError('');
      alert('Usuario eliminado correctamente');
    } catch (error) {
      console.error('Error al eliminar el usuario:', error.message);
      setError('Error al eliminar el usuario');
    }
  };

  const modificarAdministrador = async () => {
    try {
      const id = nuevoAdmin._id;
      const newData = {
        nombreempleado: nuevoAdmin.nombreempleado,
        tipoUsuario: nuevoAdmin.tipoUsuario,
        acceso: nuevoAdmin.acceso,
        apellidoP: nuevoAdmin.apellidoP,
        apellidoM: nuevoAdmin.apellidoM,
        correo: nuevoAdmin.correo,
        rol: nuevoAdmin.rol,
        sede: nuevoAdmin.sede,
        area: nuevoAdmin.area,
        sexo: nuevoAdmin.sexo,
        cumpleanos: nuevoAdmin.cumpleanos
      };
      await Axios.put(`http://localhost:3001/usuarios/update/${id}`, newData);
      fetchData();
      setError('');
      alert('Usuario modificado correctamente');
    } catch (error) {
      console.error('Error al modificar el usuario:', error.message);
      setError('Error al modificar el usuario');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoAdmin(prevState => ({
      ...prevState,
      [name]: value === '' ? undefined : value
    }));
  };

  const handleTipoUsuarioChange = (e) => {
    const { value } = e.target;
    setNuevoAdmin(prevState => ({
      ...prevState,
      tipoUsuario: value
    }));
  };

  const handleSedeChange = (e) => {
    const { value } = e.target;
    setNuevoAdmin(prevState => ({
      ...prevState,
      sede: value
    }));
    const areas = sedes.find(sede => sede.nombre === value)?.areas || [];
    setAreasSede(areas);
  };

  const handleModificarClick = (admin) => {
    setNuevoAdmin(admin);
  };

  const handleSubmitModificacion = (e) => {
    e.preventDefault();
    modificarAdministrador();
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Control de Usuarios</h1>
      </div>
      <div className='tabla'>
        <h2 className='row-agregar'>Agregar Usuario</h2>
        <form onSubmit={(e) => {
          e.preventDefault();
          agregarAdministrador();
        }}>
          <div className='form-grid'>
            <div className="form-group">
              <label className='name'>
                Nombre:
                <input type="text" name="nombreempleado" value={nuevoAdmin.nombreempleado} onChange={handleInputChange} />
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
                Tipo de Usuario:
                <select name="tipoUsuario" value={nuevoAdmin.tipoUsuario} onChange={handleTipoUsuarioChange}>
                  <option value="">Seleccionar tipo de usuario</option>
                  {opcionesTipoUsuario.map((opcion, index) => (
                    <option key={index} value={opcion}>{opcion}</option>
                  ))}
                </select>
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
                <select name="sede" value={nuevoAdmin.sede} onChange={handleSedeChange}>
                  <option value="">Seleccionar sede</option>
                  {sedes.map((sede, index) => (
                    <option key={index} value={sede.nombre}>{sede.nombre}</option>
                  ))}
                </select>
              </label>
            </div>
            <div className="form-group">
              <label className='name'>
                Área:
                <select name="area" value={nuevoAdmin.area} onChange={handleInputChange}>
                  <option value="">Seleccionar área</option>
                  {areasSede.map((area, index) => (
                    <option key={index} value={area}>{area}</option>
                  ))}
                </select>
              </label>
            </div>
            <div className="form-group">
              <label className='name'>
                Sexo:
                <select name="sexo" value={String(nuevoAdmin.sexo)} onChange={handleInputChange}>
                  <option value="true">M</option>
                  <option value="false">F</option>
                </select>
              </label>
            </div>
            <div className="form-group">
              <label className='name'>
                Cumpleaños:
                <input type="date" name="cumpleanos" value={nuevoAdmin.cumpleanos} onChange={handleInputChange} />
              </label>
            </div>
          </div>
          <button className="button agregar" type="submit">Agregar Usuario</button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
      </div>
      <div className='table'>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido Paterno</th>
              <th>Apellido Materno</th>
              <th>Tipo de Usuario</th>
              <th>Acceso</th>
              <th>Correo</th>
              <th>Rol</th>
              <th>Sede</th>
              <th>Área</th>
              <th>Sexo</th>
              <th>Cumpleaños</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {administradores.map((admin) => (
              <tr key={admin._id}>
                <td>{admin.nombreempleado}</td>
                <td>{admin.apellidoP}</td>
                <td>{admin.apellidoM}</td>
                <td>{admin.tipoUsuario}</td>
                <td>{admin.acceso}</td>
                <td>{admin.correo}</td>
                <td>{admin.rol}</td>
                <td>{admin.sede}</td>
                <td>{admin.area}</td>
                <td>{admin.sexo ? 'M' : 'F'}</td>
                <td>{admin.cumpleanos}</td>
                <td>
                  <button className="button eliminar" onClick={() => eliminarAdministrador(admin._id)}>Eliminar</button>
                  {/* Botón o enlace para modificar usuario */}
                  <button className="button modificar" onClick={() => handleModificarClick(admin)}>Modificar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Formulario de modificación de usuario */}
      {nuevoAdmin._id && (
        <div className='form-modificar'>
          <h2>Modificar Usuario</h2>
          <form onSubmit={handleSubmitModificacion}>
            {/* Campos de modificación */}
            <button className="button modificar" type="submit">Guardar Cambios</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Administradores;
