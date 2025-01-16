import { createSlice } from "@reduxjs/toolkit";

const PRIORITY_LEVELS = {
  HIGH: "high",
  MEDIUM: "medium",
  LOW: "low",
};

const initialState = {
  items: [],
  selectedTaskId: null, 
  activeFilter: "all",
  view: "list",
  isDark: localStorage.getItem("theme") === "dark",
  isSidebarOpen: false,
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.items.push({
        id: Date.now(),
        createdAt: new Date().toISOString(),
        completed: false,
        important: false,
        priority: PRIORITY_LEVELS.MEDIUM, 
        assignedToMe: false,
        ...action.payload,
      });
      state.items.sort(
        (a, b) => getPriorityWeight(b.priority) - getPriorityWeight(a.priority)
      );
    },
    toggleTaskComplete: (state, action) => {
      const task = state.items.find((t) => t.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
    toggleTaskImportant: (state, action) => {
      const task = state.items.find((t) => t.id === action.payload);
      if (task) {
        task.important = !task.important;
      }
    },
    setSelectedTask: (state, action) => {
      state.selectedTaskId = action.payload;
    },
    updateTask: (state, action) => {
      const index = state.items.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload };
        if (action.payload.priority) {
          state.items.sort(
            (a, b) =>
              getPriorityWeight(b.priority) - getPriorityWeight(a.priority)
          );
        }
      }
    },
    deleteTask: (state, action) => {
      state.items = state.items.filter((t) => t.id !== action.payload);
      if (state.selectedTaskId === action.payload) {
        state.selectedTaskId = null;
      }
    },
    setActiveFilter: (state, action) => {
      state.activeFilter = action.payload;
    },
    toggleView: (state) => {
      state.view = state.view === "list" ? "grid" : "list";
    },
    toggleTheme: (state) => {
      state.isDark = !state.isDark;
      localStorage.setItem("theme", state.isDark ? "dark" : "light");
      document.documentElement.classList.toggle("dark", state.isDark);
    },
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
  },
});

export const selectSelectedTask = (state) => {
  return state.items.find((task) => task.id === state.selectedTaskId);
};

export const selectFilteredTasks = (state) => {
  const tasks = state.tasks.items;
  const filter = state.tasks.activeFilter;

  switch (filter) {
    case "today":
      return tasks.filter((task) => {
        if (!task.dueDate) return false;
        const taskDate = new Date(task.dueDate);
        const today = new Date();
        return taskDate.toDateString() === today.toDateString();
      });

    case "important":
      return tasks.filter((task) => task.important);

    case "planned":
      return tasks.filter((task) => task.dueDate != null);

    case "assigned":
      return tasks.filter((task) => task.assignedToMe);

    case "all":
    default:
      return tasks;
  }
};

const getPriorityWeight = (priority) => {
  switch (priority) {
    case PRIORITY_LEVELS.HIGH:
      return 3;
    case PRIORITY_LEVELS.MEDIUM:
      return 2;
    case PRIORITY_LEVELS.LOW:
      return 1;
    default:
      return 0;
  }
};

export { PRIORITY_LEVELS };

export const {
  addTask,
  toggleTaskComplete,
  toggleTaskImportant,
  setSelectedTask, 
  updateTask,
  deleteTask,
  setActiveFilter,
  toggleView,
  toggleTheme,
  toggleSidebar,
} = taskSlice.actions;


export default taskSlice.reducer;


