import React, { useEffect, useRef } from 'react';
import { DataSet } from 'vis-data';
import { Timeline } from 'vis-timeline/standalone';
import 'vis-timeline/styles/vis-timeline-graph2d.css';

function Diagrama() {
  const timelineRef = useRef(null);

  useEffect(() => {
    const container = timelineRef.current;
    const items = new DataSet([
      { id: 1, content: 'Item 1', start: '2024-04-01' },
      { id: 2, content: 'Item 2', start: '2024-04-03' },
    ]);
    const options = {
      start: '2024-04-01',
      end: '2024-04-10',
    };
    const timeline = new Timeline(container, items, options);

    return () => {
      if (timeline) {
        timeline.destroy();
      }
    };
  }, []);

  return (
    <div>
      <div className="crud-container">
        <div className="crud-header">
          <div className="logo"></div>
          
          <h1 className="crud-title">Diagrama de Gantt</h1>
        </div>
      </div>
      <div ref={timelineRef} style={{ height: '400px' }} />
    </div>
  );
}

export default Diagrama;
