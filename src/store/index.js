import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./taskSlice";

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("todoState");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Error loading state:", err);
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("todoState", serializedState);
  } catch (err) {
    console.error("Error saving state:", err);
  }
};

const store = configureStore({
  reducer: {
    tasks: taskReducer,
  },
  preloadedState: loadState(),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["tasks/setDueDate", "tasks/setReminder"],
        ignoredPaths: [
          "tasks.selectedTask.dueDate",
          "tasks.selectedTask.reminder",
        ],
      },
    }),
});

store.subscribe(() => {
  saveState(store.getState());
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
