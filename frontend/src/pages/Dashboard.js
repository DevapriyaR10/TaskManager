import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import axios from 'axios';
import { useTheme } from '../context/ThemeContext';

const API_URL = 'https://taskmanager-iuc1.onrender.com/api';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="toggle-wrapper" onClick={toggleTheme}>
      <div className={`toggle-track ${theme}`}>
        <div className="toggle-thumb" />
        <span className="toggle-label light">☀️</span>
        <span className="toggle-label dark">🌙</span>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

 
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/tasks`);
      setTasks(response.data);
      setError('');
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setError('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (taskData) => {
    try {
      const response = await axios.post(`${API_URL}/tasks`, taskData);
      setTasks(prev => [response.data, ...prev]);
      setShowTaskForm(false);
      return { success: true };
    } catch (error) {
      console.error('Error creating task:', error);
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to create task' 
      };
    }
  };

  const handleUpdateTask = async (taskId, taskData) => {
    try {
      const response = await axios.put(`${API_URL}/tasks/${taskId}`, taskData);
      setTasks(prev => prev.map(task => 
        task._id === taskId ? response.data : task
      ));
      setEditingTask(null);
      return { success: true };
    } catch (error) {
      console.error('Error updating task:', error);
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to update task' 
      };
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }

    try {
      await axios.delete(`${API_URL}/tasks/${taskId}`);
      setTasks(prev => prev.filter(task => task._id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
      setError('Failed to delete task');
    }
  };

  const handleToggleComplete = async (taskId, completed) => {
    try {
      const response = await axios.put(`${API_URL}/tasks/${taskId}`, { completed });
      setTasks(prev => prev.map(task => 
        task._id === taskId ? response.data : task
      ));
    } catch (error) {
      console.error('Error updating task:', error);
      setError('Failed to update task status');
    }
  };

  const completedTasks = tasks.filter(task => task.completed);
  const incompleteTasks = tasks.filter(task => !task.completed);

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="container">
          <div className="header-content">
            <div className="header-left">
              <h1>Task Manager</h1>
              <p>Welcome back, {user?.name}!</p>
            </div>
            <div className="header-right">
              <ThemeToggle />
              <button 
                className="btn btn-primary"
                onClick={() => setShowTaskForm(true)}
              >
                + Add New Task
              </button>
              <button 
                className="btn btn-outline"
                onClick={logout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="dashboard-main">
        <div className="container">
          {error && <div className="error-message">{error}</div>}
          
          {/* Stats */}
          <div className="stats-grid">
            <div className="stat-card">
              <h3>Total Tasks</h3>
              <p className="stat-number">{tasks.length}</p>
            </div>
            <div className="stat-card">
              <h3>Completed</h3>
              <p className="stat-number completed">{completedTasks.length}</p>
            </div>
            <div className="stat-card">
              <h3>Remaining</h3>
              <p className="stat-number pending">{incompleteTasks.length}</p>
            </div>
          </div>

          {/* Task Lists */}
          {loading ? (
            <div className="loading">Loading tasks...</div>
          ) : (
            <div className="tasks-section">
              <TaskList
                title="Pending Tasks"
                tasks={incompleteTasks}
                onToggleComplete={handleToggleComplete}
                onEdit={setEditingTask}
                onDelete={handleDeleteTask}
                emptyMessage="No pending tasks!"
              />
              
              <TaskList
                title="Completed Tasks"
                tasks={completedTasks}
                onToggleComplete={handleToggleComplete}
                onEdit={setEditingTask}
                onDelete={handleDeleteTask}
                emptyMessage="No completed tasks yet."
              />
            </div>
          )}
        </div>
      </main>

      {/* Task Form Modal */}
      {(showTaskForm || editingTask) && (
        <TaskForm
          task={editingTask}
          onSubmit={editingTask ? 
            (data) => handleUpdateTask(editingTask._id, data) : 
            handleCreateTask
          }
          onCancel={() => {
            setShowTaskForm(false);
            setEditingTask(null);
          }}
        />
      )}
    </div>
  );
};

export default Dashboard;
