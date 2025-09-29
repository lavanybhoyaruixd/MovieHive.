import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import Loading from '../component/Loading';
import './Auth.css';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const userId = searchParams.get('userId');
  const secret = searchParams.get('secret');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const { resetPassword } = useAuth();

  useEffect(() => {
    if (!userId || !secret) {
      setError('Invalid or missing reset link. Please request a new one.');
    }
  }, [userId, secret]);

  const validate = () => {
    if (!password || !confirmPassword) {
      setError('Please enter and confirm your new password.');
      return false;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return false;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!validate()) return;

    setLoading(true);
    try {
      const result = await resetPassword(userId, secret, password, confirmPassword);
      if (result?.success) {
        setSuccess('Your password has been reset. Redirecting to login...');
        setTimeout(() => navigate('/login', { replace: true }), 2000);
      }
    } catch (err) {
      setError(err?.message || 'Failed to reset password.');
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
            <h1>Reset Password</h1>
            <p>Enter a new password for your account.</p>
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
              <label htmlFor="password">New Password</label>
              <div className="input-wrapper">
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter new password"
                  required
                  disabled={loading}
                />
                <span className="input-icon">🔒</span>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm New Password</label>
              <div className="input-wrapper">
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  required
                  disabled={loading}
                />
                <span className="input-icon">🔒</span>
              </div>
            </div>

            <button type="submit" className="auth-button primary" disabled={loading || !userId || !secret}>
              {loading ? <Loading type="dots" size="small" text="Resetting..." /> : 'Reset Password'}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Back to{' '}
              <Link to="/login" className="auth-link">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
