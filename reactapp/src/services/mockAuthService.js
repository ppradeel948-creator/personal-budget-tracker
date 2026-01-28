// Mock authentication service for testing without backend

const mockUsers = JSON.parse(localStorage.getItem('mockUsers') || '[]');

export const mockAuthService = {
  register: async (userData) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists
    const existingUser = mockUsers.find(u => 
      u.username === userData.username || u.email === userData.email
    );
    
    if (existingUser) {
      throw new Error('User already exists');
    }
    
    // Create new user
    const newUser = {
      id: Date.now(),
      ...userData,
      password: userData.password // In real app, this would be hashed
    };
    
    mockUsers.push(newUser);
    localStorage.setItem('mockUsers', JSON.stringify(mockUsers));
    
    return { message: 'User registered successfully!' };
  },

  login: async (credentials) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = mockUsers.find(u => 
      (u.username === credentials.usernameOrEmail || u.email === credentials.usernameOrEmail) &&
      u.password === credentials.password
    );
    
    if (!user) {
      throw new Error('Invalid credentials');
    }
    
    const token = 'mock-jwt-token-' + Date.now();
    localStorage.setItem('token', token);
    
    return {
      token,
      id: user.id,
      username: user.username,
      email: user.email,
      role: 'ROLE_PRIMARY_USER'
    };
  },

  logout: async () => {
    localStorage.removeItem('token');
    return { message: 'Logged out successfully' };
  },

  getCurrentUser: async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }
    
    return {
      id: 1,
      username: 'mockuser',
      email: 'mock@example.com',
      role: 'ROLE_PRIMARY_USER'
    };
  }
};