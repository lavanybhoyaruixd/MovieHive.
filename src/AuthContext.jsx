import { createContext, useContext, useState, useEffect } from 'react';
import { account } from './appwrite';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const currentUser = await account.get();
      setUser(currentUser);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      await account.createEmailSession(email, password);
      await checkUser();
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const signup = async (email, password) => {
    try {
      await account.create('unique()', email, password);
      // Send verification email
      await account.createVerification('http://localhost:5173/verify');
      // Don't auto-login, let user verify email first
      return { message: 'Account created! Please check your email to verify your account.' };
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const logout = async () => {
    try {
      await account.deleteSession('current()');
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const value = {
    user,
    login,
    signup,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
