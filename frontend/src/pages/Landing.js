import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Landing = () => {
  const { user } = useAuth();

  return (
    <div className="landing-page">
      {/* 3D Background */}
      <div className="spline-background">
        <iframe
          src="https://my.spline.design/noisedisplacecopy-cu6v7ASdFV5yXZn4AvuHLNWO/"
          frameBorder="0"
          title="3D Background"
          allow="fullscreen"
        ></iframe>
      </div>

      {/* Foreground content */}
      <div className="landing-content">
        <section className="hero-section">
          <h1 className="hero-title">Welcome to Task Manager</h1>
          <p className="hero-description">
            Organize your tasks efficiently and boost your productivity.
          </p>

          <div className="hero-buttons">
            <Link to="/dashboard" className="btn btn-primary">Go to Dashboard</Link>

            {!user && (
              <>
                <Link to="/login" className="btn btn-secondary">Login</Link>
                <Link to="/register" className="btn btn-outline">Sign Up</Link>
              </>
            )}
          </div>
        </section>

        <section className="features-section">
          <div className='feature-title'>
          <p>Features</p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <h3>Task Management</h3>
              <p>Create, edit, and delete tasks.</p>
            </div>
            <div className="feature-card">
              <h3>Progress Tracking</h3>
              <p>Track your task status easily.</p>
            </div>
            <div className="feature-card">
              <h3> Secure Access</h3>
              <p>Private and protected data.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Landing;
