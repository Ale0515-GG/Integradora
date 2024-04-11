import React, { useEffect, useRef, useState } from 'react';
import { DataSet, Timeline } from 'vis-timeline/standalone';
import 'vis-timeline/styles/vis-timeline-graph2d.css';
import axios from 'axios';

function Diagrama() {
  const timelineRef = useRef(null);
  const [activitiesData, setActivitiesData] = useState([]);
  const [isActivitiesDataLoaded, setIsActivitiesDataLoaded] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:3001/actividades')
      .then(response => {
        if (Array.isArray(response.data)) {
          setActivitiesData(response.data);
          setIsActivitiesDataLoaded(true);
        } else {
          console.error('Error fetching activities data: Data is not an array');
        }
      })
      .catch(error => {
        console.error('Error fetching activities data:', error);
      });
  }, []);

  useEffect(() => {
    if (!isActivitiesDataLoaded) return;

    const container = timelineRef.current;

    const itemsDataSet = new DataSet();
    const groupsDataSet = new DataSet();

    activitiesData.forEach(activity => {
      const startDate = new Date(activity.fechaInicio);
      const endDate = new Date(activity.fechaFin);

      itemsDataSet.add({
        id: activity._id,
        content: activity.nombre,
        start: startDate,
        end: endDate,
        group: activity.empleado // Usamos el ID del empleado como grupo
      });
    });

    const options = {
      orientation: {
        axis: 'top',
      },
      locale: 'es',
      groupOrder: 'content' // Ordenar grupos alfabéticamente por contenido
    };

    new Timeline(container, itemsDataSet, options);
  }, [activitiesData, isActivitiesDataLoaded]);

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
