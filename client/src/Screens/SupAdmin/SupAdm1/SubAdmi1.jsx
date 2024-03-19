import React, { useState } from 'react';
import './css/main.css';
import { Link } from 'react-router-dom';

const Administradores = () => {
  const [administradores, setAdministradores] = useState([
    {
      nombreempleado: 'Miguel',
      apellidoP: 'Rodriguez',
      apellidoM: 'Lopez',
      correo: 'rodriguez@gmail.com',
      acceso: '12345',
      rol: 'Senior',
      sede: 'Mexico',
      area: 'Desarrollo de Software',
      sexo: 'M',
      cumpleanos: '15/07/1998',
      tipoTurno: '1'
    },
    {
      nombreempleado: 'Abdiel',
      apellidoP: 'Duarte',
      apellidoM: 'Mancilla',
      correo: 'duarte11@gmail.com',
      acceso: '123456',
      rol: 'Junior',
      sede: 'Mexico',
      area: 'Recursos Humanos',
      sexo: 'M',
      cumpleanos: '21/10/2000',
      tipoTurno: '2'
    }
  ]);

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

  const agregarAdministrador = () => {
    setAdministradores([...administradores, nuevoAdmin]);
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
  };

  const eliminarAdministrador = (correo) => {
    setAdministradores(administradores.filter(admin => admin.correo !== correo));
  };

  const modificarAdministrador = (correo, nuevoAdminData) => {
    setAdministradores(administradores.map(admin => {
      if (admin.correo === correo) {
        return { ...admin, ...nuevoAdminData };
      }
      return admin;
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
