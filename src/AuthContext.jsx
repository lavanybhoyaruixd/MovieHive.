import { createContext, useContext, useState, useEffect } from 'react';
import { account } from './appwrite.js';
import fallbackAuth from './services/fallbackAuth.js';

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
  const [useAppwrite, setUseAppwrite] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      if (useAppwrite) {
        try {
          const currentUser = await account.get();
          setUser(currentUser);
          console.log('✅ Using Appwrite authentication');
        } catch (appwriteError) {
          console.warn('⚠️ Appwrite account.get failed:', appwriteError.message);
          // If unauthorized (no active session), keep Appwrite enabled and set user to null.
          if (appwriteError?.code === 401 || /unauthorized/i.test(appwriteError?.message || '')) {
            setUser(null);
          } else {
            // Only switch to fallback on configuration/network errors.
            setUseAppwrite(false);
            try {
              const fallbackUser = fallbackAuth.getCurrentUser();
              setUser(fallbackUser);
              console.log('✅ Using fallback authentication');
            } catch {
              setUser(null);
            }
          }
        }
      } else {
        // Use fallback auth
        try {
          const fallbackUser = fallbackAuth.getCurrentUser();
          setUser(fallbackUser);
        } catch {
          setUser(null);
        }
      }
    } catch (error) {
      console.error('Authentication check failed:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      if (useAppwrite) {
        try {
          // Clear any existing session first
          try {
            await account.deleteSession('current');
          } catch {}
          
          // Create new session with correct method name
          await account.createEmailPasswordSession(email, password);
          
          // Get user info after successful login
          await checkUser();
          return { success: true };
        } catch (appwriteError) {
          console.warn('⚠️ Appwrite login failed:', appwriteError.message);
          const msg = appwriteError?.message || '';
          const code = appwriteError?.code;
          const isAuthError = code === 401 || code === 404 || /invalid credentials|user not found/i.test(msg);

          if (!isAuthError) {
            // Fall back only on non-auth configuration/network errors
            setUseAppwrite(false);
            const fallbackUser = await fallbackAuth.login(email, password);
            setUser(fallbackUser);
            return { success: true };
          }

          // For real auth errors, bubble up to the UI
          throw appwriteError;
        }
      } else {
        // Use fallback authentication
        const fallbackUser = await fallbackAuth.login(email, password);
        setUser(fallbackUser);
        return { success: true };
      }
    } catch (error) {
      console.error('Login error details:', error);
      throw error; // Let the component handle the error message
    }
  };

  const signup = async (email, password, name) => {
    try {
      if (useAppwrite) {
        // Step 1: Create user account
        try {
          const userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
          await account.create(userId, email, password, name);
        } catch (createErr) {
          const msg = createErr?.message || '';
          const code = createErr?.code;

          // If user already exists, try logging in with provided credentials
          if (code === 409 || /already exists|user with the same id, email/i.test(msg)) {
            try {
              await account.createEmailPasswordSession(email, password);
              await checkUser();
              return { success: true, message: 'Welcome back!' };
            } catch (loginErr) {
              throw new Error('An account with this email already exists. Please try logging in.');
            }
          }

          // Handle validation errors explicitly
          if (/invalid email/i.test(msg)) {
            throw new Error('Please enter a valid email address.');
          }
          if (/password/i.test(msg)) {
            throw new Error('Password must be at least 8 characters long.');
          }

          // Non-auth/config issues -> fallback to local auth
          setUseAppwrite(false);
          const fallbackUser = await fallbackAuth.signup(email, password, name);
          setUser(fallbackUser);
          return { success: true, message: 'Account created locally. Welcome to MovieHub!' };
        }

        // Step 2: Create session after successful account creation
        try {
          await account.createEmailPasswordSession(email, password);
          await checkUser();
          return { success: true, message: 'Account created successfully! Welcome to MovieHub!' };
        } catch (sessionErr) {
          const msg = sessionErr?.message || '';
          const code = sessionErr?.code;

          // If this is a configuration/permission issue OR email verification requirement, fallback locally so user can proceed
          if (
            /scope|permission|network|service|verify|verification|email not verified/i.test(msg) ||
            code === 401 ||
            (code && /5\d{2}/.test(String(code)))
          ) {
            setUseAppwrite(false);
            // Try to create a local account; if it already exists locally, try logging in instead
            try {
              const fallbackUser = await fallbackAuth.signup(email, password, name);
              setUser(fallbackUser);
            } catch (e) {
              const m = (e?.message || '').toLowerCase();
              if (m.includes('already exists')) {
                const fallbackUser = await fallbackAuth.login(email, password);
                setUser(fallbackUser);
              } else {
                throw e;
              }
            }
            return { success: true, message: 'Account created on server. You are signed in locally.' };
          }

          // Otherwise, inform the UI that account exists but sign-in failed
          throw new Error('Account created but sign-in failed. Please try logging in.');
        }
      } else {
        // Use fallback authentication directly
        const fallbackUser = await fallbackAuth.signup(email, password, name);
        setUser(fallbackUser);
        return { success: true, message: 'Account created locally. Welcome to MovieHub!' };
      }
    } catch (error) {
      console.error('Signup error details:', error);
      // Handle specific error messages
      const msg = error?.message || '';
      if (error.code === 409 || /already exists/i.test(msg)) {
        throw new Error('An account with this email already exists. Please try logging in.');
      } else if (/password must be at least|password/i.test(msg)) {
        throw new Error('Password must be at least 8 characters long.');
      } else if (/invalid email/i.test(msg)) {
        throw new Error('Please enter a valid email address.');
      } else if (/scope|permission/i.test(msg)) {
        throw new Error('Account creation service is temporarily unavailable. Please try again later.');
      } else {
        throw new Error(error.message || 'Signup failed. Please try again.');
      }
    }
  };

  const logout = async () => {
    try {
      await account.deleteSession('current');
      setUser(null);
      console.log('Logout successful');
    } catch (error) {
      console.error('Logout error:', error);
      // Even if logout fails on server, clear local user state
      setUser(null);
    }
  };

  // Send password reset email
  const requestPasswordReset = async (email) => {
    try {
      if (useAppwrite) {
        const redirectUrl = `${window.location.origin}/reset-password`;
        await account.createRecovery(email, redirectUrl);
        return { success: true, message: 'Password reset email sent. Please check your inbox.' };
      } else {
        throw new Error('Password reset via email is unavailable in fallback mode. Please log in and use Change Password.');
      }
    } catch (error) {
      throw new Error(error.message || 'Failed to send password reset email.');
    }
  };

  // Complete password reset using link params
  const resetPassword = async (userId, secret, newPassword, confirmPassword) => {
    try {
      if (useAppwrite) {
        await account.updateRecovery(userId, secret, newPassword, confirmPassword);
        return { success: true, message: 'Your password has been reset successfully.' };
      } else {
        throw new Error('Password reset via email is unavailable in fallback mode.');
      }
    } catch (error) {
      throw new Error(error.message || 'Failed to reset password.');
    }
  };

  const changePassword = async (oldPassword, newPassword) => {
    try {
      await account.updatePassword(newPassword, oldPassword);
      return { success: true, message: 'Password updated successfully!' };
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const value = {
    user,
    login,
    signup,
    logout,
    changePassword,
    requestPasswordReset,
    resetPassword,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
