import React, { useState, useEffect } from 'react';

const TaskModal = ({ isOpen, onClose, task, onSave }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    completed: false,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description || '',
        dueDate: new Date(task.dueDate).toISOString().split('T')[0],
        completed: task.completed,
      });
    } else {
      setFormData({
        title: '',
        description: '',
        dueDate: '',
        completed: false,
      });
    }
  }, [task, isOpen]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!formData.title || !formData.dueDate) {
      setError('Title and due date are required');
      setLoading(false);
      return;
    }

    try {
      await onSave(formData);
      onClose();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save task');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <h2 className="text-xl font-bold mb-4">
          {task ? 'Update Task' : 'Add New Task'}
        </h2>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Task Title *
            </label>
            <input
              id="title"
              name="title"
              type="text"
              required
              className="input-field mt-1"
              placeholder="Enter task title"
              value={formData.title}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              className="input-field mt-1"
              placeholder="Enter task description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">
              Due Date *
            </label>
            <input
              id="dueDate"
              name="dueDate"
              type="date"
              required
              className="input-field mt-1"
              value={formData.dueDate}
              onChange={handleChange}
            />
          </div>

          {task && (
            <div className="flex items-center">
              <input
                id="completed"
                name="completed"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                checked={formData.completed}
                onChange={handleChange}
              />
              <label htmlFor="completed" className="ml-2 block text-sm text-gray-900">
                Mark as completed
              </label>
            </div>
          )}

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
            >
              {loading ? 'Saving...' : (task ? 'Update' : 'Create')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
