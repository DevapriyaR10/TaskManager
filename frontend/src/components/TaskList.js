import React from 'react';

const TaskList = ({ title, tasks, onToggleComplete, onEdit, onDelete, emptyMessage }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="task-list-section">
      <h2 className="section-title">{title}</h2>
      
      {tasks.length === 0 ? (
        <div className="empty-state">
          <p>{emptyMessage}</p>
        </div>
      ) : (
        <div className="task-grid">
          {tasks.map(task => (
            <div key={task._id} className={`task-card ${task.completed ? 'completed' : ''}`}>
              <div className="task-header">
                <div className="task-checkbox">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={(e) => onToggleComplete(task._id, e.target.checked)}
                    id={`task-${task._id}`}
                  />
                  <label htmlFor={`task-${task._id}`} className="checkbox-label">
                    <span className="checkmark"></span>
                  </label>
                </div>
                <div className="task-actions">
                  <button
                    className="btn-icon edit"
                    onClick={() => onEdit(task)}
                    title="Edit task"
                  >
                    Edit
                  </button>
                  <button
                    className="btn-icon delete"
                    onClick={() => onDelete(task._id)}
                    title="Delete task"
                  >
                    Delete
                  </button>
                </div>
              </div>
              
              <div className="task-content">
                <h3 className="task-title">{task.title}</h3>
                {task.description && (
                  <p className="task-description">{task.description}</p>
                )}
              </div>
              
              <div className="task-footer">
                <div className="task-status">
                  <span className={`status-badge ${task.completed ? 'completed' : 'pending'}`}>
                    {task.completed ? 'Completed' : 'Pending'}
                  </span>
                </div>
                <div className="task-date">
                  <small>Created: {formatDate(task.createdAt)}</small>
                  {task.updatedAt !== task.createdAt && (
                    <small>Updated: {formatDate(task.updatedAt)}</small>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;