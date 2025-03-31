import React, { createContext, useContext, useState } from 'react';
import { User } from '../types';

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  login: (email: string) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string) => {
    setUser({
      accessLevel: 1,
      email,
      isAuthenticated: true,
      name: email.split('@')[0] // Extract name from email
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export { UserProvider, useUser }; 