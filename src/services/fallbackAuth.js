// Fallback authentication service using localStorage
// This provides a working auth system when Appwrite has permission issues

class FallbackAuth {
  constructor() {
    this.storageKey = 'moviehub_auth';
    this.users = this.getStoredUsers();
  }

  getStoredUsers() {
    try {
      return JSON.parse(localStorage.getItem(`${this.storageKey}_users`) || '{}');
    } catch {
      return {};
    }
  }

  saveUsers() {
    try {
      localStorage.setItem(`${this.storageKey}_users`, JSON.stringify(this.users));
    } catch (error) {
      console.error('Failed to save users:', error);
    }
  }

  getCurrentUser() {
    try {
      const userData = localStorage.getItem(this.storageKey);
      return userData ? JSON.parse(userData) : null;
    } catch {
      return null;
    }
  }

  setCurrentUser(user) {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(user));
    } catch (error) {
      console.error('Failed to save user session:', error);
    }
  }

  clearCurrentUser() {
    try {
      localStorage.removeItem(this.storageKey);
    } catch (error) {
      console.error('Failed to clear user session:', error);
    }
  }

  // Create a new user account
  async createUser(email, password, name) {
    // Check if user already exists
    if (this.users[email]) {
      throw new Error('An account with this email already exists. Please try logging in.');
    }

    // Validate inputs
    if (!email || !password || !name) {
      throw new Error('All fields are required.');
    }

    if (password.length < 8) {
      throw new Error('Password must be at least 8 characters long.');
    }

    const user = {
      $id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      email: email,
      name: name,
      $createdAt: new Date().toISOString(),
      emailVerification: true, // Skip email verification for fallback
      status: true
    };

    // Store user credentials (in production, never store plaintext passwords)
    this.users[email] = {
      ...user,
      password: password // In production, this should be hashed
    };

    this.saveUsers();
    return user;
  }

  // Authenticate user
  async authenticateUser(email, password) {
    const storedUser = this.users[email];
    
    if (!storedUser) {
      throw new Error('No account found with this email. Please sign up first.');
    }

    if (storedUser.password !== password) {
      throw new Error('Invalid email or password. Please try again.');
    }

    // Return user info (without password)
    const { password: _, ...userInfo } = storedUser;
    return userInfo;
  }

  // Login method
  async login(email, password) {
    const user = await this.authenticateUser(email, password);
    this.setCurrentUser(user);
    return user;
  }

  // Signup method
  async signup(email, password, name) {
    const user = await this.createUser(email, password, name);
    // Auto-login after signup
    this.setCurrentUser(user);
    return user;
  }

  // Logout method
  async logout() {
    this.clearCurrentUser();
    return true;
  }

  // Get current session
  async getSession() {
    const user = this.getCurrentUser();
    if (!user) {
      throw new Error('No active session');
    }
    return user;
  }
}

export default new FallbackAuth();