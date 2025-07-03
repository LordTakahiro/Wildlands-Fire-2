import { User } from '../types';

export const initializeData = () => {
  // Initialize demo users if not exist
  const existingUsers = localStorage.getItem('users');
  if (!existingUsers) {
    const demoUsers: User[] = [
      {
        id: '1',
        email: 'demo@user.com',
        password: 'password123',
        firstName: 'Demo',
        lastName: 'User',
        role: 'user',
        subscriptionStatus: 'active',
        subscriptionExpiry: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        joinDate: new Date().toISOString(),
        savedJobs: [],
        lastLogin: new Date().toISOString(),
        emailVerified: true
      },
      {
        id: '2',
        email: 'admin@ocwildlands.com',
        password: 'admin123',
        firstName: 'Admin',
        lastName: 'User',
        role: 'admin',
        subscriptionStatus: 'active',
        subscriptionExpiry: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        joinDate: new Date().toISOString(),
        savedJobs: [],
        lastLogin: new Date().toISOString(),
        emailVerified: true
      }
    ];
    
    localStorage.setItem('users', JSON.stringify(demoUsers));
  }
};