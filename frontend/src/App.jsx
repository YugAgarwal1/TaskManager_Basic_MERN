import React, { useState, useEffect } from 'react';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './pages/Dashboard';
import { authAPI } from './services/api';

const App = () => {
  const [currentView, setCurrentView] = useState('login');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await authAPI.checkAuth();
      if (response.isAuth && response.user) {
        setUser(response.user);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (userId) => {
    setIsAuthenticated(true);
    checkAuthStatus();
  };

  const handleRegister = (userId) => {
    setIsAuthenticated(true);
    checkAuthStatus();
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setCurrentView('login');
  };

  const switchToRegister = () => {
    setCurrentView('register');
  };

  const switchToLogin = () => {
    setCurrentView('login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (isAuthenticated && user) {
    return <Dashboard user={user} onLogout={handleLogout} />;
  }

  return (
    <div>
      {currentView === 'login' ? (
        <Login 
          onLogin={handleLogin} 
          onSwitchToRegister={switchToRegister}
        />
      ) : (
        <Register 
          onRegister={handleRegister} 
          onSwitchToLogin={switchToLogin}
        />
      )}
    </div>
  );
};

export default App;
