import React from "react";
import { useSelector } from "react-redux";
import TaskItem from "./TaskItem";
import { selectFilteredTasks } from "../store/taskSlice";

const TaskList = () => {
  const filteredTasks = useSelector(selectFilteredTasks);
  const view = useSelector((state) => state.tasks.view);
  const selectedTaskId = useSelector((state) => state.tasks.selectedTaskId);

  const activeTasks = filteredTasks.filter((task) => !task.completed);
  const completedTasks = filteredTasks.filter((task) => task.completed);

  const taskGroupClass =
    view === "grid"
      ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      : "space-y-1";

  const taskGroupItem = view === "grid" ? "border dark:p-5" : "";

  if (filteredTasks.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No tasks found for the selected filter.
      </div>
    );
  }

  return (
    <div className="divide-y">
      {/* Active Tasks */}
      {activeTasks.length > 0 && (
        <div className="p-4">
          <div className={taskGroupClass}>
            {activeTasks.map((task) => (
              <div className={taskGroupItem}>
                <TaskItem
                  key={task.id}
                  task={task}
                  view={view}
                  isSelected={selectedTaskId === task.id}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Completed Tasks */}
      {completedTasks.length > 0 && (
        <div className="p-4">
          <h2 className="text-sm font-medium text-gray-500 mb-4">Completed</h2>
          <div className={taskGroupClass}>
            {completedTasks.map((task) => (
              <div className={taskGroupItem}>
                <TaskItem
                  key={task.id}
                  task={task}
                  view={view}
                  isSelected={selectedTaskId === task.id}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Show message if no tasks match the current view */}
      {activeTasks.length === 0 && completedTasks.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No tasks match the current filter.
        </div>
      )}
    </div>
  );
};

export default TaskList;
