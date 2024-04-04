import React, { useEffect, useRef } from 'react';
import { DataSet } from 'vis-data';
import { Timeline } from 'vis-timeline/standalone';
import 'vis-timeline/standalone.css';

function GanttChart({ items, groups, options }) {
  const timelineRef = useRef(null);

  useEffect(() => {
    const container = timelineRef.current;
    const timeline = new Timeline(container, items, groups, options);

    return () => {
      if (timeline) {
        timeline.destroy();
      }
    };
  }, [items, groups, options]);

  return <div ref={timelineRef} style={{ height: '400px' }} />;
}

export default GanttChart;
