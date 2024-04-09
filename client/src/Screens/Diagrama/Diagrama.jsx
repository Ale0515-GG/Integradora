import React, { useEffect, useRef, useState } from 'react';
import { DataSet, Timeline } from 'vis-timeline/standalone';
import 'vis-timeline/styles/vis-timeline-graph2d.css';
import axios from 'axios';

function Diagrama() {
  const timelineRef = useRef(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/dia/xd')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    if (data.length === 0 || !timelineRef.current) return;

    const container = timelineRef.current;

    // Definir manualmente los días de la semana
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

    // Crear un DataSet para los items (turnos)
    const items = new DataSet(data.map(turno => ({
      id: turno._id,
      group: turno.tipoContrato, // Agrupar por tipo de contrato
      content: turno.turno,
      start: new Date(), // Aquí deberías definir la fecha de inicio adecuada
      end: new Date(),   // Aquí deberías definir la fecha de fin adecuada
    })));

    // Crear un DataSet para los grupos (tipo de contrato)
    const groups = new DataSet(data.map(turno => ({
      id: turno.tipoContrato,
      content: turno.tipoContrato,
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
          weekday: days,
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
