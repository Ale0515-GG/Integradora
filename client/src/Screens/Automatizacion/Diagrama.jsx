import React from 'react';
import { GanttComponent } from '@syncfusion/ej2-react-gantt';
import { projectData } from './data';
import { setCulture, registerLicense } from '@syncfusion/ej2-base'; // Importa registerLicense en lugar de setLicense

// Importa los archivos CSS para los componentes de Syncfusion
import '@syncfusion/ej2-base/styles/material.css';
import '@syncfusion/ej2-react-gantt/styles/material.css';

// Establece la clave de licencia de Syncfusion
setCulture('en-US');

// Configura la licencia utilizando registerLicense
registerLicense("#574204");

function Gantt() {
    const taskValues = {
        id: "TaskID",
        name: "TaskName",
        startDate: "StartDate",
        endDate: "EndDate",
        duration: "Duration",
        progress: "Progress",
        child: "substacks"
    };

    return (
        <div>
            <GanttComponent dataSource={projectData} taskFields={taskValues} />
        </div>
    );
}

export default Gantt;
