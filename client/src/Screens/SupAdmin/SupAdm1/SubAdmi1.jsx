import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import './css/main.css';

const Administradores = () => {
  const [administradores, setAdministradores] = useState([]);
  const [error, setError] = useState('');
  const [adminEditando, setAdminEditando] = useState(null); // Estado para almacenar el ID del administrador en edición
  const [adminCambios, setAdminCambios] = useState({}); // Estado para almacenar los cambios en el administrador
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
    sexo: true,
    cumpleanos: '',
    tipoTurno: ''
  });

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

  const agregarAdministrador = async (nuevoAdmin) => {
    try {
      await Axios.post("http://localhost:3001/usuarios/create", nuevoAdmin);
      fetchData();
      setError('');
      alert('Administrador agregado correctamente');
      // Reiniciar los valores del nuevo administrador
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
        sexo: true,
        cumpleanos: '',
        tipoTurno: ''
      });
    } catch (error) {
      console.error('Error al agregar el administrador:', error.message);
      setError('Error al agregar el administrador');
    }
  };

  const eliminarAdministrador = async (id) => {
    try {
      await Axios.delete(`http://localhost:3001/usuarios/delete/${id}`);
      fetchData();
      setError('');
      alert('Administrador eliminado correctamente');
    } catch (error) {
      console.error('Error al eliminar el administrador:', error.message);
      setError('Error al eliminar el administrador');
    }
  };

  const modificarAdministrador = async (id, adminActualizado) => {
    try {
      await Axios.put(`http://localhost:3001/usuarios/update/${id}`, adminActualizado);
      // Actualizar el estado local de administradores
      setAdministradores(prevAdministradores =>
        prevAdministradores.map(admin =>
          admin._id === id ? { ...admin, ...adminActualizado } : admin
        )
      );
      setError('');
      setAdminEditando(null); // Limpiar el estado de edición
      setAdminCambios({}); // Limpiar los cambios
      alert('Administrador modificado correctamente');
    } catch (error) {
      console.error('Error al modificar el administrador:', error.message);
      setError('Error al modificar el administrador');
    }
  };

  const handleInputChange = (e, id) => {
    const { name, value } = e.target;
    // Si el valor está vacío, elimina la clave del estado adminCambios[id] para que quede vacío
    setAdminCambios(prevState => ({
      ...prevState,
      [id]: {
        ...prevState[id],
        [name]: value === '' ? undefined : value
      }
    }));
  };

  const handleModificarClick = (admin) => {
    setAdminEditando(admin._id); // Establecer el ID del administrador en edición
    setAdminCambios({
      ...adminCambios,
      [admin._id]: { ...admin } // Copiar el estado actual del administrador en edición
    });
  };

  const handleGuardarClick = async (id) => {
    const adminActualizado = adminCambios[id];
    if (adminActualizado) {
      try {
        await modificarAdministrador(id, adminActualizado);
        alert('Cambios guardados correctamente');
      } catch (error) {
        console.error('Error al guardar los cambios:', error.message);
        setError('Error al guardar los cambios');
      }
    }
  };

  const handleNuevoAdminChange = (e) => {
    const { name, value } = e.target;
    setNuevoAdmin(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className="container">
      <div className="header">
        <Link to="/IngreSuAd" className="logo"></Link>
        <h1 className='title'>Control de Administradores</h1>
      </div>
      <div className='tabla'>
        <h2 className='row-agregar'>Agregar Administrador</h2>
        <form onSubmit={(e) => {
          e.preventDefault();
          agregarAdministrador(nuevoAdmin);
        }}>
          <div className='form-grid'>
            <div className="form-group">
              <label className='name'>
                Nombre:
                <input type="text" name="nombreempleado" value={nuevoAdmin.nombreempleado} onChange={handleNuevoAdminChange} />
              </label>
            </div>
            <div className="form-group">
              <label className='name'>
                Tipo de Usuario:
                <input type="text" name="tipoUsuario" value={nuevoAdmin.tipoUsuario} onChange={handleNuevoAdminChange} />
              </label>
            </div>
            <div className="form-group">
              <label className='name'>
                Acceso:
                <input type="text" name="acceso" value={nuevoAdmin.acceso} onChange={handleNuevoAdminChange} />
              </label>
            </div>
            <div className="form-group">
              <label className='name'>
                Apellido Paterno:
                <input type="text" name="apellidoP" value={nuevoAdmin.apellidoP} onChange={handleNuevoAdminChange} />
              </label>
            </div>
            <div className="form-group">
              <label className='name'>
                Apellido Materno:
                <input type="text" name="apellidoM" value={nuevoAdmin.apellidoM} onChange={handleNuevoAdminChange} />
              </label>
            </div>
            <div className="form-group">
              <label className='name'>
                Correo:
                <input type="email" name="correo" value={nuevoAdmin.correo} onChange={handleNuevoAdminChange} />
              </label>
            </div>
            <div className="form-group">
              <label className='name'>
                Rol:
                <input type="text" name="rol" value={nuevoAdmin.rol} onChange={handleNuevoAdminChange} />
              </label>
            </div>
            <div className="form-group">
              <label className='name'>
                Sede:
                <input type="text" name="sede" value={nuevoAdmin.sede} onChange={handleNuevoAdminChange} />
              </label>
            </div>
            <div className="form-group">
              <label className='name'>
                Área:
                <input type="text" name="area" value={nuevoAdmin.area} onChange={handleNuevoAdminChange} />
              </label>
            </div>
            <div className="group-s">
              <label className='selected'>
                Sexo:
                <select name="sexo" value={nuevoAdmin.sexo} onChange={handleNuevoAdminChange}>
                  <option value={true}>M</option>
                  <option value={false}>F</option>
                </select>
              </label>
            </div>
            <div className="form-group">
              <label className='name'>
                Cumpleaños:
                <input type="date" name="cumpleanos" value={nuevoAdmin.cumpleanos} onChange={handleNuevoAdminChange} />
              </label>
            </div>
            <div className="form-group">
              <label className='name'>
                Tipo de Turno:
                <input type="number" name="tipoTurno" value={nuevoAdmin.tipoTurno} onChange={handleNuevoAdminChange} />
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
                <td>
                  {adminEditando === admin._id ? (
                    <input type="text" name="nombreempleado" value={adminCambios[admin._id]?.nombreempleado || admin.nombreempleado} onChange={(e) => handleInputChange(e, admin._id)} />
                  ) : (
                    admin.nombreempleado
                  )}
                </td>
                <td>
                  {adminEditando === admin._id ? (
                    <input type="text" name="apellidoP" value={adminCambios[admin._id]?.apellidoP || admin.apellidoP} onChange={(e) => handleInputChange(e, admin._id)} />
                  ) : (
                    admin.apellidoP
                  )}
                </td>
                <td>
                  {adminEditando === admin._id ? (
                    <input type="text" name="apellidoM" value={adminCambios[admin._id]?.apellidoM || admin.apellidoM} onChange={(e) => handleInputChange(e, admin._id)} />
                  ) : (
                    admin.apellidoM
                  )}
                </td>
                <td>
                  {adminEditando === admin._id ? (
                    <input type="email" name="correo" value={adminCambios[admin._id]?.correo || admin.correo} onChange={(e) => handleInputChange(e, admin._id)} />
                  ) : (
                    admin.correo
                  )}
                </td>
                <td>
                  {adminEditando === admin._id ? (
                    <input type="text" name="acceso" value={adminCambios[admin._id]?.acceso || admin.acceso} onChange={(e) => handleInputChange(e, admin._id)} />
                  ) : (
                    admin.acceso
                  )}
                </td>
                <td>
                  {adminEditando === admin._id ? (
                    <input type="text" name="rol" value={adminCambios[admin._id]?.rol || admin.rol} onChange={(e) => handleInputChange(e, admin._id)} />
                  ) : (
                    admin.rol
                  )}
                </td>
                <td>
                  {adminEditando === admin._id ? (
                    <input type="text" name="sede" value={adminCambios[admin._id]?.sede || admin.sede} onChange={(e) => handleInputChange(e, admin._id)} />
                  ) : (
                    admin.sede
                  )}
                </td>
                <td>
                  {adminEditando === admin._id ? (
                    <input type="text" name="area" value={adminCambios[admin._id]?.area || admin.area} onChange={(e) => handleInputChange(e, admin._id)} />
                  ) : (
                    admin.area
                  )}
                </td>
                <td>
                  {adminEditando === admin._id ? (
                    <select name="sexo" value={adminCambios[admin._id]?.sexo || admin.sexo} onChange={(e) => handleInputChange(e, admin._id)}>
                      <option value={true}>M</option>
                      <option value={false}>F</option>
                    </select>
                  ) : (
                    admin.sexo ? 'M' : 'F'
                  )}
                </td>
                <td>
                  {adminEditando === admin._id ? (
                    <input type="date" name="cumpleanos" value={adminCambios[admin._id]?.cumpleanos || admin.cumpleanos} onChange={(e) => handleInputChange(e, admin._id)} />
                  ) : (
                    admin.cumpleanos
                  )}
                </td>
                <td>
                  {adminEditando === admin._id ? (
                    <input type="number" name="tipoTurno" value={adminCambios[admin._id]?.tipoTurno || admin.tipoTurno} onChange={(e) => handleInputChange(e, admin._id)} />
                  ) : (
                    admin.tipoTurno
                  )}
                </td>
                <td>
                  {adminEditando === admin._id ? (
                    <button className="button guardar" onClick={() => handleGuardarClick(admin._id)}>Guardar</button>
                  ) : (
                    <button className="button modificar" onClick={() => handleModificarClick(admin)}>Modificar</button>
                  )}
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
