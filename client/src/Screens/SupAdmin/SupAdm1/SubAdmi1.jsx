import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import "./SubAdmi1.css";
import CargaMasiva from './cargamasiva';

import { Link } from "react-router-dom";

// Opciones disponibles para el tipo de usuario
const opcionesTipoUsuario = ["Root", "Administrador", "Super Administrador", "Empleado"];

const Administradores = () => {
  // Estado para almacenar los administradores
  const [administradores, setAdministradores] = useState([]);
  // Estado para almacenar errores
  const [error, setError] = useState('');
  // Estado para almacenar la información del nuevo administrador
  const [nuevoAdmin, setNuevoAdmin] = useState({
    nombreempleado: '',
    apellidoP: '',
    apellidoM: '',
    usuario: '',
    tipoUsuario: '',
    acceso: '',
    correo: '',
    rol: '',
    sede: '',
    area: '',
    sexo: true,
    cumpleanos: ''
  });
  // Estado para almacenar las sedes
  const [sedes, setSedes] = useState([]);
  // Estado para almacenar las áreas de la sede seleccionada
  const [areasSede, setAreasSede] = useState([]);
  // Estado para determinar si se está modificando un administrador
  const [modoModificar, setModoModificar] = useState(false);

  // Función para obtener datos de sedes y administradores
  const fetchData = async () => {
    try {
      const sedesResponse = await Axios.get("http://localhost:3001/sede");
      setSedes(sedesResponse.data.data);
      const administradoresResponse = await Axios.get("http://localhost:3001/usuarios");
      setAdministradores(administradoresResponse.data.data);
    } catch (error) {
      console.error('Error al obtener datos:', error.message);
    }
  };

  // Se ejecuta al montar el componente para obtener los datos
  useEffect(() => {
    fetchData();
  }, []);

  // Función para manejar el cambio de sede
  const handleSedeChange = (e) => {
    const { value } = e.target;
    setNuevoAdmin(prevState => ({
      ...prevState,
      sede: value,
      area: '' 
    }));
    const sede = sedes.find(sede => sede.Nombre === value);
    if (sede) {
      setAreasSede(sede.Areas);
    } else {
      setAreasSede([]);
    }
  };

  // Función para manejar el cambio en los campos de entrada
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoAdmin(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Función para cancelar la modificación de un administrador
  const handleCancelarModificacion = () => {
    setNuevoAdmin({
      nombreempleado: '',
      apellidoP: '',
      apellidoM: '',
      usuario: '',
      tipoUsuario: '',
      acceso: '',
      correo: '',
      rol: '',
      sede: '',
      area: '',
      sexo: true,
      cumpleanos: ''
    });
    setModoModificar(false);
  };

  // Función para manejar el clic en el botón de modificar
  const handleModificarClick = (admin) => {
    setNuevoAdmin(admin);
    setModoModificar(true);
  };

  // Función para agregar un nuevo administrador
  const agregarAdministrador = async () => {
    // Validación de campos obligatorios
    if (
      !nuevoAdmin.nombreempleado ||
      !nuevoAdmin.apellidoP ||
      !nuevoAdmin.apellidoM ||
      !nuevoAdmin.usuario ||
      !nuevoAdmin.tipoUsuario ||
      !nuevoAdmin.acceso ||
      !nuevoAdmin.correo ||
      !nuevoAdmin.rol ||
      !nuevoAdmin.sede ||
      !nuevoAdmin.area ||
      !nuevoAdmin.cumpleanos
    ) {
      setError('Por favor completa todos los campos');
      return;
    }

    try {
      await Axios.post("http://localhost:3001/usuarios/create", nuevoAdmin);
      fetchData(); // Vuelve a obtener los datos después de agregar un nuevo administrador
      setError('');
      setNuevoAdmin({
        nombreempleado: '',
        apellidoP: '',
        apellidoM: '',
        usuario: '',
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

  // Función para eliminar un administrador
  const eliminarAdministrador = async (id) => {
    try {
      await Axios.delete(`http://localhost:3001/usuarios/delete/${id}`);
      fetchData(); // Vuelve a obtener los datos después de eliminar un administrador
      setError('');
      alert('Usuario eliminado correctamente');
    } catch (error) {
      console.error('Error al eliminar el usuario:', error.message);
      setError('Error al eliminar el usuario');
    }
  };

  // Función para modificar un administrador
  const modificarAdministrador = async () => {
    try {
      const id = nuevoAdmin._id;
      const newData = { ...nuevoAdmin };
      delete newData._id;
      await Axios.put(`http://localhost:3001/usuarios/update/${id}`, newData);
      fetchData(); // Vuelve a obtener los datos después de modificar un administrador
      setError('');
      setNuevoAdmin({
        nombreempleado: '',
        apellidoP: '',
        apellidoM: '',
        usuario: '',
        tipoUsuario: '',
        acceso: '',
        correo: '',
        rol: '',
        sede: '',
        area: '',
        sexo: true,
        cumpleanos: ''
      });
      setModoModificar(false);
      alert('Usuario modificado correctamente');
    } catch (error) {
      console.error('Error al modificar el usuario:', error.message);
      setError('Error al modificar el usuario');
    }
  };

  return (
    <div className="container">
      <div className="header">
        <div className="logo"></div>
        <h1>Control de Usuarios</h1>
        <Link to="/IngreSuAd" className="salir">
          <img src="SupAdm1/images/v65_16.png" alt="Salir" className="salir-imagen" />
        </Link>
      </div>
      {/* Formulario para agregar/Modificar usuario */}
      <div className='tabla'>
        <h2 className='row-agregar'>Agregar Usuario</h2>
        <form onSubmit={(e) => {
          e.preventDefault();
          if (modoModificar) {
            modificarAdministrador();
          } else {
            agregarAdministrador();
          }
        }}>
          <div className='form-grid'>
            {/* Campos del formulario */}
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
                Cumpleaños:
                <input type="date" name="cumpleanos" value={nuevoAdmin.cumpleanos} onChange={handleInputChange} />
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
                Correo:
                <input type="email" name="correo" value={nuevoAdmin.correo} onChange={handleInputChange} />
              </label>
            </div>
            <div className="form-group">
              <label className='name'>
                Acceso (Contraseña):
                <input type={modoModificar ? "text" : "password"} name="acceso" value={nuevoAdmin.acceso} onChange={handleInputChange} />
              </label>
            </div>
            <div className="form-group">
              <label className='name'>
                Usuario:
                <input type="text" name="usuario" value={nuevoAdmin.usuario} onChange={handleInputChange} />
              </label>
            </div>
            <div className="form-group">
              <label className='name'>
                Tipo de Usuario:
                <select name="tipoUsuario" value={nuevoAdmin.tipoUsuario} onChange={handleInputChange}>
                  <option value="">Seleccionar tipo de usuario</option>
                  {opcionesTipoUsuario.map((opcion, index) => (
                    <option key={index} value={opcion}>{opcion}</option>
                  ))}
                </select>
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
                    <option key={index} value={sede.Nombre}>{sede.Nombre}</option>
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
                    <option key={index} value={area.NombreArea}>{area.NombreArea}</option>
                  ))}
                </select>
              </label>
            </div>
          </div>
          <div>
            <button className="button agregar" type="submit">{modoModificar ? 'Modificar' : 'Agregar Usuario'}</button>
            <div><CargaMasiva></CargaMasiva></div>
            {modoModificar && <button style={{ backgroundColor: 'red', color: 'white' }} className="button cancelar" onClick={handleCancelarModificacion}>Cancelar</button>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
          </div>
        </form>
      </div>
      {/* Tabla de administradores */}
      <div className='table'>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido Paterno</th>
              <th>Apellido Materno</th>
              <th>Cumpleaños</th>
              <th>Sexo</th>
              <th>Correo</th>
              <th>Acceso</th>
              <th>Usuario</th>
              <th>Tipo de Usuario</th>
              <th>Rol</th>
              <th>Sede</th>
              <th>Área</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {administradores.map((admin) => (
              <tr key={admin._id}>
                {/* Datos de cada administrador */}
                <td>{admin.nombreempleado}</td>
                <td>{admin.apellidoP}</td>
                <td>{admin.apellidoM}</td>
                <td>{admin.cumpleanos}</td>
                <td>{admin.sexo ? 'M' : 'F'}</td>
                <td>{admin.correo}</td>
                <td>{modoModificar ? admin.acceso : '********'}</td>
                <td>{admin.usuario}</td>
                <td>{admin.tipoUsuario}</td>
                <td>{admin.rol}</td>
                <td>{admin.sede}</td>
                <td>{admin.area}</td>
                <td>
                  <button className="button modificar" onClick={() => handleModificarClick(admin)}>Modificar</button>
                  <button className="button eliminar" onClick={() => eliminarAdministrador(admin._id)}>Eliminar</button>
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
