import React from 'react';

function TaskList({ tasks, onEdit, onDelete, onToggleComplete }) {
  if (tasks.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-8">No tasks found. Add a new task above!</p>
    );
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-gray-700 mb-4">Your Tasks</h2>
      <ul className="space-y-4">
        {tasks.map((task) => (
          <li
            key={task.id}
            className={`flex items-center justify-between p-4 rounded-lg shadow-sm
            ${task.isCompleted ? 'bg-green-100 border border-green-300' : 'bg-gray-50 border border-gray-200'}`}
          >
            <div className="flex items-center flex-grow">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-indigo-600 rounded"
                checked={task.isCompleted}
                onChange={() => onToggleComplete(task)}
              />
              <div className="ml-4 flex-grow">
                <h3 className={`text-lg font-semibold ${task.isCompleted ? 'line-through text-gray-600' : 'text-gray-800'}`}>
                  {task.title}
                </h3>
                {task.description && (
                  <p className={`text-sm text-gray-600 ${task.isCompleted ? 'line-through' : ''}`}>
                    {task.description}
                  </p>
                )}
                {task.dueDate && (
                  <p className="text-xs text-gray-500 mt-1">
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
            <div className="flex space-x-2 ml-4">
              <button
                onClick={() => onEdit(task)}
                className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200 ease-in-out shadow-md"
                aria-label="Edit task"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.38-2.828-2.829z" />
                </svg>
              </button>
              <button
                onClick={() => onDelete(task.id)}
                className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors duration-200 ease-in-out shadow-md"
                aria-label="Delete task"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1zm6 3a1 1 0 100 2h-2a1 1 0 100 2h2a1 1 0 100 2H7a1 1 0 100-2h2a1 1 0 100-2h-2a1 1 0 100-2h2z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;