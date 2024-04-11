import React, { useEffect, useRef, useState } from 'react';
import { DataSet, Timeline } from 'vis-timeline/standalone';
import 'vis-timeline/styles/vis-timeline-graph2d.css';
import axios from 'axios';

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
        setEmployeeData(response.data.data); // Corregido: se utiliza response.data.data
      })
      .catch(error => {
        console.error('Error fetching employee data:', error);
      });
  }, []);

  useEffect(() => {
    const container = timelineRef.current;

    const itemsDataSet = new DataSet();
    const groupsDataSet = new DataSet();

    // Verificar si los datos están cargados y son arrays
    if (Array.isArray(employeeData)) {
      employeeData.forEach(employee => {
        // Verificar si los datos del empleado están completos
        if (employee.nombreempleado) {
          groupsDataSet.add({
            id: employee._id,
            content: employee.nombreempleado
          });
        } else {
          console.error('Nombre de empleado no encontrado para el empleado:', employee);
        }
      });
    } else {
      console.error('employeeData is not an array:', employeeData);
    }

    if (Array.isArray(activitiesData)) {
      activitiesData.forEach(activity => {
        // Verificar si los datos de la actividad están completos
        if (activity.nombre) {
          const startDate = new Date(activity.fechaInicio);
          const endDate = new Date(activity.fechaFin);

          itemsDataSet.add({
            id: activity._id,
            content: activity.nombre,
            start: startDate,
            end: endDate,
            group: activity.empleado
          });
        } else {
          console.error('Nombre de actividad no encontrado para la actividad:', activity);
        }
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
          <h1 className="dia-title">Diagrama de Gantt</h1>
        </div>
      </div>
      <div ref={timelineRef} style={{ height: '400px' }} />
    </div>
  );
}

export default Diagrama;
