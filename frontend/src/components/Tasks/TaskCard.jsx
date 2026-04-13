import React from 'react';

const TaskCard = ({ task, onEdit, onDelete, onToggleComplete }) => {
  const isOverdue = new Date(task.dueDate) < new Date() && !task.completed;
  const isDueSoon = new Date(task.dueDate) <= new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) && !task.completed;

  const getStatusColor = () => {
    if (task.completed) return 'bg-green-100 text-green-800 border-green-200';
    if (isOverdue) return 'bg-red-100 text-red-800 border-red-200';
    if (isDueSoon) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-blue-100 text-blue-800 border-blue-200';
  };

  const getStatusText = () => {
    if (task.completed) return 'Completed';
    if (isOverdue) return 'Overdue';
    if (isDueSoon) return 'Due Soon';
    return 'In Progress';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className={`card p-4 hover:shadow-md transition-shadow ${task.completed ? 'opacity-75' : ''}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className={`text-lg font-semibold ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
            {task.title}
          </h3>
          {task.description && (
            <p className={`text-sm mt-1 ${task.completed ? 'text-gray-400' : 'text-gray-600'}`}>
              {task.description}
            </p>
          )}
        </div>
        <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor()}`}>
          {getStatusText()}
        </span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center text-sm text-gray-500">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {formatDate(task.dueDate)}
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => onToggleComplete(task._id, !task.completed)}
            className={`p-2 rounded-lg transition-colors ${
              task.completed 
                ? 'text-gray-400 hover:text-green-600' 
                : 'text-gray-400 hover:text-green-600'
            }`}
            title={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>

          <button
            onClick={() => onEdit(task)}
            className="p-2 text-gray-400 hover:text-blue-600 rounded-lg transition-colors"
            title="Edit task"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>

          <button
            onClick={() => onDelete(task._id)}
            className="p-2 text-gray-400 hover:text-red-600 rounded-lg transition-colors"
            title="Delete task"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
