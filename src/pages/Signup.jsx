import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import Loading from '../component/Loading';
import './Auth.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  
  const { signup, login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (error) setError('');
    
    // Calculate password strength
    if (name === 'password') {
      calculatePasswordStrength(value);
    }
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    setPasswordStrength(strength);
  };

  const getPasswordStrengthText = () => {
    switch (passwordStrength) {
      case 0:
      case 1:
        return { text: 'Very Weak', color: '#ef4444' };
      case 2:
        return { text: 'Weak', color: '#f97316' };
      case 3:
        return { text: 'Fair', color: '#eab308' };
      case 4:
        return { text: 'Good', color: '#22c55e' };
      case 5:
        return { text: 'Strong', color: '#16a34a' };
      default:
        return { text: '', color: '#6b7280' };
    }
  };

  const validateForm = () => {
    const name = formData.name.trim();
    const email = formData.email.trim();
    const password = formData.password;
    const confirmPassword = formData.confirmPassword;

    if (!name) {
      setError('Name is required');
      return false;
    }
    if (!email) {
      setError('Email is required');
      return false;
    }
    if (!password) {
      setError('Password is required');
      return false;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return false;
    }

    // Recompute strength at submit-time to avoid stale state issues
    const computeStrength = (pwd) => {
      let s = 0;
      if (pwd.length >= 8) s += 1;
      if (/[a-z]/.test(pwd)) s += 1;
      if (/[A-Z]/.test(pwd)) s += 1;
      if (/[0-9]/.test(pwd)) s += 1;
      if (/[^A-Za-z0-9]/.test(pwd)) s += 1;
      return s;
    };
    const strengthNow = computeStrength(password);

    if (strengthNow < 3) {
      setError('Password is too weak. Please choose a stronger password');
      return false;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    setError('');

    try {
      const result = await signup(formData.email, formData.password, formData.name);
      if (result.success) {
        // Redirect to home immediately after successful signup
        setError('');
        navigate('/', { replace: true });
      }
    } catch (err) {
      console.error('Signup error:', err);
      const msg = (err?.message || '').toLowerCase();

      // If backend says account exists or created but sign-in failed, try to sign in automatically
      if (
        msg.includes('already exists') ||
        msg.includes('account created but') ||
        msg.includes('account created on server')
      ) {
        try {
          const loginResult = await login(formData.email, formData.password);
          if (loginResult?.success) {
            setError('');
            navigate('/', { replace: true });
            return;
          }
        } catch (loginErr) {
          // Fall through to show a friendly message below
          console.warn('Auto-login after signup failed:', loginErr?.message || loginErr);
        }
      }

      // Handle specific errors (case-insensitive)
      if (msg.includes('invalid email')) {
        setError('Please enter a valid email address.');
      } else if (msg.includes('password must be at least') || msg.includes('password does not meet')) {
        setError('Password does not meet requirements. Please choose a stronger password.');
      } else if (msg.includes('already exists')) {
        setError('An account with this email already exists. Please try logging in.');
      } else if (msg.includes('verify')) {
        setError('Account created. Please verify your email, then log in.');
      } else {
        setError(err.message || 'Signup failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <Link to="/" className="logo-link">
              <img src="/logo.png" alt="MovieHub" className="auth-logo" />
              <span>MovieHub</span>
            </Link>
            <h1>Create Account</h1>
            <p>Join MovieHub and start exploring amazing movies</p>
          </div>

          {error && (
            <div className="error-message">
              <span className="error-icon">⚠️</span>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <div className="input-wrapper">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                  disabled={loading}
                  className={error && !formData.name ? 'error' : ''}
                />
                <span className="input-icon">👤</span>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <div className="input-wrapper">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                  disabled={loading}
                  className={error && !formData.email ? 'error' : ''}
                />
                <span className="input-icon">📧</span>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a strong password"
                  required
                  disabled={loading}
                  className={error && !formData.password ? 'error' : ''}
                />
                <span className="input-icon">🔒</span>
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
              
              {formData.password && (
                <div className="password-strength">
                  <div className="strength-bar">
                    <div 
                      className="strength-fill" 
                      style={{ 
                        width: `${(passwordStrength / 5) * 100}%`,
                        backgroundColor: getPasswordStrengthText().color
                      }}
                    ></div>
                  </div>
                  <span 
                    className="strength-text"
                    style={{ color: getPasswordStrengthText().color }}
                  >
                    {getPasswordStrengthText().text}
                  </span>
                </div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="input-wrapper">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  required
                  disabled={loading}
                  className={error && formData.password !== formData.confirmPassword ? 'error' : ''}
                />
                <span className="input-icon">🔒</span>
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  disabled={loading}
                >
                  {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </div>

            <div className="form-options">
              <label className="checkbox-wrapper">
                <input type="checkbox" required />
                <span className="checkmark"></span>
                I agree to the{' '}
                <Link to="/terms" className="inline-link">Terms of Service</Link>
                {' '}and{' '}
                <Link to="/privacy" className="inline-link">Privacy Policy</Link>
              </label>
            </div>

            <button 
              type="submit" 
              className="auth-button primary"
              disabled={loading}
            >
              {loading ? (
                <Loading type="dots" size="small" text="Creating account..." />
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Already have an account?{' '}
              <Link to="/login" className="auth-link">
                Sign in here
              </Link>
            </p>
          </div>
        </div>

        <div className="auth-illustration">
          <div className="illustration-content">
            <h2>Join the Movie Community</h2>
            <p>Create your account and unlock a world of cinematic experiences</p>
            <div className="features">
              <div className="feature">
                <span className="feature-icon">🎯</span>
                <span>Personalized recommendations</span>
              </div>
              <div className="feature">
                <span className="feature-icon">📱</span>
                <span>Access from any device</span>
              </div>
              <div className="feature">
                <span className="feature-icon">🔔</span>
                <span>Get notified about new releases</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
