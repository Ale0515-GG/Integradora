Object.defineProperty(exports, "_esModule", { value: true });

exports.projectData = [
    {
      taskID: 1,
      taskName: "Task 1",
      startDate: new Date("2024-04-01"),
      endDate: new Date("2024-04-05"),
      subtasks: [
        {
          taskID: 11,
          startDate: new Date("2024-04-01"),
          duration: 3, // Duración en días
          progress: 50 // Progreso en porcentaje
        },
        {
          taskID: 12,
          startDate: new Date("2024-04-04"),
          duration: 2,
          progress: 0
        }
      ]
    },
    {
      taskID: 2,
      taskName: "Task 2",
      startDate: new Date("2024-04-06"),
      endDate: new Date("2024-04-10"),
      subtasks: [
        {
          taskID: 21,
          startDate: new Date("2024-04-06"),
          duration: 4,
          progress: 25
        },
        {
          taskID: 22,
          startDate: new Date("2024-04-09"),
          duration: 2,
          progress: 75
        }
      ]
    }
];
