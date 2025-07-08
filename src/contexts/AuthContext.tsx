
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, name?: string) => Promise<boolean>;
  signup: (name: string, email: string) => Promise<boolean>;
  logout: () => void;
  isLoggedIn: boolean;
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

  useEffect(() => {
    // Check if user is already logged in from localStorage
    const savedUser = localStorage.getItem('quizUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) return false;
    
    // Additional check to prevent simple junk emails
    const domain = email.split('@')[1];
    if (domain.length < 3 || !domain.includes('.')) return false;
    
    return true;
  };

  const login = async (email: string, name?: string): Promise<boolean> => {
    if (!validateEmail(email)) {
      return false;
    }

    // Check if user already exists in localStorage
    const existingUsers = JSON.parse(localStorage.getItem('quizUsers') || '[]');
    const existingUser = existingUsers.find((u: User) => u.email === email);
    
    if (existingUser) {
      const userData = { name: existingUser.name, email };
      setUser(userData);
      localStorage.setItem('quizUser', JSON.stringify(userData));
      return true;
    } else if (name) {
      // If name is provided, create new user
      const userData = { name, email };
      setUser(userData);
      localStorage.setItem('quizUser', JSON.stringify(userData));
      
      // Add to users list
      existingUsers.push(userData);
      localStorage.setItem('quizUsers', JSON.stringify(existingUsers));
      return true;
    }
    
    return false;
  };

  const signup = async (name: string, email: string): Promise<boolean> => {
    if (!validateEmail(email) || !name.trim()) {
      return false;
    }

    // Check if user already exists
    const existingUsers = JSON.parse(localStorage.getItem('quizUsers') || '[]');
    const userExists = existingUsers.some((u: User) => u.email === email);
    
    if (userExists) {
      return false;
    }

    const userData = { name: name.trim(), email };
    setUser(userData);
    localStorage.setItem('quizUser', JSON.stringify(userData));
    
    // Add to users list
    existingUsers.push(userData);
    localStorage.setItem('quizUsers', JSON.stringify(existingUsers));
    
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('quizUser');
  };

  const value: AuthContextType = {
    user,
    login,
    signup,
    logout,
    isLoggedIn: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
