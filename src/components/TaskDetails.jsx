import React, { useState } from "react";
import {
  X,
  Plus,
  Bell,
  Calendar,
  RotateCcw,
  Trash2,
  Star,
  AlignJustify,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateTask,
  deleteTask,
  setSelectedTask,
  toggleTaskImportant,
} from "../store/taskSlice";

const TaskDetails = () => {
  const dispatch = useDispatch();
  const selectedTaskId = useSelector((state) => state.tasks.selectedTaskId);
  const selectedTask = useSelector((state) =>
    state.tasks.items.find((task) => task.id === selectedTaskId)
  );
  const [showDateInput, setShowDateInput] = useState(false);
  const [showPriorityInput, setShowPriorityInput] = useState(false);
  const [dateError, setDateError] = useState("");

  if (!selectedTask) return null;

  const handleTaskUpdate = (updates) => {
    dispatch(updateTask({ id: selectedTask.id, ...updates }));
  };

  const handleDateChange = (e) => {
    const inputDate = new Date(e.target.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (inputDate < today) {
      setDateError("Please select today or a future date");
      return;
    }

    setDateError("");
    handleTaskUpdate({ dueDate: inputDate.toISOString() });
    setShowDateInput(false);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "text-red-500";
      case "medium":
        return "text-yellow-500";
      case "low":
        return "text-blue-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="w-[350px] h-full bg-[#EEF6EF] dark:bg-[#2C2C2C] flex flex-col">
      {/* Task Title Area */}
      <div className="p-4 border-b">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={selectedTask.completed}
            onChange={(e) => handleTaskUpdate({ completed: e.target.checked })}
            className="w-5 h-5 rounded-sm border-gray-300"
          />
          <input
            type="text"
            value={selectedTask.title}
            onChange={(e) => handleTaskUpdate({ title: e.target.value })}
            className="flex-1 bg-transparent border-none text-lg focus:outline-none"
            placeholder="Task title"
          />
          <button
            onClick={() => dispatch(toggleTaskImportant(selectedTask.id))}
            className={`p-1 hover:bg-gray-100 rounded ${
              selectedTask.important ? "text-yellow-400" : ""
            }`}
          >
            <Star className="w-5 h-5" fill={selectedTask.important ? "black" : "none"} style={{color: "black"}} />
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex-1 overflow-y-auto">
        <button className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-white border-b">
          <Plus className="w-5 h-5" />
          <span>Add Step</span>
        </button>

        <button className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-white border-b">
          <Bell className="w-5 h-5" />
          <span>Set Reminder</span>
        </button>

        {/* Due Date Section */}
        <div className="border-b">
          <button
            className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-white"
            onClick={() => setShowDateInput(!showDateInput)}
          >
            <Calendar className="w-5 h-5" />
            <div className="flex flex-col">
              <span>{selectedTask.dueDate ? "Due Date" : "Add Due Date"}</span>
              {selectedTask.dueDate && (
                <span className="text-sm text-gray-500">
                  {new Date(selectedTask.dueDate).toLocaleDateString("en-GB")}
                </span>
              )}
            </div>
          </button>

          {showDateInput && (
            <div className="px-4 py-2">
              <input
                type="date"
                min={new Date().toISOString().split("T")[0]}
                value={
                  selectedTask.dueDate
                    ? new Date(selectedTask.dueDate).toISOString().split("T")[0]
                    : ""
                }
                onChange={handleDateChange}
                className="w-full p-2 border rounded"
              />
              {dateError && (
                <p className="text-red-500 text-sm mt-1">{dateError}</p>
              )}
            </div>
          )}
        </div>

        {/* Priority Section */}
        <div className="border-b">
          <button
            className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-white"
            onClick={() => setShowPriorityInput(!showPriorityInput)}
          >
            <AlignJustify className="w-5 h-5" />
            <div className="flex flex-col">
              <span>Priority</span>
              <span
                className={`text-sm ${getPriorityColor(selectedTask.priority)}`}
              >
                {selectedTask.priority.charAt(0).toUpperCase() +
                  selectedTask.priority.slice(1)}{" "}
                Priority
              </span>
            </div>
          </button>

          {showPriorityInput && (
            <div className="px-4 py-2">
              <select
                value={selectedTask.priority}
                onChange={(e) => {
                  handleTaskUpdate({ priority: e.target.value });
                  setShowPriorityInput(false);
                }}
                className="w-full p-2 border rounded"
              >
                <option value="high">High Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="low">Low Priority</option>
              </select>
            </div>
          )}
        </div>

        <div className="border-b">
          <button
            className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-white"
            onClick={() =>
              handleTaskUpdate({ assignedToMe: !selectedTask.assignedToMe })
            }
          >
            <input
              type="checkbox"
              checked={selectedTask.assignedToMe || false}
              onChange={(e) => {
                e.stopPropagation();
                handleTaskUpdate({ assignedToMe: e.target.checked });
              }}
              className="w-5 h-5 rounded-sm border-gray-300"
            />
            <span>Assign to me</span>
          </button>
        </div>

        <button className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-white border-b">
          <RotateCcw className="w-5 h-5" />
          <span>Repeat</span>
        </button>

        {/* Notes Section */}
        <div className="p-4">
          <textarea
            placeholder="Add Notes"
            value={selectedTask.notes || ""}
            onChange={(e) => handleTaskUpdate({ notes: e.target.value })}
            className="w-full bg-transparent border-none resize-none focus:outline-none text-gray-600"
            rows={4}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="border-t p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <button onClick={() => dispatch(setSelectedTask(null))}>
            <X className="w-5 h-5 text-gray-500" />
          </button>
          <span className="text-sm text-gray-500">Created Today</span>
        </div>
        <button
          onClick={() => {
            dispatch(deleteTask(selectedTask.id));
            dispatch(setSelectedTask(null));
          }}
          className="text-gray-500 hover:text-red-500"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default TaskDetails;
