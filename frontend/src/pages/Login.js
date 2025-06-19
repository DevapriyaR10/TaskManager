import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [formErrors, setFormErrors] = useState({});
  
  const { login, loading, error, clearError } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    clearError();
  }, [clearError]);

  const validateForm = () => {
    const errors = {};
    
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      errors.password = 'Password is required';
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
    
    const result = await login(formData.email, formData.password);
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

  {/* Content Layer */}
  <div className="auth-container">
    <div className="auth-card">
      <h2 className="auth-title">Login to Your Account</h2>

      {error && (
  <div className="form-error">
    <span>{error}</span>
  </div>
)}


      <form onSubmit={handleSubmit} className="auth-form">
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
            placeholder="Enter your password"
          />
          {formErrors.password && <span className="field-error">{formErrors.password}</span>}
        </div>

        <button
          type="submit"
          className="btn btn-primary btn-full"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <div className="auth-footer">
        <p>Don't have an account? <Link to="/register">Sign up here</Link></p>
        <p><Link to="/">← Back to Home</Link></p>
      </div>
    </div>
  </div>
</div>
  );
};

export default Login;