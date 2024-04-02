import React from 'react';
import { Project, TaskList, TaskItemOriginal, GanttOriginal } from 'react-gantt-chart';

function Diagrama() {
  // Datos de ejemplo para el diagrama de Gantt
  const tasks = [
    { id: 1, name: 'Task 1', start: '2024-04-01', end: '2024-04-10', progress: 50 },
    { id: 2, name: 'Task 2', start: '2024-04-05', end: '2024-04-15', progress: 30 },
    { id: 3, name: 'Task 3', start: '2024-04-08', end: '2024-04-18', progress: 70 }
  ];

  return (
    <div>
      <h2>Diagrama de Gantt</h2>
      <Project>
        <TaskList>
          {tasks.map(task => (
            <TaskItemOriginal
              key={task.id}
              id={task.id}
              start={task.start}
              end={task.end}
              name={task.name}
              progress={task.progress}
            />
          ))}
        </TaskList>
        <GanttOriginal />
      </Project>
    </div>
  );
}

export default Diagrama;
