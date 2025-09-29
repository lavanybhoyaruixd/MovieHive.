import { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useFavorites } from './contexts/FavoritesContext';
import { useNavigate } from 'react-router-dom';
import MovieCard from './component/MovieCard';
import ShinyText from './component/ShinyText';
import Loading from './component/Loading';
import ChangePasswordModal from './component/ChangePasswordModal';
import './Profile.css';

const Profile = () => {
  const { user, logout } = useAuth();
  const { favorites, loading: favoritesLoading, error: favoritesError } = useFavorites();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }
  }, [user, navigate]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
      // Even if logout fails, redirect to home
      navigate('/');
    }
  };

  if (!user) {
    return null;
  }

  if (favoritesLoading && activeTab === 'favorites') {
    return (
      <div className="profile-page">
        <div className="container">
          <Loading type="spinner" size="large" text="Loading favorites..." />
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="container">
        <div className="profile-header">
          <div className="profile-avatar">
            {user.email.charAt(0).toUpperCase()}
          </div>
          <div className="profile-info">
            <h1>
              <ShinyText text={`Welcome, ${user.email.split('@')[0]}`} speed={3} />
            </h1>
            <p className="user-email">{user.email}</p>
            <p className="member-since">
              Member since {new Date(user.$createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="profile-tabs">
          <button 
            className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            Profile
          </button>
          <button 
            className={`tab-btn ${activeTab === 'favorites' ? 'active' : ''}`}
            onClick={() => setActiveTab('favorites')}
          >
            Favorites
          </button>
          <button 
            className={`tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            Settings
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'profile' && (
            <div className="profile-section">
              <h2>Account Information</h2>
              <div className="info-grid">
                <div className="info-item">
                  <label>Email</label>
                  <span>{user.email}</span>
                </div>
                <div className="info-item">
                  <label>User ID</label>
                  <span>{user.$id}</span>
                </div>
                <div className="info-item">
                  <label>Account Status</label>
                  <span className="status active">Active</span>
                </div>
                <div className="info-item">
                  <label>Member Since</label>
                  <span>{new Date(user.$createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'favorites' && (
            <div className="favorites-section">
              <h2>My Favorite Movies</h2>
              {favorites.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon">🎬</div>
                  <h3>No favorite movies yet</h3>
                  <p>Start exploring movies and add them to your favorites!</p>
                  <button 
                    className="explore-btn"
                    onClick={() => navigate('/')}
                  >
                    Explore Movies
                  </button>
                </div>
              ) : (
                <div className="movies-grid">
                  {favorites.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="settings-section">
              <h2>Account Settings</h2>
              <div className="settings-grid">
                <div className="setting-item">
                  <h3>Change Password</h3>
                  <p>Update your account password</p>
                  <button 
                    className="setting-btn"
                    onClick={() => setIsChangePasswordModalOpen(true)}
                  >
                    Change Password
                  </button>
                </div>
                <div className="setting-item">
                  <h3>Notification Preferences</h3>
                  <p>Manage your email notifications</p>
                  <button className="setting-btn">Manage Notifications</button>
                </div>
                <div className="setting-item">
                  <h3>Privacy Settings</h3>
                  <p>Control your privacy and data</p>
                  <button className="setting-btn">Privacy Settings</button>
                </div>
                <div className="setting-item danger">
                  <h3>Delete Account</h3>
                  <p>Permanently delete your account and data</p>
                  <button className="setting-btn danger">Delete Account</button>
                </div>
              </div>
              
              <div className="logout-section">
                <h3>Sign Out</h3>
                <p>Sign out of your account on this device</p>
                <button className="logout-btn" onClick={handleLogout}>
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Change Password Modal */}
      {isChangePasswordModalOpen && (
        <ChangePasswordModal
          isOpen={isChangePasswordModalOpen}
          onClose={() => setIsChangePasswordModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Profile;
