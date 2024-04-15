import React, { useEffect, useRef, useState } from 'react';
import { DataSet, Timeline } from 'vis-timeline/standalone';
import 'vis-timeline/styles/vis-timeline-graph2d.css';
import axios from 'axios';
import { Link } from "react-router-dom";

function Diagrama() {
  const timelineRef = useRef(null);
  const [activitiesData, setActivitiesData] = useState([]);
  const [employeeData, setEmployeeData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/activi')
      .then(response => {
        setActivitiesData(response.data);
      })
      .catch(error => {
        console.error('Error fetching activities data:', error);
      });

    axios.get('http://localhost:3001/usuarios')
      .then(response => {
        setEmployeeData(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching employee data:', error);
      });
  }, []);

  useEffect(() => {
    const container = timelineRef.current;

    const itemsDataSet = new DataSet();
    const groupsDataSet = new DataSet();

    // Verificar si los datos de los empleados están cargados y son un array
    if (Array.isArray(employeeData)) {
      // Filtrar los empleados que tienen un nombre válido
      const validEmployees = employeeData.filter(employee => employee.nombreempleado);

      // Agregar los empleados válidos al conjunto de datos de grupos
      validEmployees.forEach(employee => {
        groupsDataSet.add({
          id: employee._id,
          content: employee.nombreempleado
        });
      });
    } else {
      console.error('employeeData is not an array:', employeeData);
    }

    // Verificar si los datos de las actividades están cargados y son un array
    if (Array.isArray(activitiesData)) {
      // Filtrar las actividades que tienen un nombre y fechas de inicio y fin válidas
      const validActivities = activitiesData.filter(activity => activity.nombre && activity.fechaInicio && activity.fechaFin);

      // Agregar las actividades válidas al conjunto de datos de ítems
      validActivities.forEach(activity => {
        const startDate = new Date(activity.fechaInicio);
        const endDate = new Date(activity.fechaFin);

        itemsDataSet.add({
          id: activity._id,
          content: activity.nombre,
          start: startDate,
          end: endDate,
          group: activity.empleado
        });
      });
    } else {
      console.error('activitiesData is not an array:', activitiesData);
    }

    const options = {
      orientation: {
        axis: 'top',
      },
      locale: 'es',
      groupOrder: 'content'
    };

    new Timeline(container, itemsDataSet, groupsDataSet, options);
  }, [activitiesData, employeeData]);

  return (
    <div>
      
      <div className="dia-container">
        <div className="dia-header">
          <div className="logo"></div>
          <Link to="/" className="regresar"></Link>
          <h1 className="dia-title">Diagrama de Gantt</h1>
        </div>
      </div>
      <div ref={timelineRef} style={{ height: '400px' }} />
    </div>
  );
}

export default Diagrama;
