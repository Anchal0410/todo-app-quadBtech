import React, { useState } from 'react';

const SimpleCalendar = ({ onSelectDate, onClose, initialDate = new Date() }) => {
  const [currentDate, setCurrentDate] = useState(initialDate);
  const [selectedDate, setSelectedDate] = useState(initialDate);

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const days = [];
  const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(<div key={`empty-${i}`} className="w-8 h-8" />);
  }

  // Add cells for each day of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const isSelected = selectedDate?.toDateString() === date.toDateString();
    const isToday = new Date().toDateString() === date.toDateString();

    days.push(
      <button
        key={day}
        onClick={() => setSelectedDate(date)}
        className={`w-8 h-8 rounded-full flex items-center justify-center
          ${isSelected ? 'bg-[#4CAF50] text-white' : ''}
          ${isToday && !isSelected ? 'border border-[#4CAF50]' : ''}
          hover:bg-gray-100`}
      >
        {day}
      </button>
    );
  }

  return (
    <div className="bg-white p-4 rounded-lg">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
          className="p-1 hover:bg-gray-100 rounded"
        >
          ←
        </button>
        <div>
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </div>
        <button
          onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
          className="p-1 hover:bg-gray-100 rounded"
        >
          →
        </button>
      </div>

      {/* Weekdays */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map(day => (
          <div key={day} className="w-8 h-8 flex items-center justify-center text-gray-500">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {days}
      </div>

      {/* Actions */}
      <div className="flex justify-between mt-4 pt-4 border-t">
        <button
          onClick={() => onClose()}
          className="text-sm hover:underline"
        >
          Clear
        </button>
        <div className="space-x-2">
          <button
            onClick={() => onClose()}
            className="text-sm hover:underline"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onSelectDate(selectedDate);
              onClose();
            }}
            className="px-3 py-1 bg-[#4CAF50] text-white rounded text-sm"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default SimpleCalendar;