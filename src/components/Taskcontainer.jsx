import React from "react";
import TaskInput from "./TaskInput";
import TaskList from "./TaskList";

const TaskContainer = () => {
  return (
    <main className="flex-1 flex flex-col overflow-hidden">
      <div className="border-b px-4 py-2">
        <select className="border-none bg-transparent text-sm focus:outline-none">
          <option>To Do ▼</option>
        </select>
      </div>
      <TaskInput />
      <TaskList />
    </main>
  );
};

export default TaskContainer;
