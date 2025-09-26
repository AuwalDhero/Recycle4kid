import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: Partial<User> & { password: string }) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('recycle4life_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    try {
      // Mock login - in real app, this would call Supabase auth
      const mockUser: User = {
        id: '1',
        email,
        name: email.includes('child') ? 'Emma Green' : email.includes('school') ? 'Green Valley School' : 'Johnson Family',
        role: email.includes('child') ? 'child' : email.includes('school') ? 'school' : email.includes('admin') ? 'admin' : 'family',
        points: 1250,
        badges: [
          { id: '1', name: 'First Steps', description: 'Logged your first recyclable', icon: '🌱', points_required: 0 },
          { id: '2', name: 'Eco Warrior', description: 'Collected 10kg of recyclables', icon: '♻️', points_required: 500 }
        ],
        created_at: new Date().toISOString(),
        school_name: email.includes('school') ? 'Green Valley Primary School' : undefined
      };
      
      setUser(mockUser);
      localStorage.setItem('recycle4life_user', JSON.stringify(mockUser));
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: Partial<User> & { password: string }): Promise<boolean> => {
    setLoading(true);
    try {
      // Mock registration
      const newUser: User = {
        id: Date.now().toString(),
        email: userData.email!,
        name: userData.name!,
        role: userData.role!,
        points: 0,
        badges: [
          { id: '1', name: 'Welcome', description: 'Joined Recycle4Life Kids!', icon: '🎉', points_required: 0 }
        ],
        created_at: new Date().toISOString(),
        school_name: userData.school_name,
        parent_email: userData.parent_email
      };
      
      setUser(newUser);
      localStorage.setItem('recycle4life_user', JSON.stringify(newUser));
      return true;
    } catch (error) {
      console.error('Registration failed:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('recycle4life_user');
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};