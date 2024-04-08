import React, { useEffect, useRef, useState } from 'react';
import { DataSet, Timeline } from 'vis-timeline/standalone';
import 'vis-timeline/styles/vis-timeline-graph2d.css';
import axios from 'axios';

function Diagrama() {
  const timelineRef = useRef(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    // Hacer una llamada a la API para obtener los datos
    axios.get('http://localhost:3001/dia/xd')
      .then(response => {
        // Agrupar los datos por tipo de contrato
        const groupedData = groupDataByTipoContrato(response.data);
        // Ordenar los turnos dentro de cada grupo
        const sortedData = sortTurnosInGroups(groupedData);
        setData(sortedData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    if (data.length === 0 || !timelineRef.current) return;

    const container = timelineRef.current;

    // Procesar los datos para adaptarlos al formato necesario
    const items = new DataSet(data.flatMap(group => (
      group.turnos.map(turno => ({
        id: turno._id,
        group: group.tipoContrato,
        content: turno.turno, // Mostrar el contenido del campo "turno"
        start: new Date(), // Debes definir la fecha de inicio según tu lógica
        end: new Date(),   // Debes definir la fecha de fin según tu lógica
      }))
    )));

    // Configurar los grupos del diagrama
    const groups = new DataSet(data.map(group => ({
      id: group.tipoContrato,
      content: group.tipoContrato,
    })));

    const options = {
      // Configurar opciones del diagrama aquí
      orientation: {
        axis: 'top', // Colocar el eje horizontal en la parte superior
      },
      locale: 'es', // Configurar el idioma del diagrama a español
      locales: {
        es: { // Traducción de los días de la semana
          day: 'Domingo',
          weekday: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
        },
      },
    };

    // Crear el diagrama de Gantt
    const timeline = new Timeline(container, items, groups, options);

    return () => {
      // Limpiar el timeline cuando el componente se desmonte
      timeline.destroy();
    };
  }, [data]);

  // Función para agrupar los datos por tipo de contrato
  const groupDataByTipoContrato = (data) => {
    const groupedData = {};
    data.forEach(item => {
      if (!groupedData[item.tipoContrato]) {
        groupedData[item.tipoContrato] = {
          tipoContrato: item.tipoContrato,
          turnos: [],
        };
      }
      groupedData[item.tipoContrato].turnos.push(item);
    });
    return Object.values(groupedData);
  };

  // Función para ordenar los turnos dentro de cada grupo
  const sortTurnosInGroups = (groupedData) => {
    groupedData.forEach(group => {
      group.turnos.sort((a, b) => a.turno.localeCompare(b.turno));
    });
    return groupedData;
  };

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
