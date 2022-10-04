export const tasksReduser = (tasks, action) => {
  switch (action.type) {
    case 'ADD_TASK': {
      return [...tasks, {
        id: action.id,
        order: tasks.length + 1,
        title: action.title,
        isDone: false,
      }]
    }

    case 'DELETE_TASK': {
      return tasks.filter(t => t.id !== action.id);
    }

    case 'SAVE_TASK': {
      const id = action.id;
      const title = action.title;

      return tasks.map(t => (t.id === id) ? ({ ...t, title }) : t);
    }

    case 'TOGGLE_TASK_STATUS': {
      const id = action.id;
      const isDone = action.isDone;

      return tasks.map(t => (t.id === id) ? ({ ...t, isDone }) : t);
    }

    case 'CHANGE_ORDER': {
      const id = action.id;
      const order = action.order;
      const currentId = action.currentId;
      const currentOrder = action.currentOrder;

      return tasks.map(t => {
        if (t.id === action.id) {
          return { ...t, order: action.currentOrder }
        }

        if (t.id === action.currentId) {
          return { ...t, order: action.order };
        }

        return t;
      });

    }

    default: {
      return tasks;
    }
  }
};