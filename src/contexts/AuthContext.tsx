import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthContextType } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const foundUser = users.find((u: User) => u.email === email);
      
      if (foundUser && foundUser.password === password) {
        const userWithoutPassword = { ...foundUser };
        delete userWithoutPassword.password;
        
        const updatedUser = {
          ...userWithoutPassword,
          lastLogin: new Date().toISOString()
        };
        
        setUser(updatedUser);
        setIsAuthenticated(true);
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        
        // Update user in users array
        const updatedUsers = users.map((u: User) => 
          u.id === foundUser.id ? { ...u, lastLogin: updatedUser.lastLogin } : u
        );
        localStorage.setItem('users', JSON.stringify(updatedUsers));
        
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const register = async (email: string, password: string, firstName: string, lastName: string): Promise<boolean> => {
    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const existingUser = users.find((u: User) => u.email === email);
      
      if (existingUser) {
        return false;
      }
      
      const newUser = {
        id: Date.now().toString(),
        email,
        password,
        firstName,
        lastName,
        role: 'user' as const,
        subscriptionStatus: 'inactive' as const,
        subscriptionExpiry: '',
        joinDate: new Date().toISOString(),
        savedJobs: [],
        lastLogin: new Date().toISOString(),
        emailVerified: true
      };
      
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      
      const userWithoutPassword = { ...newUser };
      delete userWithoutPassword.password;
      
      setUser(userWithoutPassword);
      setIsAuthenticated(true);
      localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
      
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('currentUser');
  };

  const updateUser = (updates: Partial<User>) => {
    if (!user) return;
    
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    
    // Update in users array
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = users.map((u: User) => 
      u.id === user.id ? { ...u, ...updates } : u
    );
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  const isSubscribed = user?.subscriptionStatus === 'active' && 
    new Date(user?.subscriptionExpiry || '') > new Date();

  const isAdmin = user?.role === 'admin';

  const value: AuthContextType = {
    user,
    login,
    register,
    logout,
    isAuthenticated,
    isSubscribed,
    isAdmin,
    updateUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};