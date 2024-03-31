import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Gantt from 'react-gantt-chart';

function ActividadesAutomatizacion() {
  // Estado para almacenar las actividades
  const [activities, setActivities] = useState([]);

  // Función para obtener las actividades del backend
  const fetchActivities = async () => {
    try {
      const response = await axios.get('http://gatos/activities');
      setActivities(response.data);
    } catch (error) {
      console.error('Error al obtener actividades:', error);
    }
  };

  // Llama a fetchActivities una vez cuando el componente se monta
  useEffect(() => {
    fetchActivities();
  }, []);

  // Formatear las actividades para el componente Gantt
  const formattedActivities = activities.map(activity => ({
    id: activity.id,
    name: activity.type,
    start: activity.startDate,
    end: activity.endDate,
  }));

  return (
    <div>
      <h1>Actividades de Automatización</h1>
      <Gantt tasks={formattedActivities} />
    </div>
  );
}

export default ActividadesAutomatizacion;
