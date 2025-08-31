import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { account } from '../Appwrite';
import Loading from '../component/Loading';
import './Auth.css';

const Verify = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const userId = searchParams.get('userId');
        const secret = searchParams.get('secret');

        if (!userId || !secret) {
          setError('Invalid verification link');
          setLoading(false);
          return;
        }

        await account.updateVerification(userId, secret);
        setSuccess(true);
        
        // Redirect to login after 3 seconds
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } catch (err) {
        console.error('Verification error:', err);
        setError('Email verification failed. Please try again or contact support.');
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, [searchParams, navigate]);

  if (loading) {
    return (
      <div className="auth-page">
        <div className="auth-container" style={{ maxWidth: '500px' }}>
          <div className="auth-card">
            <Loading type="spinner" size="large" text="Verifying your email..." />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <div className="auth-container" style={{ maxWidth: '500px' }}>
        <div className="auth-card">
          <div className="auth-header">
            <h1>Email Verification</h1>
            {success ? (
              <>
                <div style={{ color: '#22c55e', fontSize: '3rem', marginBottom: '16px' }}>
                  ✅
                </div>
                <p>Your email has been successfully verified!</p>
                <p style={{ fontSize: '0.9rem', marginTop: '16px' }}>
                  Redirecting to login page...
                </p>
              </>
            ) : (
              <>
                <div style={{ color: '#ef4444', fontSize: '3rem', marginBottom: '16px' }}>
                  ❌
                </div>
                <p>Verification failed</p>
                {error && (
                  <div className="error-message">
                    <span className="error-icon">⚠️</span>
                    {error}
                  </div>
                )}
                <button 
                  onClick={() => navigate('/login')}
                  className="auth-button primary"
                  style={{ marginTop: '24px' }}
                >
                  Go to Login
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verify;
