import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [formErrors, setFormErrors] = useState({});
  
  const { register, loading, error, clearError } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    clearError();
  }, [clearError]);

  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    const result = await register(formData.name, formData.email, formData.password);
    if (result.success) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="auth-page">
      {/* 3D Background */}
  <div className="spline-background">
    <iframe
      src="https://my.spline.design/noisedisplacecopy-cu6v7ASdFV5yXZn4AvuHLNWO/"
      frameBorder="0"
      title="3D Background"
      allow="fullscreen"
    ></iframe>
  </div>
      <div className="auth-container">
        <div className="auth-card">
          <h2 className="auth-title">Create Your Account</h2>
          
          {error && <div className="error-message">{error}</div>}
          
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={formErrors.name ? 'error' : ''}
                placeholder="Enter your full name"
              />
              {formErrors.name && <span className="field-error">{formErrors.name}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={formErrors.email ? 'error' : ''}
                placeholder="Enter your email"
              />
              {formErrors.email && <span className="field-error">{formErrors.email}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={formErrors.password ? 'error' : ''}
                placeholder="Enter your password (min 6 characters)"
              />
              {formErrors.password && <span className="field-error">{formErrors.password}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={formErrors.confirmPassword ? 'error' : ''}
                placeholder="Confirm your password"
              />
              {formErrors.confirmPassword && <span className="field-error">{formErrors.confirmPassword}</span>}
            </div>
            
            <button 
              type="submit" 
              className="btn btn-primary btn-full"
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>
          
          <div className="auth-footer">
            <p>Already have an account? <Link to="/login">Login here</Link></p>
            <p><Link to="/">← Back to Home</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;