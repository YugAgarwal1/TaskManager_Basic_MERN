import React, { useState, useEffect } from 'react';
import { authAPI } from '../services/api';
import TaskList from '../components/Tasks/TaskList';

const Dashboard = ({ user, onLogout }) => {
  const [currentUser, setCurrentUser] = useState(user);

  const handleLogout = async () => {
    try {
      await authAPI.logout();
      onLogout();
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">Task Manager</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium">
                    {currentUser?.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="text-sm font-medium text-gray-700">{currentUser?.name}</span>
              </div>
              
              <button
                onClick={handleLogout}
                className="btn btn-secondary text-sm"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <TaskList />
      </main>
    </div>
  );
};

export default Dashboard;
