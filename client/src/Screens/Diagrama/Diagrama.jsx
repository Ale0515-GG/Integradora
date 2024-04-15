import React, { useEffect, useRef, useState } from 'react';
import { DataSet, Timeline } from 'vis-timeline/standalone';
import 'vis-timeline/styles/vis-timeline-graph2d.css';
import axios from 'axios';
import { Link } from "react-router-dom";

function Diagrama() {
  const timelineRef = useRef(null);
  const [activitiesData, setActivitiesData] = useState([]);
  const [employeeData, setEmployeeData] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false); // Bandera para indicar si los datos están cargados

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
    if (activitiesData.length > 0 && employeeData.length > 0 && !dataLoaded) {
      const container = timelineRef.current;

      const itemsDataSet = new DataSet();
      const groupsDataSet = new DataSet();

      const validEmployees = employeeData.filter(employee => employee.nombreempleado);
      validEmployees.forEach(employee => {
        groupsDataSet.add({
          id: employee._id,
          content: employee.nombreempleado
        });
      });

      const validActivities = activitiesData.filter(activity => activity.nombre && activity.fechaInicio && activity.fechaFin);
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

      const options = {
        orientation: {
          axis: 'top',
        },
        locale: 'es',
        groupOrder: 'content'
      };

      new Timeline(container, itemsDataSet, groupsDataSet, options);
      setDataLoaded(true); // Establecer la bandera de datos cargados a true
    }
  }, [activitiesData, employeeData, dataLoaded]);

  return (
    <div>
      <div className="dia-container">
        <div className="dia-header">
          <h1 className="dia-title">Diagrama de Gantt</h1>
          <Link to="/" className="regresar"></Link>
        </div>
      </div>
      <div ref={timelineRef} style={{ height: '400px', top: '50px' }} />
    </div>
  );
}

export default Diagrama;
