
class Horario {
    constructor(id, sede, area, contrato, horario) {
      this.id = id;
      this.sede = sede;
      this.area = area;
      this.contrato = contrato;
      this.horario = horario;
    }
  }
  

  const horarios = [
    new Horario(1, "Sede 1", "Área 1", "Contrato 1", "Horario 1"),
    new Horario(2, "Sede 2", "Área 2", "Contrato 2", "Horario 2"),
    new Horario(3, "Sede 3", "Área 3", "Contrato 3", "Horario 3"),
  ];

  const obtenerHorarios = () => {
    return horarios;
  };
  

  const obtenerHorarioPorId = (id) => {
    return horarios.find((horario) => horario.id === id);
  };
  
  export { Horario, obtenerHorarios, obtenerHorarioPorId };
  