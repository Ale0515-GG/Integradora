import React, { useEffect, useRef, useState } from 'react';
import { DataSet, Timeline } from 'vis-timeline/standalone';
import 'vis-timeline/styles/vis-timeline-graph2d.css';
import axios from 'axios';

function Diagrama() {
  const timelineRef = useRef(null);
  const [employeeData, setEmployeeData] = useState([]);
  const [isEmployeeDataLoaded, setIsEmployeeDataLoaded] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:3001/actividades')
      .then(response => {
        if (response.data && Array.isArray(response.data.data)) {
          setEmployeeData(response.data.data);
          setIsEmployeeDataLoaded(true);
        } else {
          console.error('Los datos de empleados no son un array:', response.data);
        }
      })
      .catch(error => {
        console.error('Error al obtener datos de empleados:', error);
      });
  }, []);

  useEffect(() => {
    if (!isEmployeeDataLoaded) return;

    const container = timelineRef.current;

    const itemsDataSet = new DataSet();
    const groupsDataSet = new DataSet();

    employeeData.forEach(employee => {
      const turnos = employee.turno.split(' - ');
      if (turnos.length === 2) {
        const startTime = new Date(`01/01/2000 ${turnos[0]}`);
        const endTime = new Date(`01/01/2000 ${turnos[1]}`);

        // Agregar el turno al DataSet
        itemsDataSet.add({
          id: employee._id,
          content: `Empleado: ${employee.nombreempleado}, Horario: ${turnos[0]} - ${turnos[1]}`, // Mostrar el nombre del empleado y el horario
          start: startTime,
          end: endTime,
        });

        // Agregar el empleado como grupo
        groupsDataSet.add({ id: employee._id, content: employee.nombreempleado });
      } else {
        console.error(`El formato del turno para el empleado ${employee._id} no es válido.`);
      }
    });

    const options = {
      orientation: {
        axis: 'top',
      },
      locale: 'es',
      groupOrder: 'content' // Ordenar los grupos alfabéticamente por nombre de empleado
    };

    new Timeline(container, itemsDataSet, groupsDataSet, options);
  }, [employeeData, isEmployeeDataLoaded]);

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
