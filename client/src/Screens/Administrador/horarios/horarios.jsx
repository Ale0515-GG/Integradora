import React, { useState } from 'react';
import Select from 'react-select';


const HorarioDropdown = ({ options, value, onChange }) => {
  return (
    <Select
      options={options}
      value={value}
      onChange={onChange}
    />
  );
};

const App = () => {
  const [horario1, setHorario1] = useState('');
  const [horario2, setHorario2] = useState('');
  const [horario3, setHorario3] = useState('');

  const horarioOptions = [
    { value: 'option1', label: '• 7:00 - 7:00' },
    { value: 'option2', label: '•	15:00 – 23: 00' },
    { value: 'option3', label: '• 23:00 – 7:00 ' },
    { value: 'option4', label: '• 7:00 - 7:00' },
    { value: 'option5', label: '• 19:00 - 19:00' },
    { value: 'option6', label: '• 6:00 - 12:00' },
    { value: 'option7', label: '• 12:00 - 18:00' },
    { value: 'option8', label: '• 18:00 - 23:59' },
    { value: 'option9', label: '• 0:00 - 6:00' }
  ];

  // Filtrar las opciones disponibles para el segundo combo
  const filteredOptions2 = horarioOptions.filter(option => option.value !== horario1.value);
  // Filtrar las opciones disponibles para el tercer combo
  const filteredOptions3 = horarioOptions.filter(option => option.value !== horario1.value && option.value !== horario2.value);

  return (
    <div>
      <HorarioDropdown
        options={horarioOptions}
        value={horario1}
        onChange={setHorario1}
      />
      <HorarioDropdown
        options={filteredOptions2}
        value={horario2}
        onChange={setHorario2}
      />
      <HorarioDropdown
        options={filteredOptions3}
        value={horario3}
        onChange={setHorario3}
      />
    </div>
  );
};

export default App;
