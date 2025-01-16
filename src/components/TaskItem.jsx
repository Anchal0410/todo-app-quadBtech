import React from 'react';
import { Star } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { toggleTaskComplete, setSelectedTask, toggleTaskImportant } from '../store/taskSlice';

const TaskItem = ({ task, isSelected }) => {
  const dispatch = useDispatch();

  return (
    <div 
      className={`py-2 px-4 cursor-pointer transition-colors
        ${isSelected ? 'bg-[#F5F7F5]' : 'hover:bg-gray-50'}`}
      onClick={() => dispatch(setSelectedTask(task.id))}
    >
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={(e) => {
            e.stopPropagation();
            dispatch(toggleTaskComplete(task.id));
          }}
          className="w-5 h-5 rounded-sm border-gray-300"
        />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className={task.completed ? 'line-through text-gray-400' : ''}>
              {task.title}
            </span>
          </div>
          {task.dueDate && (
            <p className="text-sm text-gray-500">
              {new Date(task.dueDate).toLocaleDateString('en-GB')}
            </p>
          )}
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            dispatch(toggleTaskImportant(task.id));
          }}
          className={`p-1 rounded ${task.important ? 'text-yellow-400' : ''}`}
        >
          <Star className="w-5 h-5" fill={task.important ? "black" : "none"} style={{color: "black"}} />
        </button>
      </div>
    </div>
  );
};

export default TaskItem;