import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import "./SubAdmi1.css";


const opcionesTipoUsuario = ["Root", "Administrador", "Super Administrador", "Empleado"];

const Administradores = () => {
  const [administradores, setAdministradores] = useState([]);
  const [error, setError] = useState('');
  const [adminEditando, setAdminEditando] = useState(null);
  const [adminCambios, setAdminCambios] = useState({});
  const [nuevoAdmin, setNuevoAdmin] = useState({
    nombreempleado: '',
    tipoUsuario: '',
    acceso: '',
    apellidoP: '',
    apellidoM: '',
    corre2o: '',
    rol: '',
    sede: '',
    area: '',
    sexo: true,
    cumpleanos: '',
    tipoTurno: ''
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
        cumpleanos: '',
        tipoTurno: ''
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

  const modificarAdministrador = async (id, adminActualizado) => {
    try {
      await Axios.put(`http://localhost:3001/usuarios/update/${id}`, adminActualizado);
      setAdministradores(prevAdministradores =>
        prevAdministradores.map(admin =>
          admin._id === id ? { ...admin, ...adminActualizado } : admin
        )
      );
      setError('');
      setAdminEditando(null);
      setAdminCambios({});
      alert('Usuario modificado correctamente');
    } catch (error) {
      console.error('Error al modificar el Usuario:', error.message);
      setError('Error al modificar el Usuario');
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
    setAdminEditando(admin._id);
    setAdminCambios({
      ...adminCambios,
      [admin._id]: { ...admin }
    });
  };

  const handleGuardarClick = async (id) => {
    const adminActualizado = adminCambios[id];
    if (adminActualizado) {
      try {
        await modificarAdministrador(id, { ...adminActualizado });
        alert('Cambios guardados correctamente');
      } catch (error) {
        console.error('Error al guardar los cambios:', error.message);
        setError('Error al guardar los cambios');
      }
    }
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
            <div className="form-group">
              <label className='name'>
                Tipo de Turno:
                <input type="number" name="tipoTurno" value={nuevoAdmin.tipoTurno} onChange={handleInputChange} />
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
                  <select name="tipoUsuario" value={adminCambios[admin._id]?.tipoUsuario || admin.tipoUsuario} onChange={(e) => handleTipoUsuarioChange(e, admin._id)}>
                    <option value="">Seleccionar tipo de usuario</option>
                    {opcionesTipoUsuario.map((opcion, index) => (
                      <option key={index} value={opcion}>{opcion}</option>
                    ))}
                  </select>
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
                    <input type="email" name="correo" value={adminCambios[admin._id]?.correo || admin.correo} onChange={(e) => handleInputChange(e, admin._id)} />
                  ) : (
                    admin.correo
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
                  <select name="sexo" value={adminCambios[admin._id]?.sexo || admin.sexo} onChange={(e) => handleInputChange(e, admin._id)}>
                    <option value={true}>M</option>
                    <option value={false}>F</option>
                  </select>
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
