import React, { useEffect, useRef } from 'react';
import { DataSet, Timeline } from 'vis-timeline/standalone';
import 'vis-timeline/styles/vis-timeline-graph2d.css';

function Diagrama() {
  const timelineRef = useRef(null);

  useEffect(() => {
    const container = timelineRef.current;
    const groups = new DataSet([
      { id: 1, content: 'Group 1' },
      { id: 2, content: 'Group 2' },
      { id: 3, content: 'Group 3' },
      { id: 4, content: 'Group 4' },
      // Agrega más grupos según sea necesario
    ]);
    const items = new DataSet([
      { id: 1, group: 1, content: 'Item 1', start: '2024-04-01' },
      { id: 2, group: 1, content: 'Item 2', start: '2024-04-03' },
      { id: 3, group: 2, content: 'Item 3', start: '2024-04-05' },
      { id: 4, group: 2, content: 'Item 4', start: '2024-04-07' },
      // Agrega más elementos según tus necesidades
    ]);
    const options = {
      start: '2024-04-01',
      end: '2024-04-10',
      stack: false,
    };
    const timeline = new Timeline(container, items, groups, options);

    return () => {
      if (timeline) {
        timeline.destroy();
      }
    };
  }, []);

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
