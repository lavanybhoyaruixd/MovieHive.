import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import Loading from '../component/Loading';
import './Auth.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const { requestPasswordReset } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email.trim()) {
      setError('Please enter your email address.');
      return;
    }

    setLoading(true);
    try {
      const result = await requestPasswordReset(email.trim());
      if (result?.success) {
        setSuccess('If an account exists for this email, a password reset link has been sent. Please check your inbox.');
      }
    } catch (err) {
      setError(err?.message || 'Failed to send password reset email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container" style={{ maxWidth: '520px' }}>
        <div className="auth-card">
          <div className="auth-header">
            <Link to="/" className="logo-link">
              <img src="/logo.png" alt="MovieHub" className="auth-logo" />
              <span>MovieHub</span>
            </Link>
            <h1>Forgot Password</h1>
            <p>Enter your email and we will send you a link to reset your password.</p>
          </div>

          {error && (
            <div className="error-message">
              <span className="error-icon">⚠️</span>
              {error}
            </div>
          )}

          {success && (
            <div className="success-message" style={{ color: '#22c55e', marginBottom: '16px' }}>
              ✅ {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <div className="input-wrapper">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  disabled={loading}
                />
                <span className="input-icon">📧</span>
              </div>
            </div>

            <button type="submit" className="auth-button primary" disabled={loading}>
              {loading ? <Loading type="dots" size="small" text="Sending..." /> : 'Send Reset Link'}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Remembered your password?{' '}
              <Link to="/login" className="auth-link">Back to Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
